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

  document.querySelectorAll('.comments').forEach(container => {
    const projectId = container.dataset.project;
    const listEl = container.querySelector('.comments-list');
    const form = container.querySelector('.comment-form');

    const loadComments = () => {
      fetch(`/project/${projectId}/comments`)
        .then(r => r.json())
        .then(data => {
          listEl.innerHTML = '';
          data.forEach(c => {
            const div = document.createElement('div');
            div.className = 'comment';
            div.innerHTML = `<strong>${c.user}</strong>: ${c.text} <span class="date">${c.date}</span>`;
            listEl.appendChild(div);
          });
        });
    };

    loadComments();
    form.addEventListener('submit', e => {
      e.preventDefault();
      const formData = new FormData(form);
      fetch(`/project/${projectId}/comments`, {
        method: 'POST',
        body: formData
      }).then(() => {
        form.reset();
        loadComments();
      });
    });
  });
});
