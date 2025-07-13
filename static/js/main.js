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
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
    nav.querySelectorAll('.nav-link').forEach(link =>
      link.addEventListener('click', () => nav.classList.remove('open'))
    );
  }
});

