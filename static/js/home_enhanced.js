// static/js/home_enhanced.js

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat-number');

  function animateCounters() {
    counters.forEach(el => {
      const target = Number(el.dataset.count) || 0;
      const step = target / 60;
      let current = 0;
      const update = () => {
        current += step;
        if (current >= target) {
          el.textContent = target.toLocaleString();
        } else {
          el.textContent = Math.round(current).toLocaleString();
          requestAnimationFrame(update);
        }
      };
      update();
    });
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        if (entry.target.closest('.stats-enhanced')) {
          animateCounters();
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .fade-down, .fade-left, .fade-right, .zoom-in, .flip-left').forEach(el => {
    observer.observe(el);
  });
});
