document.addEventListener('DOMContentLoaded', () => {
    const newTopicBtn = document.getElementById('newTopicBtn');
    const newTopicBtnSidebar = document.getElementById('newTopicBtnSidebar');
    const newTopicForm = document.getElementById('newTopicForm');
    const cancelBtn = document.getElementById('cancelBtn');
    const categoryCards = document.querySelectorAll('.category-card');
    const topicForm = document.getElementById('topicForm');

    function showForm() {
        if (newTopicForm) newTopicForm.classList.add('show');
        if (newTopicBtn) newTopicBtn.style.display = 'none';
        if (newTopicBtnSidebar) newTopicBtnSidebar.style.display = 'none';
    }

    if (newTopicBtn) {
        newTopicBtn.addEventListener('click', showForm);
    }
    if (newTopicBtnSidebar) {
        newTopicBtnSidebar.addEventListener('click', (e) => {
            e.preventDefault();
            showForm();
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            newTopicForm.classList.remove('show');
            if (newTopicBtn) newTopicBtn.style.display = 'inline-flex';
            if (newTopicBtnSidebar) newTopicBtnSidebar.style.display = 'inline-flex';
        });
    }

    // Filter topics by category
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterTopics(category);
        });
    });

    function filterTopics(category) {
        document.querySelectorAll('.topic-card').forEach(card => {
            const cat = card.dataset.category || '';
            if (!category || cat === category) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (topicForm) {
        topicForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const payload = {
                autor: document.getElementById('autor').value,
                categoria: document.getElementById('categoria').value,
                titulo: document.getElementById('titulo').value,
                contenido: document.getElementById('contenido').value
            };

            try {
                const response = await fetch('/create_topic', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                const data = await response.json();
                if (data.success) {
                    addTopicCard(data.topic);
                    topicForm.reset();
                    newTopicForm.classList.remove('show');
                    if (newTopicBtn) newTopicBtn.style.display = 'inline-flex';
                }
            } catch (err) {
                console.error('Error creating topic:', err);
            }
        });
    }

    function addTopicCard(topic) {
        const list = document.querySelector('.topics-list');
        if (!list) return;
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.dataset.topicId = topic.id;
        card.innerHTML = `
            <div class="topic-header">
                <div class="topic-avatar">${(topic.author || 'A')[0].toUpperCase()}</div>
                <div class="topic-content">
                    <h3 class="topic-title">${topic.title}</h3>
                    <div class="topic-meta">
                        <span>Por ${topic.author || 'Anónimo'}</span>
                        <span>•</span>
                        <span>${new Date().toLocaleString()}</span>
                        ${topic.category ? `<span class="topic-tag">${topic.category}</span>` : ''}
                    </div>
                    <p class="topic-preview">${topic.preview}</p>
                </div>
            </div>
            <div class="topic-stats">
                <span class="stat-item">💬 0</span>
                <span class="stat-item">👍 0</span>
                <span class="stat-item">👁️ 0</span>
            </div>`;
        list.prepend(card);
    }
});
