(function(){
  const nav = document.getElementById('glass-nav');
  let lastY = window.scrollY;
  let hidden = false;

  window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > lastY && curr > 100 && !hidden) {
      nav.style.transform = 'translateY(-100%)';
      hidden = true;
    } else if (curr < lastY && hidden) {
      nav.style.transform = '';
      hidden = false;
    }
    lastY = curr;
  });

  // Theme global (localStorage)
  const btn = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const stored = localStorage.getItem('theme') || 'dark';
  setTheme(stored);

  btn.onclick = () => {
    setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark');
  };

  function setTheme(t){
    root.dataset.theme = t;
    localStorage.setItem('theme', t);
    btn.textContent = t === 'dark' ? '🌙' : '☀️';
    document.querySelectorAll('.breathing-neon').forEach(el=>{
        if(t==='dark'){ el.classList.add('animate-neon'); }
        else          { el.classList.remove('animate-neon'); }
    });
  }
})();
