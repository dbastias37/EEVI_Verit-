class SolicitudesManager {
    constructor() {
        if (!this.shouldShow()) return;
        this.panel = null;
        this.tab = null;
        this.isOpen = false;
        this.solicitudes = { proyectos: [], amigos: [] };
        this.currentTab = 'proyectos';
        this.init();
    }

    shouldShow() {
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
                <div class="solicitudes-counter" style="display:none;">0</div>
                <div class="neon-glow"></div>
            </div>`;
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
                <div class="solicitudes-list"></div>
            </div>`;
        document.body.appendChild(this.panel);
    }

    setupEventListeners() {
        this.panel.querySelector('.close-btn').addEventListener('click', () => this.closePanel());
        this.panel.querySelectorAll('.solicitudes-tabs .tab').forEach(btn => {
            btn.addEventListener('click', () => {
                this.panel.querySelectorAll('.solicitudes-tabs .tab').forEach(t => t.classList.remove('active'));
                btn.classList.add('active');
                this.currentTab = btn.dataset.tab;
                this.renderSolicitudes();
            });
        });
    }

    async loadSolicitudes() {
        try {
            const [proyectosRes, amigosRes] = await Promise.all([
                fetch('/projects/get_project_requests'),
                fetch('/friends/get_friend_requests')
            ]);
            const proyectos = await proyectosRes.json();
            const amigos = await amigosRes.json();
            this.solicitudes.proyectos = proyectos.success ? proyectos.solicitudes : [];
            this.solicitudes.amigos = amigos.success ? amigos.solicitudes : [];
            this.updateContador();
            if (this.isOpen) this.renderSolicitudes();
        } catch (e) {
            console.error('Error loading solicitudes', e);
        }
    }

    startPolling() {
        setInterval(() => {
            if (!this.isOpen) this.loadSolicitudes();
        }, 120000);
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
        if (!this.isOpen) this.tab.classList.add('breathing-neon');
    }

    stopNeonBreathing() {
        this.tab.classList.remove('breathing-neon');
    }

    togglePanel() {
        this.isOpen ? this.closePanel() : this.openPanel();
    }

    openPanel() {
        this.isOpen = true;
        this.tab.classList.add('panel-open');
        this.panel.classList.add('open');
        this.stopNeonBreathing();
        this.renderSolicitudes();
    }

    closePanel() {
        this.isOpen = false;
        this.tab.classList.remove('panel-open');
        this.panel.classList.remove('open');
        this.updateContador();
    }

    renderSolicitudes() {
        const list = this.panel.querySelector('.solicitudes-list');
        list.innerHTML = '';
        const items = this.solicitudes[this.currentTab] || [];
        if (items.length === 0) {
            list.innerHTML = '<p style="padding:1rem;color:var(--text-muted);">Sin solicitudes</p>';
            return;
        }
        items.forEach(sol => {
            const el = this.currentTab === 'proyectos'
                ? this.renderSolicitudProyecto(sol)
                : this.renderSolicitudAmigo(sol);
            list.appendChild(el);
        });
    }

    renderSolicitudProyecto(sol) {
        const div = document.createElement('div');
        div.className = 'solicitud-item';
        div.innerHTML = `
            <div class="solicitud-info">
                <strong>${sol.solicitante_nombre || ''}</strong>
                <span>${sol.proyecto_titulo || ''}</span>
                <span class="fecha">${this.formatFecha(sol.created_at)}</span>
            </div>
            <div class="solicitud-actions">
                <button class="btn-accept">Aceptar</button>
                <button class="btn-reject">Rechazar</button>
            </div>`;
        div.querySelector('.btn-accept').addEventListener('click', () => this.handleSolicitudAction(sol.id, 'proyecto', 'aceptar'));
        div.querySelector('.btn-reject').addEventListener('click', () => this.handleSolicitudAction(sol.id, 'proyecto', 'rechazar'));
        return div;
    }

    renderSolicitudAmigo(sol) {
        const div = document.createElement('div');
        div.className = 'solicitud-item';
        div.innerHTML = `
            <div class="solicitud-info">
                <strong>${sol.emisor_nombre || ''}</strong>
                <span class="fecha">${this.formatFecha(sol.created_at)}</span>
            </div>
            <div class="solicitud-actions">
                <button class="btn-accept">Aceptar</button>
                <button class="btn-reject">Rechazar</button>
            </div>`;
        div.querySelector('.btn-accept').addEventListener('click', () => this.handleSolicitudAction(sol.id, 'amigo', 'aceptar'));
        div.querySelector('.btn-reject').addEventListener('click', () => this.handleSolicitudAction(sol.id, 'amigo', 'rechazar'));
        return div;
    }

    async handleSolicitudAction(id, tipo, accion) {
        const url = tipo === 'proyecto' ? '/projects/respond_project_request' : '/friends/respond_friend_request';
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ solicitud_id: id, accion })
            });
            const data = await res.json();
            if (data.success) {
                this.showToast(data.message || 'Operación realizada', 'success');
                this.loadSolicitudes();
            } else {
                this.showToast(data.error || 'Error', 'error');
            }
        } catch (e) {
            console.error(e);
            this.showToast('Error de red', 'error');
        }
    }

    formatFecha(ts) {
        try {
            let d;
            if (!ts) return '';
            if (typeof ts === 'string') d = new Date(ts);
            else if (ts.seconds) d = new Date(ts.seconds * 1000);
            else d = new Date(ts);
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        } catch (e) {
            return '';
        }
    }

    showToast(msg, type='info') {
        const t = document.createElement('div');
        t.className = `toast ${type}`;
        t.textContent = msg;
        document.body.appendChild(t);
        setTimeout(() => t.remove(), 4000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.solicitudesManager = new SolicitudesManager();
});
