// Vercel Serverless Function — AIOX Bot (Gemini 2.0 Flash)
// POST /api/chat  { messages: [{role, content}, ...] }  → text/event-stream
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Carrega o manual uma única vez por cold start
let MANUAL_CACHE = null;
function loadManual() {
  if (MANUAL_CACHE) return MANUAL_CACHE;
  try {
    MANUAL_CACHE = readFileSync(join(__dirname, "manual.md"), "utf-8");
  } catch {
    MANUAL_CACHE = "(manual indisponível)";
  }
  return MANUAL_CACHE;
}

const SYSTEM_INSTRUCTION = `Você é o AIOX Bot, um assistente conversacional oficial do framework Synkra AIOX. Fale em português brasileiro, de forma didática, curta e amigável. Sua missão é tirar dúvidas sobre o Manual AIOX que está abaixo.

Regras:
1. RESPONDA DIRETAMENTE a pergunta do usuário com o conteúdo da resposta. Não diga "veja no capítulo X" ou "a resposta está em Y" — traga a resposta em si, com os detalhes concretos do manual. Só se absolutamente não houver informação, diga "Isso não está coberto no manual".
2. NUNCA invente comandos, agentes, tasks ou features que não aparecem no manual (Artigo IV — No Invention).
3. Não mencione número de capítulo ou localização na resposta, a menos que o usuário explicitamente pergunte "onde está" ou "em qual capítulo". Apenas entregue o conteúdo.
4. Respostas curtas por padrão (3–6 linhas). Só alongue se o usuário pedir detalhes.
5. Use markdown: **negrito** para termos-chave, \`código\` para comandos, listas quando ajudar.
6. Você conhece os 11 agentes oficiais: @pm (Morgan), @po (Pax), @sm (River), @dev (Dex), @qa (Quinn), @architect (Aria), @data-engineer (Dara), @analyst (Alex), @ux-design-expert (Uma), @devops (Gage), @aiox-master (Orion).

=========================
MANUAL AIOX COMPLETO
=========================

${loadManual()}`;

function safeJson(obj) {
  try { return JSON.stringify(obj); } catch { return "{}"; }
}

export const config = { runtime: "nodejs" };

export default async function handler(req, res) {
  // CORS simples (útil em dev)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "method_not_allowed" }); return; }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) { res.status(500).json({ error: "missing_gemini_api_key" }); return; }

  let body = req.body;
  if (typeof body === "string") {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const incoming = Array.isArray(body?.messages) ? body.messages : [];
  if (!incoming.length) { res.status(400).json({ error: "missing_messages" }); return; }

  // Converte histórico {role, content} → contents do Gemini
  const contents = incoming
    .filter(m => m && typeof m.content === "string" && m.content.trim())
    .map(m => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  // Prepara SSE antes de tentar o modelo (headers precisam ir antes do primeiro write)
  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");

  const ai = new GoogleGenAI({ apiKey });
  const primaryModel = process.env.GEMINI_MODEL || "gemini-2.5-flash";
  // Cadeia de fallback: tenta o primário; se 503/overloaded, cai pros alternativos
  const modelChain = [primaryModel, "gemini-2.0-flash", "gemini-2.5-flash-lite"];
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  let lastErr = null;
  let streamed = false;

  for (const model of modelChain) {
    // Até 3 tentativas por modelo com backoff (500ms, 1500ms)
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const stream = await ai.models.generateContentStream({
          model,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
            maxOutputTokens: 2048,
            // Desliga "thinking mode" do 2.5 Flash — evita resposta vazia/cortada
            thinkingConfig: { thinkingBudget: 0 },
          },
        });

        let finishReason = null;
        for await (const chunk of stream) {
          const text = chunk?.text;
          if (text) {
            streamed = true;
            res.write(`data: ${safeJson({ delta: text })}\n\n`);
          }
          const fr = chunk?.candidates?.[0]?.finishReason;
          if (fr) finishReason = fr;
        }

        // Se terminou sem produzir nenhum texto, trata como falha pra retry/fallback
        if (!streamed) {
          lastErr = new Error(`empty_response finishReason=${finishReason || "unknown"}`);
          // Sai do loop de tentativas e vai pro próximo modelo
          break;
        }

        res.write(`data: ${safeJson({ done: true })}\n\n`);
        res.end();
        return;
      } catch (err) {
        lastErr = err;
        const msg = err?.message || String(err);
        const isOverloaded = /503|UNAVAILABLE|overload|high demand/i.test(msg);
        // Se já começou a fazer stream, não dá pra recuperar com outro modelo
        if (streamed) break;
        // Se não é erro transitório, pula pro próximo modelo imediatamente
        if (!isOverloaded) break;
        // Backoff antes de retry no mesmo modelo
        if (attempt < 2) await sleep(500 * (attempt + 1) * (attempt + 1));
      }
    }
    if (streamed) break;
  }

  // Esgotou todas as tentativas
  const errMsg = lastErr?.message || String(lastErr || "unknown_error");
  const friendly = /503|UNAVAILABLE|overload|high demand/i.test(errMsg)
    ? "Os modelos do Gemini estão sobrecarregados no momento. Tente novamente em alguns segundos."
    : errMsg;
  try {
    res.write(`data: ${safeJson({ error: friendly })}\n\n`);
    res.end();
  } catch {
    // Headers podem já estar enviados — melhor esforço
  }
}
