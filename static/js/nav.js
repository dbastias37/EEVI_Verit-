document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('navToggle');
  const panel = document.getElementById('navPanel');
  btn?.addEventListener('click', () => {
    panel.classList.toggle('open');
    btn.classList.toggle('open');
  });
});
