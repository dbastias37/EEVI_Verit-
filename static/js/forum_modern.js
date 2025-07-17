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

    // Duplicate spanish form fields to english names for backend compatibility
    if (topicForm) {
        topicForm.addEventListener('submit', () => {
            copyField('autor', 'author');
            copyField('titulo', 'title');
            copyField('contenido', 'description');
        });
    }

    function copyField(fromName, toName) {
        const field = topicForm.querySelector(`[name="${fromName}"]`);
        if (!field) return;
        let hidden = topicForm.querySelector(`input[name="${toName}"]`);
        if (!hidden) {
            hidden = document.createElement('input');
            hidden.type = 'hidden';
            hidden.name = toName;
            topicForm.appendChild(hidden);
        }
        hidden.value = field.value;
    }
});
