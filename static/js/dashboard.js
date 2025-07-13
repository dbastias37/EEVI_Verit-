document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('script-modal');
  const scriptText = document.getElementById('script-text');

  document.querySelectorAll('.script-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      scriptText.textContent = btn.dataset.script;
      modal.classList.add('show');
    });
  });

  document.querySelectorAll('.close-modal').forEach(span => {
    span.addEventListener('click', () => { modal.classList.remove('show'); });
  });

  document.querySelectorAll('.pay-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const original = btn.textContent;
      btn.textContent = 'Procesando...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = original;
        btn.disabled = false;
      }, 2000);
    });
  });

  document.getElementById('theme-toggle')?.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
  });
});
