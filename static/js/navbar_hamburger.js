(() => {
  const btn = document.getElementById('hamburgerBtn');
  const menu = document.getElementById('mobileMenu');
  const rotator = document.getElementById('quoteRotator');

  if (!btn || !menu) return;

  const toggleMenu = () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  menu.querySelectorAll('.nav-link').forEach(l => {
    l.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && e.target !== btn) {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
  });

  if (rotator) {
    let current = rotator.textContent;
    const updateQuote = (text) => {
      rotator.style.opacity = 0;
      setTimeout(() => {
        rotator.textContent = text;
        rotator.style.opacity = 1;
      }, 1800);
    };

    const fetchQuote = () => {
      fetch('/api/random-quote')
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(d => { if (d.quote) current = d.quote; })
        .catch(() => {} )
        .finally(() => updateQuote(current));
    };

    setInterval(fetchQuote, 8000);
  }
})();
