document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('navToggle');
  const panel = document.getElementById('navPanel');
  const rotator = document.getElementById('quoteRotator');

  const togglePanel = () => {
    const open = panel.classList.toggle('open');
    btn.classList.toggle('open', open);
    if (rotator) rotator.classList.toggle('hide', open);
  };

  btn?.addEventListener('click', togglePanel);

  if (rotator) {
    let current = rotator.textContent;
    const updateQuote = text => {
      rotator.style.opacity = 0;
      setTimeout(() => {
        rotator.textContent = text;
        rotator.style.opacity = 1;
      }, 400);
    };
    const fetchQuote = () => {
      fetch('/api/random-quote')
        .then(r => r.ok ? r.json() : Promise.reject())
        .then(d => { if (d.quote) current = d.quote; })
        .catch(() => {})
        .finally(() => updateQuote(current));
    };
    setInterval(fetchQuote, 6000);
  }
});
