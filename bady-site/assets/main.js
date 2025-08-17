(function() {
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('theme');
  const isDark = saved ? saved === 'dark' : prefersDark;
  document.documentElement.dataset.theme = isDark ? 'dark' : 'light';

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const nowDark = document.documentElement.dataset.theme !== 'dark';
      document.documentElement.dataset.theme = nowDark ? 'dark' : 'light';
      localStorage.setItem('theme', nowDark ? 'dark' : 'light');
    });
  }

  const form = document.getElementById('homepageSearch');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const q = (document.getElementById('searchInput').value || '').trim();
      const url = new URL('encyclopedia.html', window.location.href);
      if (q) url.searchParams.set('q', q);
      window.location.href = url.toString();
    });
  }

  window.Utils = {
    getQueryParam(name) {
      const params = new URLSearchParams(window.location.search);
      return params.get(name) || '';
    },
    makeBadge(text, kind) {
      const span = document.createElement('span');
      span.className = `badge ${kind||''}`.trim();
      span.textContent = text;
      return span;
    },
    evidenceLabel(level) {
      const map = { A: 'сильная база', B: 'умеренная база', C: 'ограниченная база' };
      const wrap = document.createElement('span');
      wrap.className = 'evidence';
      const strong = document.createElement('strong');
      strong.textContent = `Ур. доказательности ${level}`;
      wrap.appendChild(strong);
      const span = document.createElement('span');
      span.textContent = map[level] || '';
      wrap.appendChild(span);
      return wrap;
    },
    renderList(container, items, renderItem) {
      container.innerHTML = '';
      const frag = document.createDocumentFragment();
      items.forEach(item => frag.appendChild(renderItem(item)));
      container.appendChild(frag);
    },
    normalize(str) { return (str||'').toLowerCase().replace(/ё/g, 'е'); },
    includesTokens(hay, query) {
      const base = Utils.normalize(hay);
      return Utils.normalize(query).split(/\s+/).every(tok => base.includes(tok));
    }
  };
})();