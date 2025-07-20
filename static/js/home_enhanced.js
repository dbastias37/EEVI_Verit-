// static/js/home_enhanced.js
document.addEventListener('DOMContentLoaded', () => {
  // Inicializa AOS
  AOS.init({
    duration: 800,       // ms
    offset: 120,         // px antes de que aparezca
    once: true,          // solo una vez
    easing: 'ease-out-quart'
  });

  // Animación de contador para .stat-number
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = Number(el.dataset.count) || 0;
    const frames = 60;                       // ~1 s a 60 fps
    let current = 0;
    const increment = target / frames;

    const update = () => {
      current += increment;
      if (current >= target) {
        el.textContent = target.toLocaleString();
      } else {
        el.textContent = Math.round(current).toLocaleString();
        requestAnimationFrame(update);
      }
    };
    update();
  });
});
