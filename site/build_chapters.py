#!/usr/bin/env python3
"""
Gera as 17 páginas HTML de capítulos a partir do manual AIOX + chapters.json.
Aplica o template visual fiel ao site original (dark + #D1FF00).
"""
import json
import re
from pathlib import Path
import markdown

ROOT = Path(__file__).parent
MANUAL = Path("/Users/lucascharao/Documents/book-squad/outputs/books/aiox-manual/manuscript/AIOX-Manual-Completo.md")
META = ROOT / "assets" / "chapters.json"
OUT = ROOT / "capitulos"
OUT.mkdir(exist_ok=True)

# -------- split manual por capítulo --------
text = MANUAL.read_text(encoding="utf-8")
# Capítulo markers: "# Capítulo N —" ou "# Capitulo N —"
parts = re.split(r"^#\s+Cap[íi]tulo\s+(\d+)\s+[—-]\s+(.+)$", text, flags=re.MULTILINE)
# parts = [preface, num1, title1, body1, num2, title2, body2, ...]
chapters_md = {}
for i in range(1, len(parts), 3):
    num = int(parts[i])
    body = parts[i + 2]
    chapters_md[num] = body.strip()

meta = json.loads(META.read_text(encoding="utf-8"))

# -------- markdown → html --------
md = markdown.Markdown(
    extensions=["extra", "tables", "fenced_code", "sane_lists", "toc"],
    extension_configs={"toc": {"permalink": False, "baselevel": 2}},
)

def render_prose(md_text: str) -> str:
    md.reset()
    html = md.convert(md_text)
    # Escape helper for blockquotes: already handled by markdown
    return html

def esc(s: str) -> str:
    return (s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))

# -------- template --------
TEMPLATE = """<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cap {num_pad} — {title_esc} · AIOX Squad</title>
<meta name="description" content="{tldr_attr}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="../assets/styles.css">
<link rel="stylesheet" href="../assets/chat.css">
<link rel="icon" type="image/svg+xml" href="../assets/logo-aiox.svg">
</head>
<body data-chapter="{num}">

<div class="app">

  <aside id="sidebar">
    <div class="sidebar-header">
      <a href="../index.html"><img src="../assets/logo-aiox.svg" alt="AIOX Squad"></a>
      <span class="sidebar-badge">Guia Técnico</span>
      <div class="sidebar-title">AIOX Squad</div>
      <div class="sidebar-subtitle">17 capítulos · Synkra</div>
    </div>

    <div class="sidebar-progress">
      <div class="sidebar-progress-label"><span>Progresso</span><span id="sb-pct">0/17</span></div>
      <div class="progress-bar"><div id="sb-bar"></div></div>
    </div>

    <nav class="sidebar-nav">
      <div class="nav-section-label">Capítulos</div>
      <div id="sidebar-chapters"></div>
    </nav>

    <div class="sidebar-footer">
      <a href="../index.html">← Voltar à home</a>
    </div>
  </aside>

  <main id="main">
    <div class="top-nav">
      <div class="breadcrumb">
        <a href="../index.html">Home</a>
        <span class="sep">/</span>
        <a href="../index.html">Capítulos</a>
        <span class="sep">/</span>
        <span class="current">Cap {num_pad}</span>
      </div>
      <div class="top-actions">
        <button class="gsearch-trigger" data-gsearch-open aria-label="Buscar">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <span class="hint">Buscar</span>
          <kbd>/</kbd>
        </button>
        {prev_btn}
        {next_btn}
      </div>
    </div>

    <div class="content">

      <section class="hero">
        <span class="hero-tag">Capítulo {num_pad} · {difficulty_upper}</span>
        <h1 class="hero-title">{title_esc}</h1>
        <p class="hero-subtitle">{tldr_esc}</p>
        <div class="meta-row">
          <span class="meta-chip">⏱ <strong>{minutes} min</strong> de leitura</span>
          <span class="meta-chip">🎯 <strong>{n_objectives}</strong> objetivos</span>
          <span class="meta-chip">🧩 <strong>{n_concepts}</strong> conceitos-chave</span>
          {commands_chip}
        </div>
      </section>

      <div class="tldr">
        <div class="tldr-label">TL;DR</div>
        <div class="tldr-text">{tldr_esc}</div>
      </div>

      <div class="two-col">
        <div class="card">
          <h3>Você vai aprender</h3>
          <ul>{objectives_li}</ul>
        </div>
        <div class="card">
          <h3>Conceitos-chave</h3>
          <div class="chips">{concepts_chips}</div>
        </div>
      </div>

      {commands_block}

      <article class="prose">
        {prose_html}
      </article>

      <div class="nav-footer">
        {footer_prev}
        {footer_next}
      </div>

    </div>
  </main>

</div>

<button class="to-top" id="to-top" aria-label="Voltar ao topo">↑</button>

<script src="../assets/app.js"></script>
<script src="../assets/chat.js"></script>
</body>
</html>
"""


def build_chapter(ch: dict, all_chapters: list) -> str:
    num = ch["num"]
    num_pad = f"{num:02d}"
    title_esc = esc(ch["title"])
    tldr_esc = esc(ch["tldr"])
    tldr_attr = esc(ch["tldr"]).replace('"', "&quot;")
    difficulty_upper = ch["difficulty"].upper()

    body = chapters_md.get(num, "")
    if not body:
        body = f"_Conteúdo do capítulo {num} não encontrado no manual._"
    prose_html = render_prose(body)

    objectives_li = "".join(f"<li>{esc(o)}</li>" for o in ch.get("objectives", []))
    concepts_chips = "".join(f'<span class="chip">{esc(c)}</span>' for c in ch.get("concepts", []))

    commands = ch.get("commands") or []
    commands_chip = f'<span class="meta-chip">⌨ <strong>{len(commands)}</strong> comandos CLI</span>' if commands else ""

    commands_block = ""
    if commands:
        cmd_lis = "".join(f"<li><code>{esc(c)}</code></li>" for c in commands)
        commands_block = (
            '<div class="card" style="margin: 28px 0;">'
            '<h3>Comandos deste capítulo</h3>'
            f'<ul>{cmd_lis}</ul>'
            "</div>"
        )

    # prev / next
    prev_ch = next((x for x in all_chapters if x["num"] == num - 1), None)
    next_ch = next((x for x in all_chapters if x["num"] == num + 1), None)

    def btn(target, label):
        if not target:
            return ""
        return f'<a class="btn-sm" href="{target["slug"]}.html">{label}</a>'

    prev_btn = btn(prev_ch, "← Anterior")
    next_btn = btn(next_ch, "Próximo →") if next_ch else ""
    if next_ch and not prev_ch:
        next_btn = f'<a class="btn-sm btn-primary" href="{next_ch["slug"]}.html">Começar →</a>'

    def footer_card(target, label, align_right=False):
        if not target:
            return "<div></div>"
        cls = "nav-next" if align_right else ""
        return (
            f'<a href="{target["slug"]}.html" class="{cls}">'
            f'<div class="label">{label}</div>'
            f'<div class="title">Cap {target["num"]:02d} · {esc(target["title"])}</div>'
            "</a>"
        )

    footer_prev = footer_card(prev_ch, "← Anterior")
    footer_next = footer_card(next_ch, "Próximo →", align_right=True)

    return TEMPLATE.format(
        num=num,
        num_pad=num_pad,
        title_esc=title_esc,
        tldr_esc=tldr_esc,
        tldr_attr=tldr_attr,
        difficulty_upper=difficulty_upper,
        minutes=ch["minutes"],
        n_objectives=len(ch.get("objectives", [])),
        n_concepts=len(ch.get("concepts", [])),
        commands_chip=commands_chip,
        objectives_li=objectives_li,
        concepts_chips=concepts_chips,
        commands_block=commands_block,
        prose_html=prose_html,
        prev_btn=prev_btn,
        next_btn=next_btn,
        footer_prev=footer_prev,
        footer_next=footer_next,
    )


def main():
    for ch in meta:
        html = build_chapter(ch, meta)
        dest = OUT / f"{ch['slug']}.html"
        dest.write_text(html, encoding="utf-8")
        print(f"✓ {dest.name}  ({len(html) // 1024} KB)")
    print(f"\nTotal: {len(meta)} capítulos gerados em {OUT}")


if __name__ == "__main__":
    main()
