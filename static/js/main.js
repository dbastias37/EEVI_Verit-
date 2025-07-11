document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.latest-topic-card, .service-card, .pack-card').forEach(el => {
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const reveal = (el) => {
    el.classList.add('visible');
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) reveal(e.target); });
  }, { threshold: 0.1 });

  document.querySelectorAll('.forum-new main > *').forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    observer.observe(el);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.motivation-card');
  if (cards.length) {
    let idx = 0;
    cards[idx].classList.add('visible');
    setInterval(() => {
      cards[idx].classList.remove('visible');
      idx = (idx + 1) % cards.length;
      cards[idx].classList.add('visible');
    }, 5000);
  }
});
