document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header-unified');

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  handleScroll();
  window.addEventListener('scroll', handleScroll);

  const updateBuscarProyectoLink = () => {
    const link = document.querySelector('a[data-action="open-projects-panel"], a[href*="buscarproyectos"], a[href="/forum#buscarproyectos"]');
    if (link) {
      link.href = '/forum';
      link.setAttribute('data-action', 'open-projects-panel');
    }
  };

  updateBuscarProyectoLink();

  const buscarProyectoBtn = document.querySelector('a[data-action="open-projects-panel"]');
  if (buscarProyectoBtn) {
    buscarProyectoBtn.addEventListener('click', (e) => {
      e.preventDefault();

      if (!window.location.pathname.includes('/forum')) {
        window.location.href = '/forum';
        return;
      }

      const openPanel = () => {
        if (window.projectsManager && typeof window.projectsManager.openProjectsPanel === 'function') {
          window.projectsManager.openProjectsPanel();
        }
      };

      if (window.projectsManager) {
        openPanel();
      } else {
        setTimeout(openPanel, 100);
      }
    });
  }
});
