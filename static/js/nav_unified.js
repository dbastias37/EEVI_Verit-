document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');
  const quoteRotator = document.getElementById('quoteRotator');

  const togglePanel = () => {
    if (!navPanel || !navToggle) return;
    
    const isOpen = navPanel.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    
    if (quoteRotator) {
      quoteRotator.classList.toggle('hide', isOpen);
    }
    
    document.body.classList.toggle('nav-open', isOpen);
  };

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', togglePanel);
    
    navPanel.querySelectorAll('.nav-link-unified').forEach(link => {
      link.addEventListener('click', () => {
        navPanel.classList.remove('open');
        navToggle.classList.remove('open');
        document.body.classList.remove('nav-open');
        
        if (quoteRotator) {
          quoteRotator.classList.remove('hide');
        }
      });
    });
  }

  document.addEventListener('click', (e) => {
    if (navPanel && navPanel.classList.contains('open') && 
        !navPanel.contains(e.target) && 
        !navToggle.contains(e.target)) {
      togglePanel();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navPanel && navPanel.classList.contains('open')) {
      togglePanel();
    }
  });

  if (quoteRotator) {
    let currentQuote = quoteRotator.textContent;
    
    const updateQuote = (text) => {
      quoteRotator.style.opacity = 0;
      setTimeout(() => {
        quoteRotator.textContent = text;
        quoteRotator.style.opacity = 1;
      }, 900);
    };

    const fetchQuote = () => {
      fetch('/api/random-quote')
        .then(response => response.ok ? response.json() : Promise.reject())
        .then(data => {
          if (data.quote) {
            currentQuote = data.quote;
          }
        })
        .catch(() => {
          const fallbackQuotes = [
            "La inteligencia humana es un destello del misterio...",
            "El sonido real conecta emociones auténticas",
            "Cada grabación cuenta una historia única",
            "La creatividad nace de la experiencia genuina"
          ];
          currentQuote = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
        })
        .finally(() => {
          updateQuote(currentQuote);
        });
    };

    setInterval(fetchQuote, 8000);
  }
});
