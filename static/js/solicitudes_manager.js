class SolicitudesManager {
    constructor() {
        // Solo inicializar si estamos en el foro Y usuario autenticado
        if (!this.shouldShow()) {
            return;
        }
        
        this.panel = null;
        this.tab = null;
        this.contador = 0;
        this.solicitudes = [];
        this.isPolling = false;
        this.isOpen = false;
        this.init();
    }

    shouldShow() {
        // Verificar si estamos en el foro
        const isForumPage = window.location.pathname.includes('/forum') || 
                           document.querySelector('.forum-container') !== null ||
                           document.querySelector('#forum-content') !== null;
        
        // Verificar si usuario está autenticado
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
        // Crear pestaña lateral
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

    setupEventListeners() {
        // Cerrar panel
        this.panel.querySelector('.close-btn').addEventListener('click', () => {
            this.closePanel();
        });

        // Tabs
        this.panel.querySelectorAll('.tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Cerrar al hacer click fuera (excepto en la pestaña)
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.tab.contains(e.target) && this.isOpen) {
                this.closePanel();
            }
        });
    }

    async loadSolicitudes() {
        try {
            // Cargar solicitudes de proyectos
            const proyectosResponse = await fetch('/projects/get_project_requests');
            const proyectosResult = await proyectosResponse.json();

            // Cargar solicitudes de amistad
            const amigosResponse = await fetch('/friends/get_friend_requests');
            const amigosResult = await amigosResponse.json();

            this.solicitudes = {
                proyectos: proyectosResult.success ? proyectosResult.solicitudes : [],
                amigos: amigosResult.success ? amigosResult.solicitudes : []
            };

            this.updateContador();
            this.renderSolicitudes();

        } catch (error) {
            console.error('Error loading solicitudes:', error);
            this.solicitudes = { proyectos: [], amigos: [] };
            this.updateContador();
            this.renderSolicitudes();
        }
    }

    updateContador() {
        const total = this.solicitudes.proyectos.length + this.solicitudes.amigos.length;
        const counter = this.tab.querySelector('.solicitudes-counter');
        const neonGlow = this.tab.querySelector('.neon-glow');
        
        if (total > 0) {
            counter.textContent = total;
            counter.style.display = 'flex';
            this.startNeonBreathing();
        } else {
            counter.style.display = 'none';
            this.stopNeonBreathing();
        }
        
        this.contador = total;
    }

    startNeonBreathing() {
        if (!this.isOpen) { // Solo si el panel está cerrado
            this.tab.classList.add('breathing-neon');
        }
    }

    stopNeonBreathing() {
        this.tab.classList.remove('breathing-neon');
    }

    togglePanel() {
        if (this.isOpen) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        this.panel.classList.add('open');
        this.tab.classList.add('panel-open');
        this.isOpen = true;
        this.stopNeonBreathing(); // Parar breathing al abrir
        this.loadSolicitudes(); // Recargar al abrir
    }

    closePanel() {
        this.panel.classList.remove('open');
        this.tab.classList.remove('panel-open');
        this.isOpen = false;
        
        // Reiniciar breathing si hay solicitudes
        if (this.contador > 0) {
            this.startNeonBreathing();
        }
    }

    startPolling() {
        if (this.isPolling) return;
        
        this.isPolling = true;
        setInterval(() => {
            if (!this.isOpen) {
                this.loadSolicitudes();
            }
        }, 120000); // 2 minutos
    }

    switchTab(tab) {
        this.panel.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.panel.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        this.renderSolicitudes();
    }

    renderSolicitudes() {
        const activeTab = this.panel.querySelector('.tab.active').dataset.tab;
        const container = this.panel.querySelector('.solicitudes-list');
        const solicitudes = this.solicitudes[activeTab] || [];

        if (solicitudes.length === 0) {
            container.innerHTML = '<div class="no-solicitudes">No hay solicitudes pendientes</div>';
            return;
        }

        container.innerHTML = solicitudes.map(solicitud => {
            if (activeTab === 'proyectos') {
                return this.renderSolicitudProyecto(solicitud);
            } else {
                return this.renderSolicitudAmigo(solicitud);
            }
        }).join('');

        this.setupSolicitudButtons();
    }

    renderSolicitudProyecto(solicitud) {
        return `
            <div class="solicitud-item proyecto" data-id="${solicitud.id}">
                <div class="solicitud-icon">📁</div>
                <div class="solicitud-content">
                    <div class="solicitud-titulo">${solicitud.proyecto_titulo}</div>
                    <div class="solicitud-texto">
                        <strong>${solicitud.solicitante_nombre}</strong> quiere unirse como
                        <span class="profesion">${solicitud.profesion_solicitada}</span>
                    </div>
                    <div class="solicitud-mensaje">"${solicitud.mensaje}"</div>
                    <div class="solicitud-fecha">${this.formatFecha(solicitud.fecha_solicitud)}</div>
                </div>
                <div class="solicitud-actions">
                    <button class="btn-aceptar" data-action="accept" data-type="proyecto" data-id="${solicitud.id}">✓</button>
                    <button class="btn-rechazar" data-action="reject" data-type="proyecto" data-id="${solicitud.id}">✗</button>
                </div>
            </div>
        `;
    }

    renderSolicitudAmigo(solicitud) {
        return `
            <div class="solicitud-item amigo" data-id="${solicitud.id}">
                <div class="solicitud-icon">👤</div>
                <div class="solicitud-content">
                    <div class="solicitud-titulo">Solicitud de Amistad</div>
                    <div class="solicitud-texto">
                        <strong>${solicitud.solicitante_nombre}</strong> quiere agregarte como amigo
                    </div>
                    <div class="solicitud-fecha">${this.formatFecha(solicitud.fecha_solicitud)}</div>
                </div>
                <div class="solicitud-actions">
                    <button class="btn-aceptar" data-action="accept" data-type="amigo" data-id="${solicitud.id}">✓</button>
                    <button class="btn-rechazar" data-action="reject" data-type="amigo" data-id="${solicitud.id}">✗</button>
                </div>
            </div>
        `;
    }

    setupSolicitudButtons() {
        this.panel.querySelectorAll('[data-action]').forEach(button => {
            button.addEventListener('click', async (e) => {
                const action = e.target.dataset.action;
                const type = e.target.dataset.type;
                const id = e.target.dataset.id;

                await this.handleSolicitudAction(action, type, id);
            });
        });
    }

    async handleSolicitudAction(action, type, id) {
        try {
            let endpoint = '';
            if (type === 'proyecto') {
                endpoint = `/projects/respond_project_request`;
            } else {
                endpoint = `/friends/respond_friend_request`;
            }

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    solicitud_id: id,
                    accion: action === 'accept' ? 'aceptar' : 'rechazar'
                })
            });

            const result = await response.json();

            if (result.success) {
                this.showToast(`Solicitud ${action === 'accept' ? 'aceptada' : 'rechazada'} correctamente`, 'success');
                await this.loadSolicitudes();
            } else {
                this.showToast('Error al procesar solicitud', 'error');
            }

        } catch (error) {
            console.error('Error handling solicitud:', error);
            this.showToast('Error de conexión', 'error');
        }
    }

    formatFecha(fecha) {
        const date = new Date(fecha);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Hace un momento';
        if (diff < 3600000) return `Hace ${Math.floor(diff/60000)} minutos`;
        if (diff < 86400000) return `Hace ${Math.floor(diff/3600000)} horas`;
        return `Hace ${Math.floor(diff/86400000)} días`;
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
}

// Inicializar solo si debe mostrarse
document.addEventListener('DOMContentLoaded', () => {
    const manager = new SolicitudesManager();
    if (manager.shouldShow()) {
        window.solicitudesManager = manager;
    }
});
