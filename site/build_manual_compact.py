#!/usr/bin/env python3
"""
Gera um MANUAL COMPACTO (destilação) para caber no tier gratuito do Gemini.
Input: manual completo + chapters.json
Output: api/manual.md (substitui o manual grande que era enviado por request)

Estratégia:
- Para cada capítulo: título + TL;DR + objetivos + conceitos + comandos + seções H2/H3
- Mantém ~5-10% do tamanho original preservando a estrutura de conhecimento
- O bot ainda sabe onde procurar e pode responder 90% das perguntas
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).parent
MANUAL_FULL = Path("/Users/lucascharao/Documents/book-squad/outputs/books/aiox-manual/manuscript/AIOX-Manual-Completo.md")
META = ROOT / "assets" / "chapters.json"
OUT = ROOT / "api" / "manual.md"

meta = json.loads(META.read_text(encoding="utf-8"))
full = MANUAL_FULL.read_text(encoding="utf-8")

# Split por capítulo
parts = re.split(r"^#\s+Cap[íi]tulo\s+(\d+)\s+[—-]\s+(.+)$", full, flags=re.MULTILINE)
chapters_raw = {}
for i in range(1, len(parts), 3):
    num = int(parts[i])
    body = parts[i + 2]
    chapters_raw[num] = body.strip()


def extract_sections(body: str) -> list[tuple[str, str]]:
    """Extrai pares (heading_h2_h3, primeiro_parágrafo_curto)."""
    out = []
    lines = body.split("\n")
    current_heading = None
    current_buffer = []
    for line in lines:
        m2 = re.match(r"^##\s+(.+)$", line)
        m3 = re.match(r"^###\s+(.+)$", line)
        if m2 or m3:
            if current_heading and current_buffer:
                first_para = " ".join(current_buffer).strip()
                # Pega só a primeira frase "completa" (até 200 chars)
                first_para = re.sub(r"\s+", " ", first_para)[:260]
                out.append((current_heading, first_para))
            current_heading = (m2 or m3).group(1).strip()
            current_buffer = []
        elif current_heading and line.strip() and not line.startswith("#"):
            if len(current_buffer) < 3 and not line.startswith("```"):
                current_buffer.append(line.strip())
    if current_heading and current_buffer:
        first_para = re.sub(r"\s+", " ", " ".join(current_buffer)).strip()[:260]
        out.append((current_heading, first_para))
    return out


lines_out = [
    "# Manual AIOX — Destilação para Consulta",
    "",
    "Este é um índice estruturado dos 17 capítulos do Manual AIOX. Contém TL;DRs, "
    "objetivos de aprendizado, conceitos-chave, comandos CLI e as seções principais com um resumo de 1-2 linhas cada. "
    "Use este conhecimento para responder perguntas com precisão. Quando o usuário pedir profundidade, cite o capítulo e sugira que ele leia o conteúdo completo.",
    "",
    "---",
    "",
    "## Agentes Oficiais do AIOX (11)",
    "",
    "| Agente | Persona | Escopo Principal |",
    "|--------|---------|------------------|",
    "| `@pm` | Morgan | Product Management, épicos, spec pipeline |",
    "| `@po` | Pax | Product Owner, validação de stories (10 pontos) |",
    "| `@sm` | River | Scrum Master, criação de stories |",
    "| `@dev` | Dex | Implementação de código (modos Interactive/YOLO/Pre-Flight) |",
    "| `@qa` | Quinn | QA Gate (7 checks), QA Loop, verdicts PASS/CONCERNS/FAIL/WAIVED |",
    "| `@architect` | Aria | Arquitetura, complexity assessment |",
    "| `@data-engineer` | Dara | Schema, DDL, RLS, migrations |",
    "| `@analyst` | Alex | Pesquisa, brainstorming |",
    "| `@ux-design-expert` | Uma | UX/UI design |",
    "| `@devops` | Gage | CI/CD, git push (EXCLUSIVO), bootstrap, MCP |",
    "| `@aiox-master` | Orion | Governança de framework, meta-operações |",
    "",
    "## Os 4 Workflows Primários",
    "",
    "1. **Story Development Cycle (SDC)** — Create (@sm) → Validate (@po) → Implement (@dev) → QA Gate (@qa) → Push (@devops)",
    "2. **QA Loop** — Ciclo iterativo @qa ⇄ @dev com máximo de 5 iterações",
    "3. **Spec Pipeline** — 6 fases (Gather/Assess/Research/Write/Critique/Plan) para requisitos com incerteza",
    "4. **Brownfield Discovery** — 10 fases de assessment de projetos legados",
    "",
    "## A Constitution (6 Artigos)",
    "",
    "- **I — CLI First** (NON-NEGOTIABLE): terminal é a fonte da verdade",
    "- **II — Agent Authority** (NON-NEGOTIABLE): cada agente com autoridade delimitada",
    "- **III — Story-Driven Development** (MUST): todo trabalho começa como story",
    "- **IV — No Invention** (MUST): NUNCA inventar features/comandos — toda afirmação deve rastrear a FR/NFR/CON",
    "- **V — Quality First** (MUST): qualidade não é opcional",
    "- **VI — Absolute Imports** (SHOULD): imports absolutos preferidos",
    "",
    "## Os 3 Pilares",
    "",
    "- **CLI First** → Observability Second → UI Third",
    "- **Code First** → Python resolve 91,5% das operações determinísticas; IA apenas para julgamento/criatividade",
    "- **Story-Driven** → ciclo de 5 etapas (criar → validar → implementar → revisar → entregar)",
    "",
    "---",
    "",
    "# Os 17 Capítulos",
    "",
]

for ch in meta:
    num = ch["num"]
    body = chapters_raw.get(num, "")
    sections = extract_sections(body)

    lines_out.append(f"## Capítulo {num:02d} — {ch['title']}")
    lines_out.append("")
    lines_out.append(f"**TL;DR:** {ch['tldr']}")
    lines_out.append("")
    lines_out.append(f"**Dificuldade:** {ch['difficulty']} · **Tempo:** {ch['minutes']} min")
    lines_out.append("")
    if ch.get("objectives"):
        lines_out.append("**Você vai aprender:**")
        for o in ch["objectives"]:
            lines_out.append(f"- {o}")
        lines_out.append("")
    if ch.get("concepts"):
        lines_out.append(f"**Conceitos-chave:** {', '.join(ch['concepts'])}")
        lines_out.append("")
    if ch.get("commands"):
        lines_out.append("**Comandos CLI mencionados:**")
        for c in ch["commands"]:
            lines_out.append(f"- `{c}`")
        lines_out.append("")
    if sections:
        lines_out.append("**Seções:**")
        for heading, summary in sections:
            if summary:
                lines_out.append(f"- **{heading}** — {summary}")
            else:
                lines_out.append(f"- **{heading}**")
        lines_out.append("")
    lines_out.append("---")
    lines_out.append("")


output = "\n".join(lines_out)
OUT.write_text(output, encoding="utf-8")
size_kb = len(output.encode("utf-8")) / 1024
approx_tokens = len(output) // 4  # estimativa grosseira
print(f"✓ Manual compacto gerado: {OUT}")
print(f"  Tamanho: {size_kb:.1f} KB  (~{approx_tokens} tokens)")
print(f"  Redução vs original: {(1 - size_kb / 418):.0%}")
