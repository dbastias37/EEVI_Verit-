/* User Nav Panel EEVI */
(() => {
  const panel   = document.getElementById('user-nav-panel');
  const fab     = document.getElementById('unp-fab');
  const close   = document.getElementById('unp-close');
  const tabs    = [...document.querySelectorAll('.unp-tab')];
  const rqSolic  = document.getElementById('rq-solicitudes');
  const rqAmigos = document.getElementById('rq-amigos');
  const rqMi     = document.getElementById('rq-mi');
  const sections = [rqSolic, rqAmigos, rqMi];

  const showPanel   = () => panel.classList.remove('hidden');
  const hidePanel   = () => panel.classList.add('hidden');
  const togglePanel = () => panel.classList.toggle('hidden');

  fab.addEventListener('click', togglePanel);
  close.addEventListener('click', hidePanel);
  document.getElementById('rq-open-chat')
          .addEventListener('click', () => window.chatManager.toggle());

  /* Tabs */
  tabs.forEach(btn => btn.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    renderTab(btn.textContent.trim());
  }));

  function renderTab(name) {
    sections.forEach(s => s.classList.add('hidden'));
    if (name === 'Solicitudes') {
      rqSolic.classList.remove('hidden');
      rqSolic.innerHTML = '<p class="text-xs text-gray-400">No hay solicitudes.</p>';
    } else if (name === 'Amigos') {
      rqAmigos.classList.remove('hidden');
      rqAmigos.innerHTML = '<p class="text-xs text-gray-400">Ningún amigo conectado.</p>';
    } else {
      rqMi.classList.remove('hidden');
    }
  }

  /* Init */
  renderTab('Solicitudes');
})();
