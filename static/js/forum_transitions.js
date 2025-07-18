class ForumTransitionManager {
    constructor() {
        this.currentView = 'forum';
        this.isTransitioning = false;
        this.init();
    }

    init() {
        this.setupProjectsButton();
        this.setupMembersButton();
        this.createBackButton();
    }

    setupProjectsButton() {
        const projectsBtn = document.querySelector('[data-action="buscar-proyectos"]') ||
                           document.getElementById('buscar-proyectos-btn');

        if (projectsBtn) {
            projectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.transitionTo('projects');
            });
        }
    }

    setupMembersButton() {
        const membersBtn = document.querySelector('[href*="miembros"]') ||
                          document.getElementById('miembros-btn');

        if (membersBtn) {
            membersBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.transitionTo('members');
            });
        }
    }

    createBackButton() {
        const backBtn = document.createElement('button');
        backBtn.className = 'back-to-forum-btn';
        backBtn.innerHTML = '← Volver al Foro';
        backBtn.style.display = 'none';
        backBtn.addEventListener('click', () => this.transitionTo('forum'));

        document.querySelector('.forum-container').appendChild(backBtn);
    }

    async transitionTo(newView) {
        if (this.isTransitioning || this.currentView === newView) return;

        this.isTransitioning = true;

        await this.fadeOut(this.getViewElement(this.currentView));

        this.hideAllViews();
        this.showView(newView);

        await this.fadeIn(this.getViewElement(newView));

        this.currentView = newView;
        this.isTransitioning = false;
        this.updateNavigation(newView);
    }

    fadeOut(element) {
        return new Promise(resolve => {
            element.style.transition = 'opacity 0.3s ease';
            element.style.opacity = '0';
            setTimeout(resolve, 300);
        });
    }

    fadeIn(element) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            element.style.display = 'block';
            element.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                element.style.opacity = '1';
                resolve();
            }, 50);
        });
    }

    getViewElement(view) {
        switch(view) {
            case 'forum': return document.getElementById('forum-main-content');
            case 'projects': return document.getElementById('projects-panel-view');
            case 'members': return document.getElementById('members-panel-view');
            default: return document.getElementById('forum-main-content');
        }
    }

    hideAllViews() {
        ['forum-main-content', 'projects-panel-view', 'members-panel-view'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
    }

    showView(view) {
        const element = this.getViewElement(view);
        if (element) {
            element.style.display = 'block';
        } else {
            this.createView(view);
        }
    }

    createView(view) {
        const container = document.querySelector('.forum-container');
        let viewHtml = '';

        switch(view) {
            case 'projects':
                viewHtml = this.createProjectsView();
                break;
            case 'members':
                viewHtml = this.createMembersView();
                break;
        }

        container.insertAdjacentHTML('beforeend', viewHtml);
    }

    createProjectsView() {
        return `
            <div id="projects-panel-view" class="forum-view" style="display: none;">
                <div class="view-header">
                    <h2>Buscar Proyectos</h2>
                    <button class="create-project-btn">+ Crear Proyecto</button>
                </div>
                <div class="projects-filters">
                    <input type="text" placeholder="Buscar proyectos..." class="search-input">
                    <select class="filter-categoria">
                        <option value="">Todas las categorías</option>
                        <option value="cortometraje">Cortometraje</option>
                        <option value="documental">Documental</option>
                        <option value="serie">Serie</option>
                        <option value="videoclip">Videoclip</option>
                    </select>
                </div>
                <div id="projects-grid" class="projects-grid">
                    <div class="loading">Cargando proyectos...</div>
                </div>
            </div>
        `;
    }

    createMembersView() {
        return `
            <div id="members-panel-view" class="forum-view" style="display: none;">
                <div class="view-header">
                    <h2>Miembros de la Comunidad</h2>
                    <div class="members-stats">
                        <span class="stat"><span class="status-dot online"></span> <span id="online-count">0</span> en línea</span>
                        <span class="stat"><span class="status-dot offline"></span> <span id="total-count">0</span> total</span>
                    </div>
                </div>
                <div class="members-filters">
                    <input type="text" placeholder="Buscar miembros..." class="search-input">
                    <select class="filter-status">
                        <option value="">Todos los estados</option>
                        <option value="online">En línea</option>
                        <option value="ocupado">Ocupado</option>
                        <option value="offline">Desconectado</option>
                    </select>
                </div>
                <div id="members-list" class="members-list">
                    <div class="loading">Cargando miembros...</div>
                </div>
            </div>
        `;
    }

    updateNavigation(view) {
        const backBtn = document.querySelector('.back-to-forum-btn');
        if (view === 'forum') {
            backBtn.style.display = 'none';
        } else {
            backBtn.style.display = 'block';
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.forumTransitions = new ForumTransitionManager();
});

