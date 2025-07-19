document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');
  const quoteRotator = document.getElementById('quoteRotator');

  const togglePanel = () => {
    const isOpen = navPanel.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    if (quoteRotator) {
      quoteRotator.classList.toggle('hide', isOpen);
    }
  };

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', togglePanel);

    navPanel.querySelectorAll('.nav-link-unified').forEach(link => {
      link.addEventListener('click', () => {
        navPanel.classList.remove('open');
        navToggle.classList.remove('open');
        if (quoteRotator) {
          quoteRotator.classList.remove('hide');
        }
      });
    });
  }
});
