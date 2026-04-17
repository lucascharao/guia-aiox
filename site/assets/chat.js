// AIOX Bot — chat widget (Gemini 2.0 Flash streaming) + Busca global
(function () {
  const CHAT_STORAGE = 'aiox-bot-history-v1';
  const API_ENDPOINT = (() => {
    // Resolve caminho absoluto a partir do scheme, funciona de qualquer profundidade
    const origin = location.origin;
    return origin + '/api/chat';
  })();

  const ROBOT = (() => {
    const inChapter = location.pathname.includes('/capitulos/');
    return inChapter ? '../assets/robot.svg' : 'assets/robot.svg';
  })();
  const CHAPTERS_JSON = (() => {
    const inChapter = location.pathname.includes('/capitulos/');
    return inChapter ? '../assets/chapters.json' : 'assets/chapters.json';
  })();
  const CAPITULOS_BASE = (() => {
    const inChapter = location.pathname.includes('/capitulos/');
    return inChapter ? '' : 'capitulos/';
  })();

  // ============================================================
  // MINI MARKDOWN (bold, italic, code, pre, ul, ol, br)
  // ============================================================
  function escHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
  function renderMarkdown(src) {
    // fenced code
    const codeBlocks = [];
    src = src.replace(/```([\s\S]*?)```/g, (_, code) => {
      const i = codeBlocks.push(code.trim()) - 1;
      return `§§CODE${i}§§`;
    });
    src = escHtml(src);
    // headings
    src = src.replace(/^### (.+)$/gm, '<strong>$1</strong>');
    src = src.replace(/^## (.+)$/gm, '<strong>$1</strong>');
    // bold / italic / inline code
    src = src.replace(/`([^`\n]+)`/g, '<code>$1</code>');
    src = src.replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>');
    src = src.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, '$1<em>$2</em>');
    // listas simples
    src = src.replace(/(?:^|\n)((?:[-*] .+\n?)+)/g, (m, list) => {
      const items = list.trim().split('\n').map(l => `<li>${l.replace(/^[-*] /, '')}</li>`).join('');
      return `\n<ul>${items}</ul>`;
    });
    src = src.replace(/(?:^|\n)((?:\d+\. .+\n?)+)/g, (m, list) => {
      const items = list.trim().split('\n').map(l => `<li>${l.replace(/^\d+\. /, '')}</li>`).join('');
      return `\n<ol>${items}</ol>`;
    });
    // parágrafos por linhas em branco
    src = src.split(/\n{2,}/).map(b => {
      if (/^\s*<(ul|ol|pre|strong)/.test(b)) return b;
      return '<p>' + b.replace(/\n/g, '<br>') + '</p>';
    }).join('\n');
    // restaurar code blocks
    src = src.replace(/§§CODE(\d+)§§/g, (_, i) => `<pre><code>${escHtml(codeBlocks[Number(i)])}</code></pre>`);
    return src;
  }

  // ============================================================
  // CHAT WIDGET
  // ============================================================
  const SUGGESTIONS = [
    'O que é o AIOX e qual problema ele resolve?',
    'Qual a diferença entre o agente @dev e o @qa?',
    'Como executo meu primeiro Story Development Cycle?',
    'Quando devo criar um squad ao invés de usar um agente?',
    'Explique a regra dos 91.5% (Code First).',
  ];

  function loadHistory() {
    try { return JSON.parse(localStorage.getItem(CHAT_STORAGE)) || []; }
    catch { return []; }
  }
  function saveHistory(h) { localStorage.setItem(CHAT_STORAGE, JSON.stringify(h.slice(-40))); }

  function buildWidget() {
    // FAB
    const fab = document.createElement('button');
    fab.className = 'aiox-bot-fab';
    fab.setAttribute('aria-label', 'Abrir AIOX Bot');
    fab.innerHTML = `<img src="${ROBOT}" alt="AIOX Bot"><span class="notice">AI</span>`;

    // Panel
    const panel = document.createElement('div');
    panel.className = 'aiox-bot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'AIOX Bot');
    panel.innerHTML = `
      <div class="bot-header">
        <img src="${ROBOT}" alt="">
        <div>
          <div class="title">AIOX Bot</div>
          <div class="sub"><span class="dot"></span> Gemini 2.0 Flash · online</div>
        </div>
        <button class="close" aria-label="Fechar">×</button>
      </div>
      <div class="bot-messages" id="bot-messages"></div>
      <div class="bot-input-area">
        <div class="bot-input-row">
          <textarea id="bot-input" placeholder="Pergunte qualquer coisa sobre o AIOX…" rows="1"></textarea>
          <button class="bot-send" id="bot-send" aria-label="Enviar">↑</button>
        </div>
        <div class="bot-footer">Powered by <b>Gemini 2.0 Flash</b> · conhecimento do Manual AIOX</div>
      </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);

    const msgsEl = panel.querySelector('#bot-messages');
    const inputEl = panel.querySelector('#bot-input');
    const sendEl = panel.querySelector('#bot-send');
    const closeEl = panel.querySelector('.close');

    function open() {
      panel.classList.add('open');
      fab.setAttribute('hidden', '');
      setTimeout(() => inputEl.focus(), 200);
      renderMessages();
    }
    function close() {
      panel.classList.remove('open');
      fab.removeAttribute('hidden');
    }
    fab.addEventListener('click', open);
    closeEl.addEventListener('click', close);
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && panel.classList.contains('open')) close();
    });

    let history = loadHistory();

    function renderMessages() {
      msgsEl.innerHTML = '';
      if (!history.length) {
        // boas-vindas + sugestões
        appendBot(
          'Olá! Eu sou o **AIOX Bot**. Posso tirar dúvidas sobre qualquer parte do Manual AIOX — agentes, commands, workflows, squads, stories, tudo. Pergunte à vontade!',
          false
        );
        const sug = document.createElement('div');
        sug.className = 'bot-suggestions';
        sug.innerHTML = `<div class="bot-suggestions-label">Sugestões</div>`;
        SUGGESTIONS.forEach(s => {
          const b = document.createElement('button');
          b.className = 'bot-suggestion';
          b.textContent = s;
          b.addEventListener('click', () => { inputEl.value = s; send(); });
          sug.appendChild(b);
        });
        msgsEl.appendChild(sug);
      } else {
        history.forEach(m => {
          if (m.role === 'user') appendUser(m.content, false);
          else appendBot(m.content, false);
        });
      }
      scrollBottom();
    }

    function appendUser(text) {
      const div = document.createElement('div');
      div.className = 'bot-msg user';
      div.innerHTML = `<div class="bubble">${escHtml(text)}</div>`;
      msgsEl.appendChild(div);
      scrollBottom();
      return div;
    }

    function appendBot(markdown) {
      const div = document.createElement('div');
      div.className = 'bot-msg bot';
      div.innerHTML = `
        <div class="avatar"><img src="${ROBOT}" alt=""></div>
        <div class="bubble">${renderMarkdown(markdown)}</div>
      `;
      msgsEl.appendChild(div);
      scrollBottom();
      return div;
    }

    function appendTyping() {
      const div = document.createElement('div');
      div.className = 'bot-msg bot';
      div.innerHTML = `
        <div class="avatar"><img src="${ROBOT}" alt=""></div>
        <div class="bubble"><div class="bot-typing"><span></span><span></span><span></span></div></div>
      `;
      msgsEl.appendChild(div);
      scrollBottom();
      return div;
    }

    function scrollBottom() { requestAnimationFrame(() => { msgsEl.scrollTop = msgsEl.scrollHeight; }); }

    let pending = false;
    async function send() {
      if (pending) return;
      const text = inputEl.value.trim();
      if (!text) return;
      pending = true;
      sendEl.disabled = true;

      // remove sugestões
      const sug = msgsEl.querySelector('.bot-suggestions');
      if (sug) sug.remove();

      history.push({ role: 'user', content: text });
      appendUser(text);
      inputEl.value = '';
      inputEl.style.height = 'auto';

      const typing = appendTyping();

      try {
        const resp = await fetch(API_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: history.map(m => ({ role: m.role, content: m.content })) }),
        });
        if (!resp.ok || !resp.body) {
          const err = await resp.text().catch(() => '');
          throw new Error('API ' + resp.status + ' — ' + err.slice(0, 200));
        }

        // Troca typing por bolha de stream
        typing.remove();
        const botMsg = appendBot('');
        const bubble = botMsg.querySelector('.bubble');

        const reader = resp.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let acc = '';

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          for (const line of lines) {
            if (!line.startsWith('data:')) continue;
            const payload = line.slice(5).trim();
            if (!payload) continue;
            try {
              const data = JSON.parse(payload);
              if (data.delta) {
                acc += data.delta;
                bubble.innerHTML = renderMarkdown(acc);
                scrollBottom();
              } else if (data.error) {
                acc += '\n\n⚠️ ' + data.error;
                bubble.innerHTML = renderMarkdown(acc);
              }
            } catch { /* ignore */ }
          }
        }

        if (!acc.trim()) acc = '_(resposta vazia — tente reformular a pergunta)_';
        history.push({ role: 'assistant', content: acc });
        saveHistory(history);
      } catch (err) {
        typing.remove();
        appendBot('⚠️ Não consegui responder agora. Verifique se a função `/api/chat` está ativa e se a variável `GEMINI_API_KEY` foi configurada.\n\n`' + (err.message || err) + '`');
      } finally {
        pending = false;
        sendEl.disabled = false;
        inputEl.focus();
      }
    }

    sendEl.addEventListener('click', send);
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
    });
    inputEl.addEventListener('input', () => {
      inputEl.style.height = 'auto';
      inputEl.style.height = Math.min(120, inputEl.scrollHeight) + 'px';
    });

    // Render inicial
    renderMessages();
  }

  // ============================================================
  // BUSCA GLOBAL
  // ============================================================
  async function buildSearch() {
    let chapters = [];
    try {
      const res = await fetch(CHAPTERS_JSON);
      chapters = await res.json();
    } catch { return; }

    const backdrop = document.createElement('div');
    backdrop.className = 'gsearch-backdrop';
    backdrop.innerHTML = `
      <div class="gsearch-modal" role="dialog" aria-label="Busca">
        <div class="gsearch-input">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path></svg>
          <input type="text" placeholder="Buscar capítulos, conceitos, comandos…" autocomplete="off">
          <kbd>Esc</kbd>
        </div>
        <div class="gsearch-results" id="gsearch-results"></div>
      </div>
    `;
    document.body.appendChild(backdrop);

    const input = backdrop.querySelector('input');
    const results = backdrop.querySelector('#gsearch-results');
    let activeIdx = 0;
    let currentHits = [];

    function render(q = '') {
      const f = q.trim().toLowerCase();
      currentHits = chapters
        .map(c => {
          const hay = [c.title, c.tldr, (c.concepts || []).join(' '), (c.commands || []).join(' ')].join(' ').toLowerCase();
          const match = !f || hay.includes(f);
          return match ? c : null;
        })
        .filter(Boolean);
      activeIdx = 0;
      if (!currentHits.length) {
        results.innerHTML = `<div class="gsearch-empty">Nenhum resultado para "${escHtml(q)}"</div>`;
        return;
      }
      results.innerHTML = currentHits.map((c, i) => `
        <a class="gsearch-result${i === 0 ? ' active' : ''}" href="${CAPITULOS_BASE}${c.slug}.html" data-idx="${i}">
          <div class="cap">Capítulo ${String(c.num).padStart(2, '0')} · ${c.difficulty} · ${c.minutes} min</div>
          <div class="title">${escHtml(c.title)}</div>
          <div class="desc">${escHtml(c.tldr)}</div>
        </a>
      `).join('');
    }

    function open() { backdrop.classList.add('open'); input.value = ''; render(''); setTimeout(() => input.focus(), 50); }
    function close() { backdrop.classList.remove('open'); }

    input.addEventListener('input', e => render(e.target.value));
    backdrop.addEventListener('click', e => { if (e.target === backdrop) close(); });
    document.addEventListener('keydown', e => {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && !backdrop.classList.contains('open')) {
        const tag = (document.activeElement?.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        e.preventDefault(); open();
      } else if (e.key === 'Escape' && backdrop.classList.contains('open')) {
        close();
      } else if (backdrop.classList.contains('open') && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
        e.preventDefault();
        const items = results.querySelectorAll('.gsearch-result');
        if (!items.length) return;
        items[activeIdx]?.classList.remove('active');
        activeIdx = e.key === 'ArrowDown' ? (activeIdx + 1) % items.length : (activeIdx - 1 + items.length) % items.length;
        items[activeIdx]?.classList.add('active');
        items[activeIdx]?.scrollIntoView({ block: 'nearest' });
      } else if (backdrop.classList.contains('open') && e.key === 'Enter') {
        const items = results.querySelectorAll('.gsearch-result');
        if (items[activeIdx]) { location.href = items[activeIdx].getAttribute('href'); }
      }
    });

    // Triggers: qualquer elemento com [data-gsearch-open]
    document.querySelectorAll('[data-gsearch-open]').forEach(el => {
      el.addEventListener('click', e => { e.preventDefault(); open(); });
    });

    window.__aioxOpenSearch = open;
  }

  // ============================================================
  // BOOTSTRAP
  // ============================================================
  document.addEventListener('DOMContentLoaded', () => {
    buildWidget();
    buildSearch();
  });
})();
