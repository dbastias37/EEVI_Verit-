class ForumCategoriesManager {
    constructor() {
        this.currentCategory = '';
        this.topics = [];
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.bindCategoryEvents();
        this.loadTopics();
    }

    bindCategoryEvents() {
        document.querySelectorAll('.category-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.switchCategory(category, btn);
            });
        });
    }

    async switchCategory(category, button) {
        if (this.isTransitioning || this.currentCategory === category) return;

        this.isTransitioning = true;

        document.querySelectorAll('.category-item').forEach(b => b.classList.remove('active'));
        button.classList.add('active');

        const container = document.querySelector('.topics-container');
        container.classList.add('fade-out');

        setTimeout(async () => {
            await this.loadTopicsByCategory(category);
            this.currentCategory = category;
            container.classList.remove('fade-out');
            container.classList.add('fade-in');
            setTimeout(() => {
                container.classList.remove('fade-in');
                this.isTransitioning = false;
            }, 400);
        }, 400);
    }

    async loadTopicsByCategory(category) {
        try {
            const url = category ? `/forum/topics?category=${category}` : '/forum/topics';
            const response = await fetch(url);
            const data = await response.json();
            if (data.success) {
                this.topics = data.topics;
                this.renderTopics();
            }
        } catch (error) {
            console.error('Error loading topics:', error);
        }
    }

    renderTopics() {
        const container = document.querySelector('.topics-list');
        if (this.topics.length === 0) {
            container.innerHTML = `
                <div class="no-topics">
                    <p>No hay temas en esta categoría</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.topics.map(topic => `
            <div class="topic-card" data-topic-id="${topic.id}">
                <div class="topic-header">
                    <div class="topic-avatar">${(topic.author || 'A')[0].toUpperCase()}</div>
                    <div class="topic-content">
                        <h3 class="topic-title">${topic.title}</h3>
                        <div class="topic-meta">
                            <span>Por ${topic.author}</span>
                            <span>•</span>
                            <span>${this.formatDate(topic.created_at)}</span>
                            <span class="topic-tag">${topic.category || ''}</span>
                        </div>
                        <p class="topic-preview">${topic.preview}</p>
                    </div>
                </div>
                <div class="topic-stats">
                    <span class="stat-item">💬 ${topic.replies || 0}</span>
                    <span class="stat-item">👍 ${topic.likes || 0}</span>
                    <span class="stat-item">👁️ ${topic.views || 0}</span>
                </div>
            </div>
        `).join('');
    }

    formatDate(dateStr) {
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        if (diff < 60000) return 'Hace un momento';
        if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} min`;
        if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} h`;
        return date.toLocaleDateString('es-CL');
    }

    async loadTopics() {
        await this.loadTopicsByCategory(this.currentCategory);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.forumCategoriesManager = new ForumCategoriesManager();
});
