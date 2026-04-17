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
1. Baseie TODAS as respostas no conteúdo do Manual AIOX. Se não houver informação suficiente, diga claramente "Isso não está coberto no manual" e sugira onde o leitor pode olhar.
2. NUNCA invente comandos, agentes, tasks ou features que não aparecem no manual (Artigo IV — No Invention).
3. Quando citar algo específico, mencione o capítulo (ex: "No Capítulo 8 — SDC…").
4. Respostas curtas por padrão (3–6 linhas). Só alongue se o usuário pedir detalhes.
5. Use markdown: **negrito** para termos-chave, \`código\` para comandos, listas quando ajudar.
6. Termine respostas oferecendo uma próxima pergunta útil quando fizer sentido.
7. Você conhece os 11 agentes oficiais: @pm (Morgan), @po (Pax), @sm (River), @dev (Dex), @qa (Quinn), @architect (Aria), @data-engineer (Dara), @analyst (Alex), @ux-design-expert (Uma), @devops (Gage), @aiox-master (Orion).

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

  try {
    const ai = new GoogleGenAI({ apiKey });

    // Prepara SSE
    res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");

    const model = process.env.GEMINI_MODEL || "gemini-2.5-flash";
    const stream = await ai.models.generateContentStream({
      model,
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.4,
        maxOutputTokens: 1024,
      },
    });

    for await (const chunk of stream) {
      const text = chunk?.text;
      if (text) {
        res.write(`data: ${safeJson({ delta: text })}\n\n`);
      }
    }
    res.write(`data: ${safeJson({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    const msg = err?.message || String(err);
    try {
      res.write(`data: ${safeJson({ error: msg })}\n\n`);
      res.end();
    } catch {
      res.status(500).json({ error: msg });
    }
  }
}
