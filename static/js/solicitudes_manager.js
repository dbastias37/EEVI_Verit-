class SolicitudesManager {
    constructor() {
        if (!this.shouldShow()) return;
        
        this.panel = null;
        this.tab = null;
        this.contador = 0;
        this.solicitudes = [];
        this.isOpen = false;
        this.init();
    }

    shouldShow() {
        // Solo mostrar en foro y si usuario autenticado
        const isForumPage = window.location.pathname.includes('/forum') || 
                           document.querySelector('.forum-container') !== null;
        const isAuthenticated = window.currentUser && window.currentUser.authenticated;
        return isForumPage && isAuthenticated;
    }

    init() {
        this.createTab();
        this.createPanel();
        this.loadSolicitudes();
        this.startPolling();
        this.setupEventListeners();
    }

    createTab() {
        this.tab = document.createElement('div');
        this.tab.className = 'solicitudes-tab';
        this.tab.innerHTML = `
            <div class="tab-content">
                <div class="bell-icon">🔔</div>
                <div class="solicitudes-counter" style="display: none;">0</div>
                <div class="neon-glow"></div>
            </div>
        `;
        document.body.appendChild(this.tab);
        this.tab.addEventListener('click', () => this.togglePanel());
    }

    createPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'solicitudes-panel-lateral';
        this.panel.innerHTML = `
            <div class="panel-header">
                <h3>Solicitudes</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="panel-content">
                <div class="solicitudes-tabs">
                    <button class="tab active" data-tab="proyectos">📁 Proyectos</button>
                    <button class="tab" data-tab="amigos">👤 Amigos</button>
                </div>
                <div class="solicitudes-list">
                    <div class="loading">Cargando solicitudes...</div>
                </div>
            </div>
        `;
        document.body.appendChild(this.panel);
    }

    async loadSolicitudes() {
        try {
            const [proyectosRes, amigosRes] = await Promise.all([
                fetch('/projects/get_project_requests'),
                fetch('/friends/get_friend_requests')
            ]);

            const proyectos = await proyectosRes.json();
            const amigos = await amigosRes.json();

            this.solicitudes = {
                proyectos: proyectos.success ? proyectos.solicitudes : [],
                amigos: amigos.success ? amigos.solicitudes : []
            };

            this.updateContador();
            this.renderSolicitudes();
        } catch (error) {
            console.error('Error loading solicitudes:', error);
        }
    }

    updateContador() {
        const total = this.solicitudes.proyectos.length + this.solicitudes.amigos.length;
        const counter = this.tab.querySelector('.solicitudes-counter');
        
        if (total > 0) {
            counter.textContent = total;
            counter.style.display = 'flex';
            this.startNeonBreathing();
        } else {
            counter.style.display = 'none';
            this.stopNeonBreathing();
        }
    }

    startNeonBreathing() {
        if (!this.isOpen) {
            this.tab.classList.add('breathing-neon');
        }
    }

    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    startPolling() {
        setInterval(() => {
            if (!this.isOpen) {
                this.loadSolicitudes();
            }
        }, 120000); // 2 minutos
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    window.solicitudesManager = new SolicitudesManager();
});
