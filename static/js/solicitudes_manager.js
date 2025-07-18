class SolicitudesManager {
    constructor() {
        this.panel = null;
        this.button = null;
        this.contador = 0;
        this.solicitudes = [];
        this.isPolling = false;
        this.init();
    }

    init() {
        this.createButton();
        this.createPanel();
        this.loadSolicitudes();
        this.startPolling();
        this.setupEventListeners();
    }

    createButton() {
        // Crear botón flotante con contador
        this.button = document.createElement('div');
        this.button.className = 'solicitudes-btn';
        this.button.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 6L9 17l-5-5"/>
            </svg>
            <div class="solicitudes-counter" style="display: none;">0</div>
        `;
        
        document.body.appendChild(this.button);
        
        this.button.addEventListener('click', () => this.togglePanel());
    }

    createPanel() {
        this.panel = document.createElement('div');
        this.panel.className = 'solicitudes-panel';
        this.panel.innerHTML = `
            <div class="solicitudes-header">
                <h3>Solicitudes</h3>
                <button class="close-btn">&times;</button>
            </div>
            <div class="solicitudes-content">
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

        // Cerrar al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && !this.button.contains(e.target)) {
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
            // Fallback - no mostrar error al usuario aún
            this.solicitudes = {
                proyectos: [],
                amigos: []
            };
            this.updateContador();
            this.renderSolicitudes();
        }
    }

    updateContador() {
        const total = (this.solicitudes.proyectos.length + this.solicitudes.amigos.length);
        const counter = this.button.querySelector('.solicitudes-counter');
        
        if (total > 0) {
            counter.textContent = total;
            counter.style.display = 'flex';
            this.startBreathing();
        } else {
            counter.style.display = 'none';
            this.stopBreathing();
        }
        
        this.contador = total;
    }

    startBreathing() {
        this.button.classList.add('breathing');
    }

    stopBreathing() {
        this.button.classList.remove('breathing');
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

        // Agregar event listeners a los botones
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
                    <button class="btn-aceptar" data-action="accept" data-type="proyecto" data-id="${solicitud.id}">
                        ✓
                    </button>
                    <button class="btn-rechazar" data-action="reject" data-type="proyecto" data-id="${solicitud.id}">
                        ✗
                    </button>
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
                    <button class="btn-aceptar" data-action="accept" data-type="amigo" data-id="${solicitud.id}">
                        ✓
                    </button>
                    <button class="btn-rechazar" data-action="reject" data-type="amigo" data-id="${solicitud.id}">
                        ✗
                    </button>
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
                // Mostrar toast de confirmación
                this.showToast(`Solicitud ${action === 'accept' ? 'aceptada' : 'rechazada'} correctamente`, 'success');
                
                // Recargar solicitudes
                await this.loadSolicitudes();
            } else {
                this.showToast('Error al procesar solicitud', 'error');
            }

        } catch (error) {
            console.error('Error handling solicitud:', error);
            this.showToast('Error de conexión', 'error');
        }
    }

    switchTab(tab) {
        // Actualizar tabs activos
        this.panel.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.panel.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Renderizar solicitudes del tab seleccionado
        this.renderSolicitudes();
    }

    togglePanel() {
        if (this.panel.classList.contains('open')) {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    openPanel() {
        this.panel.classList.add('open');
        this.stopBreathing();
        this.loadSolicitudes();
    }

    closePanel() {
        this.panel.classList.remove('open');
    }

    startPolling() {
        if (this.isPolling) return;

        this.isPolling = true;
        // Cambiar de 30 segundos a 2 minutos para reducir requests
        setInterval(() => {
            if (!this.panel.classList.contains('open')) {
                this.loadSolicitudes();
            }
        }, 120000); // 2 minutos en lugar de 30 segundos
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

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    if (window.currentUser && window.currentUser.authenticated) {
        new SolicitudesManager();
    }
});
