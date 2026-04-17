# AIOX Squad — Guia Técnico Interativo

Site estático com 17 capítulos do Manual AIOX + busca global + **AIOX Bot** (chat conversacional powered by Gemini 2.0 Flash).

## Estrutura

```
site/
├── index.html                 # Home: hero, progresso, trilhas, busca
├── capitulos/                 # 17 páginas HTML geradas do manual
│   └── 01-o-problema.html ... 17-referencia.html
├── assets/
│   ├── logo-aiox.svg          # Logo original (idêntica ao site de origem)
│   ├── robot.svg              # Robô mascote verde-limão com logo AIOX
│   ├── styles.css             # Design system (dark + #D1FF00 accent)
│   ├── chat.css               # Estilos do chat widget e busca
│   ├── app.js                 # Progresso, busca home, copy buttons, scrollspy
│   ├── chat.js                # AIOX Bot widget + busca global
│   └── chapters.json          # Metadados dos 17 capítulos
├── api/
│   ├── chat.js                # Vercel serverless function → Gemini 2.0 Flash
│   └── manual.md              # Manual AIOX completo (bundled na função)
├── build_chapters.py          # Gerador Markdown → HTML
├── package.json               # Dep: @google/genai
├── vercel.json                # Config de deploy
└── .env.local                 # GEMINI_API_KEY (não versionado)
```

## Design System

Fiel ao site original (`lesson-aiox-squad.vercel.app`):

- **Cores:** `#000` background, `#0f0f0f` cards, **`#D1FF00`** accent lime
- **Tipografia:** Inter 400/500/600/700/800
- **Layout:** sidebar 280px + top-nav 52px + content max 900px
- **Logo:** `logo-aiox.svg` (mesmo arquivo)

## Desenvolvimento Local

### 1. Instalar dependências

```bash
cd site
npm install
```

### 2. Configurar chave Gemini

A variável `GEMINI_API_KEY` já está em `.env.local` (gitignored).
Para outro ambiente, crie:

```bash
echo 'GEMINI_API_KEY=sua-chave-aqui' > .env.local
```

### 3. Rodar com Vercel Dev (inclui `/api/chat`)

```bash
npm run dev
# ou
vercel dev --listen 4801
```

Abra **http://localhost:4801**.

### 4. Regenerar capítulos após editar o manual

```bash
# atualiza site/api/manual.md se quiser refletir alterações no bot
cp /caminho/do/AIOX-Manual-Completo.md api/manual.md
python3 build_chapters.py
```

## Deploy na Vercel

```bash
cd site
vercel --prod
```

Na primeira vez, configure a variável de ambiente no dashboard:

```
Settings → Environment Variables → Add
Name:  GEMINI_API_KEY
Value: (sua chave Gemini)
Scope: Production, Preview
```

Ou via CLI:

```bash
vercel env add GEMINI_API_KEY production
```

## Features

### 🤖 AIOX Bot (chat)

- **LLM:** Gemini `gemini-2.5-flash` (configurável via `GEMINI_MODEL`) via `@google/genai`
- **Nota:** `gemini-2.0-flash` está com quota zero no free tier nessa conta Google. O `gemini-2.5-flash` é o sucessor direto (mesma família, mais novo) e funciona no free tier.
- **Contexto:** Manual AIOX completo injetado como `systemInstruction`
- **Streaming:** Server-Sent Events com `generateContentStream`
- **Persona:** robô amigável em português, restrito ao manual (Article IV — No Invention)
- **Memória:** histórico da conversa salvo em `localStorage`
- **Sugestões:** 5 perguntas iniciais para quebrar o gelo
- **Visual:** robô SVG com roupa verde-limão e logo AIOX no peito, animação de pulse no FAB

### 🔎 Busca Global

- Atalho **`/`** ou **⌘/Ctrl + K** abre modal de busca
- Indexa título, TL;DR, conceitos-chave e comandos de cada capítulo
- Navegação por setas + Enter
- Disponível em **todas as páginas** (home e capítulos)

### 📚 Leitura Intuitiva

- 3 trilhas recomendadas (Fundamentos / Mão na Massa / Squads & Produção)
- TL;DR no topo de cada capítulo
- Cards de objetivos + conceitos-chave
- Badges de dificuldade coloridos (iniciante/intermediário/avançado)
- Progresso persistente (localStorage) na home e sidebar
- Copy button em todos os blocos de código
- Prev/Next entre capítulos
- Scrollspy sincroniza sidebar

## Scripts

```bash
npm run build    # python3 build_chapters.py
npm run dev      # vercel dev --listen 4801
npm run deploy   # vercel --prod
```

## Segurança

- `GEMINI_API_KEY` nunca é exposta ao cliente — a chamada ao Gemini acontece apenas na serverless function `/api/chat`
- `.env.local` está no `.gitignore`
- CORS liberado apenas para POST no endpoint do chat
- `maxOutputTokens: 1024` para evitar respostas descontroladas
- `temperature: 0.4` para respostas consistentes ancoradas no manual
