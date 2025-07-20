/* User Nav Panel EEVI */
(() => {
  const panel   = document.getElementById('user-nav-panel');
  const fab     = document.getElementById('unp-fab');
  const close   = document.getElementById('unp-close');
  const tabs    = [...document.querySelectorAll('.unp-tab')];
  const content = document.getElementById('unp-content');

  const showPanel   = () => panel.classList.remove('hidden');
  const hidePanel   = () => panel.classList.add('hidden');
  const togglePanel = () => panel.classList.toggle('hidden');

  fab  .addEventListener('click', togglePanel);
  close.addEventListener('click', hidePanel);

  /* Tabs */
  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderTab(btn.textContent.trim());
  }));

  function renderTab(name) {
    if (name === 'Solicitudes') {
      content.innerHTML = '<p class="text-xs text-gray-400">No hay solicitudes.</p>';
    } else if (name === 'Amigos') {
      content.innerHTML = '<p class="text-xs text-gray-400">Ningún amigo conectado.</p>';
    } else { /* Mi Panel */
      content.innerHTML = `
        <p class="font-semibold text-primary">Hola, {{ session.get('user_name') or 'Invitado' }}!</p>
        <p class="text-xs mt-1">Este es tu panel personal.</p>`;
    }
  }

  /* Init */
  renderTab('Solicitudes');
})();
