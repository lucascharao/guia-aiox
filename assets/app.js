// AIOX Squad — app.js: progresso, busca, copy buttons, to-top
(function () {
  const STORAGE_KEY = 'aiox-guide-progress-v1';

  function getProgress() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function setProgress(p) { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); }

  function markRead(num) {
    const p = getProgress();
    p[num] = true;
    setProgress(p);
  }

  // ============== HOME ==============
  async function renderHome() {
    const list = document.getElementById('chapter-list');
    if (!list) return;
    const res = await fetch('assets/chapters.json');
    const chapters = await res.json();
    const progress = getProgress();

    const totalRead = chapters.filter(c => progress[c.num]).length;
    const pct = Math.round((totalRead / chapters.length) * 100);
    const pctEl = document.getElementById('home-pct');
    const barEl = document.getElementById('home-bar');
    if (pctEl) pctEl.textContent = `${totalRead}/${chapters.length} · ${pct}%`;
    if (barEl) barEl.style.width = `${pct}%`;

    function render(filter = '') {
      const f = filter.trim().toLowerCase();
      list.innerHTML = '';
      chapters
        .filter(c => !f || c.title.toLowerCase().includes(f) || c.tldr.toLowerCase().includes(f) || (c.concepts || []).join(' ').toLowerCase().includes(f))
        .forEach(c => {
          const done = progress[c.num];
          const a = document.createElement('a');
          a.className = 'chapter-card' + (done ? ' done' : '');
          a.href = `capitulos/${c.slug}.html`;
          a.innerHTML = `
            <span class="num">Cap ${String(c.num).padStart(2, '0')}</span>
            <div class="info">
              <div class="title">${c.title}</div>
              <div class="tldr">${c.tldr}</div>
            </div>
            <div class="meta">
              <span class="diff diff-${c.difficulty}">${c.difficulty}</span>
              <span class="dot">${c.minutes} min</span>
            </div>
            <span class="arrow">→</span>
          `;
          list.appendChild(a);
        });
    }
    render();
    const search = document.getElementById('search');
    if (search) search.addEventListener('input', e => render(e.target.value));
  }

  // ============== CAPÍTULO ==============
  function renderChapterExtras() {
    const currentNum = Number(document.body.dataset.chapter || 0);
    if (!currentNum) return;

    markRead(currentNum);

    // Copy buttons para code blocks
    document.querySelectorAll('pre').forEach(pre => {
      if (pre.querySelector('.copy-btn')) return;
      const btn = document.createElement('button');
      btn.className = 'copy-btn';
      btn.type = 'button';
      btn.textContent = 'Copiar';
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.querySelector('code')?.innerText || pre.innerText);
          btn.textContent = 'Copiado';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copiar'; btn.classList.remove('copied'); }, 1800);
        } catch (e) { /* noop */ }
      });
      pre.appendChild(btn);
    });

    // Sidebar chapters + progress
    renderSidebarChapters(currentNum);

    // Scrollspy para H2
    const headings = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
    if ('IntersectionObserver' in window && headings.length) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach(en => {
          if (en.isIntersecting) {
            const id = en.target.id;
            document.querySelectorAll('.toc a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
          }
        });
      }, { rootMargin: '-80px 0px -70% 0px' });
      headings.forEach(h => io.observe(h));
    }
  }

  async function renderSidebarChapters(currentNum) {
    const nav = document.getElementById('sidebar-chapters');
    if (!nav) return;
    const res = await fetch('../assets/chapters.json');
    const chapters = await res.json();
    const progress = getProgress();
    const totalRead = chapters.filter(c => progress[c.num]).length;
    const pct = Math.round((totalRead / chapters.length) * 100);

    const pctEl = document.getElementById('sb-pct');
    const barEl = document.getElementById('sb-bar');
    if (pctEl) pctEl.textContent = `${totalRead}/${chapters.length}`;
    if (barEl) barEl.style.width = `${pct}%`;

    nav.innerHTML = '';
    chapters.forEach(c => {
      const done = progress[c.num];
      const a = document.createElement('a');
      a.className = 'nav-item' + (c.num === currentNum ? ' active' : (done ? ' done' : ''));
      a.href = `${c.slug}.html`;
      a.innerHTML = `<span class="nav-step">${c.num}</span><span class="nav-item-title">${c.title}</span>`;
      nav.appendChild(a);
    });
  }

  // ============== TO TOP ==============
  function initToTop() {
    const btn = document.getElementById('to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => {
      btn.classList.toggle('show', window.scrollY > 500);
    });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHome();
    renderChapterExtras();
    initToTop();
  });
})();
