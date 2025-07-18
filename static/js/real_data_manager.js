class RealDataManager {
    constructor() {
        this.cache = new Map();
        this.lastUpdate = 0;
        this.updateInterval = 60000;
        this.init();
    }

    init() {
        this.startPeriodicUpdates();
        this.loadInitialData();
    }

    async loadInitialData() {
        await this.updateAllData();
        this.renderRealData();
    }

    async updateAllData() {
        try {
            const [usersData, forumStats, projectsData] = await Promise.all([
                this.fetchRealUsers(),
                this.fetchForumStats(),
                this.fetchRealProjects()
            ]);

            this.cache.set('users', usersData);
            this.cache.set('forumStats', forumStats);
            this.cache.set('projects', projectsData);
            this.lastUpdate = Date.now();
        } catch (error) {
            console.error('Error updating real data:', error);
        }
    }

    async fetchRealUsers() {
        const response = await fetch('/status/get_all_users_status');
        const result = await response.json();
        return result.success ? result.users : [];
    }

    async fetchForumStats() {
        const response = await fetch('/forum/get_real_stats');
        const result = await response.json();
        return result.success ? result.stats : {
            totalTemas: 0,
            totalPosts: 0,
            miembrosTotal: 0,
            onlineAhora: 0
        };
    }

    async fetchRealProjects() {
        const response = await fetch('/projects/get_all_projects');
        const result = await response.json();
        return result.success ? result.projects : [];
    }

    renderRealData() {
        this.updateUsersList();
        this.updateForumStats();
        this.updateProjectsList();
    }

    updateUsersList() {
        const users = this.cache.get('users') || [];

        const onlineList = document.getElementById('usuarios-online-list');
        if (onlineList) {
            onlineList.innerHTML = this.renderOnlineUsers(users);
        }

        const membersList = document.getElementById('members-list');
        if (membersList) {
            membersList.innerHTML = this.renderAllMembers(users);
        }

        const onlineCount = users.filter(u => u.estado === 'online').length;
        const totalCount = users.length;

        document.querySelectorAll('#online-count').forEach(el => {
            el.textContent = onlineCount;
        });
        document.querySelectorAll('#total-count').forEach(el => {
            el.textContent = totalCount;
        });
    }

    renderOnlineUsers(users) {
        const onlineUsers = users.filter(u => ['online', 'ocupado'].includes(u.estado));

        if (onlineUsers.length === 0) {
            return '<div class="no-users">No hay usuarios conectados</div>';
        }

        return onlineUsers.map(user => `
            <div class="user-online-item" data-user-id="${user.user_id}">
                <div class="user-avatar">
                    ${user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                </div>
                <div class="user-info">
                    <div class="user-name">${user.nombre || 'Usuario'}</div>
                    <div class="user-status">
                        <span class="status-indicator status-${user.estado}"></span>
                        ${this.getStatusText(user.estado)}
                    </div>
                </div>
                <div class="user-actions">
                    <button class="btn-add-friend" onclick="showUserActions('${user.user_id}', this)">⋯</button>
                </div>
            </div>
        `).join('');
    }

    renderAllMembers(users) {
        if (users.length === 0) {
            return '<div class="no-members">No hay miembros registrados</div>';
        }

        return users.map(user => `
            <div class="member-card" data-user-id="${user.user_id}">
                <div class="member-avatar">
                    ${user.nombre ? user.nombre.charAt(0).toUpperCase() : 'U'}
                </div>
                <div class="member-info">
                    <div class="member-name">${user.nombre || 'Usuario'}</div>
                    <div class="member-stats">
                        <span class="stat">Proyectos: ${user.proyectos_count || 0}</span>
                        <span class="stat">Rating: ${user.rating || 'N/A'}</span>
                    </div>
                    <div class="member-status">
                        <span class="status-indicator status-${user.estado}"></span>
                        ${this.getStatusText(user.estado)}
                        <span class="last-seen">${this.formatLastSeen(user.ultima_actividad)}</span>
                    </div>
                </div>
                <div class="member-actions">
                    <button class="btn-contact" onclick="contactMember('${user.user_id}')">Contactar</button>
                </div>
            </div>
        `).join('');
    }

    updateForumStats() {
        const stats = this.cache.get('forumStats') || {};

        const statsElements = {
            'total-temas': stats.totalTemas || 0,
            'total-posts': stats.totalPosts || 0,
            'miembros-total': stats.miembrosTotal || 0,
            'online-ahora': stats.onlineAhora || 0
        };

        Object.entries(statsElements).forEach(([id, value]) => {
            const elements = document.querySelectorAll(`#${id}, .${id}`);
            elements.forEach(el => el.textContent = value);
        });
    }

    updateProjectsList() {
        const projects = this.cache.get('projects') || [];
        const projectsGrid = document.getElementById('projects-grid');

        if (projectsGrid) {
            if (projects.length === 0) {
                projectsGrid.innerHTML = '<div class="no-projects">No hay proyectos disponibles</div>';
            } else {
                projectsGrid.innerHTML = projects.map(project => this.renderProjectCard(project)).join('');
            }
        }
    }

    renderProjectCard(project) {
        return `
            <div class="project-card" data-project-id="${project.id}">
                <div class="project-header">
                    <h3 class="project-title">${project.titulo}</h3>
                    <span class="project-status status-${project.estado_proyecto}">${project.estado_proyecto}</span>
                </div>
                <div class="project-description">${project.descripcion}</div>
                <div class="project-profesiones">
                    ${Object.entries(project.profesiones_requeridas || {}).map(([prof, data]) => `
                        <span class="profesion-badge ${data.activo ? 'disponible' : 'completa'}" onclick="solicitarUnion('${project.id}', '${prof}')">
                            ${prof} <span class="cupos">(${data.ocupados}/${data.cupos})</span>
                        </span>
                    `).join('')}
                </div>
                <div class="project-footer">
                    <span class="project-author">Por: ${project.autor_nombre}</span>
                    <span class="project-budget">${project.moneda} ${project.presupuesto_rango}</span>
                </div>
            </div>
        `;
    }

    getStatusText(status) {
        const statusTexts = {
            'online': 'En línea',
            'ocupado': 'Ocupado',
            'offline': 'Desconectado'
        };
        return statusTexts[status] || 'Desconocido';
    }

    formatLastSeen(timestamp) {
        if (!timestamp) return '';

        const date = new Date(timestamp);
        const now = new Date();
        const diff = now - date;

        if (diff < 60000) return 'Hace un momento';
        if (diff < 3600000) return `Hace ${Math.floor(diff/60000)} min`;
        if (diff < 86400000) return `Hace ${Math.floor(diff/3600000)} h`;
        return `Hace ${Math.floor(diff/86400000)} días`;
    }

    startPeriodicUpdates() {
        setInterval(() => {
            if (Date.now() - this.lastUpdate > this.updateInterval) {
                this.updateAllData().then(() => this.renderRealData());
            }
        }, this.updateInterval);
    }
}

async function solicitarUnion(projectId, profesion) {
    try {
        const mensaje = prompt(`¿Por qué quieres unirte como ${profesion}?`);
        if (!mensaje) return;

        const response = await fetch('/projects/request_join', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                proyecto_id: projectId,
                profesion_solicitada: profesion,
                mensaje: mensaje
            })
        });

        const result = await response.json();
        if (result.success) {
            showToast('Solicitud enviada correctamente', 'success');
            if (window.solicitudesManager) {
                window.solicitudesManager.loadSolicitudes();
            }
        } else {
            showToast(result.error || 'Error al enviar solicitud', 'error');
        }
    } catch (error) {
        showToast('Error de conexión', 'error');
    }
}

function contactMember(userId) {
    showUserActions(userId, event.target);
}

document.addEventListener('DOMContentLoaded', () => {
    window.realDataManager = new RealDataManager();
});
