document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('script-modal');
  const scriptText = document.getElementById('script-text');

  document.querySelectorAll('.script-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      scriptText.textContent = btn.dataset.script;
      modal.style.display = 'block';
    });
  });

  document.querySelectorAll('.close-modal').forEach(span => {
    span.addEventListener('click', () => { modal.style.display = 'none'; });
  });

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
});
