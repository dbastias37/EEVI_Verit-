// Sistema de Proyectos VFORUM
class ProjectsManager {
    constructor() {
        this.projects = [];
        this.tags = [];
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadProjects();
    }

    bindEvents() {
        // Botón abrir panel
        const projectsBtn = document.getElementById('projectsBtn');
        if (projectsBtn) {
            projectsBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.openProjectsPanel();
            });
        }

        // Botón cerrar panel
        const closeBtn = document.getElementById('closeProjectsBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeProjectsPanel();
            });
        }

        // Botón nuevo proyecto
        const newProjectBtn = document.getElementById('newProjectBtn');
        if (newProjectBtn) {
            newProjectBtn.addEventListener('click', () => {
                this.openNewProjectModal();
            });
        }

        // Formulario proyecto
        const projectForm = document.getElementById('projectForm');
        if (projectForm) {
            projectForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitProject(e);
            });
        }

        // Tags input
        const tagInput = document.getElementById('tagInput');
        if (tagInput) {
            tagInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.addTag(tagInput.value);
                    tagInput.value = '';
                }
            });
        }

        // Búsqueda
        const searchInput = document.querySelector('.project-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProjects(e.target.value);
            });
        }

        // Modal close
        const closeModalBtn = document.getElementById('closeModalBtn');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                this.closeProjectModal();
            });
        }
    }

    openProjectsPanel() {
        // Fade out foro
        const forumContent = document.querySelector('.main-content');
        const sidebars = document.querySelectorAll('.sidebar-left, .sidebar-right');
        
        if (forumContent) {
            forumContent.style.transition = 'opacity 0.4s';
            forumContent.style.opacity = '0';
            
            sidebars.forEach(sidebar => {
                sidebar.style.transition = 'opacity 0.4s';
                sidebar.style.opacity = '0';
            });
        }

        // Fade in proyectos
        setTimeout(() => {
            const projectsPanel = document.getElementById('projectsPanel');
            const closeBtn = document.getElementById('closeProjectsBtn');
            
            projectsPanel.classList.add('active');
            closeBtn.classList.add('visible');
            
            // Ocultar contenido del foro
            if (forumContent) {
                forumContent.style.display = 'none';
                sidebars.forEach(sidebar => {
                    sidebar.style.display = 'none';
                });
            }
        }, 400);
    }

    closeProjectsPanel() {
        const projectsPanel = document.getElementById('projectsPanel');
        const closeBtn = document.getElementById('closeProjectsBtn');
        const forumContent = document.querySelector('.main-content');
        const sidebars = document.querySelectorAll('.sidebar-left, .sidebar-right');
        
        projectsPanel.classList.remove('active');
        closeBtn.classList.remove('visible');
        
        // Restaurar foro
        setTimeout(() => {
            if (forumContent) {
                forumContent.style.display = '';
                sidebars.forEach(sidebar => {
                    sidebar.style.display = '';
                });
                
                setTimeout(() => {
                    forumContent.style.opacity = '1';
                    sidebars.forEach(sidebar => {
                        sidebar.style.opacity = '1';
                    });
                }, 50);
            }
        }, 400);
    }

    async loadProjects() {
        try {
            const response = await fetch('/api/projects');
            const data = await response.json();
            this.projects = data.projects || [];
            this.renderProjects();
        } catch (error) {
            console.error('Error loading projects:', error);
            this.renderProjects();
        }
    }

    renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;

        if (this.projects.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                    <p style="color: var(--text-muted); font-size: 1.1rem;">
                        No hay proyectos activos aún. ¡Sé el primero en crear uno!
                    </p>
                </div>
            `;
            return;
        }

        grid.innerHTML = this.projects.map((project, index) => `
            <div class="project-card" style="--index: ${index}" onclick="projectsManager.viewProject('${project.id}')">
                <div class="project-header">
                    <div>
                        <h3 class="project-title">${project.titulo}</h3>
                        <span class="project-status status-${project.estado}">${this.getStatusText(project.estado)}</span>
                    </div>
                </div>
                
                <p class="project-description">${project.descripcion}</p>
                
                <div class="project-meta">
                    <span class="project-meta-item">
                        <span>📁</span> ${project.categoria}
                    </span>
                    <span class="project-meta-item">
                        <span>💰</span> ${project.presupuesto}
                    </span>
                    <span class="project-meta-item">
                        <span>⏱️</span> ${project.duracion_estimada || 'No especificado'}
                    </span>
                </div>
                
                ${project.tags && project.tags.length > 0 ? `
                    <div class="project-tags">
                        ${project.tags.map(tag => `<span class="project-tag">#${tag}</span>`).join('')}
                    </div>
                ` : ''}
                
                <div class="project-footer">
                    <div class="project-members">
                        <span style="color: var(--text-muted); font-size: 0.875rem;">
                            ${project.miembros ? project.miembros.length : 0} miembros
                        </span>
                        ${this.renderMemberAvatars(project.miembros || [])}
                    </div>
                    ${project.autor_id !== sessionForumUserId ? `
                        <button class="join-project-btn" onclick="event.stopPropagation(); projectsManager.joinProject('${project.id}')">
                            Unirse
                        </button>
                        <button class="btn-chat" data-chat-target="${project.autor_id}" onclick="event.stopPropagation(); openChatWith('${project.autor_id}')">💬</button>
                    ` : ''}
                </div>
            </div>
        `).join('');
    }

    renderMemberAvatars(members) {
        const maxShow = 3;
        const toShow = members.slice(0, maxShow);
        const remaining = members.length - maxShow;

        return toShow.map(member => `
            <div class="member-avatar" title="${member.nombre}">
                ${member.nombre.charAt(0).toUpperCase()}
            </div>
        `).join('') + (remaining > 0 ? `
            <div class="member-avatar" style="background: var(--bg-tertiary); color: var(--text-muted);">
                +${remaining}
            </div>
        ` : '');
    }

    getStatusText(status) {
        const statusMap = {
            'open': 'Abierto',
            'abierto': 'Abierto',
            'in-progress': 'En progreso',
            'closed': 'Cerrado',
            'cerrado': 'Cerrado'
        };
        return statusMap[status] || status;
    }

    filterProjects(searchTerm) {
        const filtered = this.projects.filter(project => {
            const term = searchTerm.toLowerCase();
            return project.titulo.toLowerCase().includes(term) ||
                   project.descripcion.toLowerCase().includes(term) ||
                   project.categoria.toLowerCase().includes(term) ||
                   (project.tags && project.tags.some(tag => tag.toLowerCase().includes(term)));
        });

        this.renderFilteredProjects(filtered);
    }

    renderFilteredProjects(projects) {
        const grid = document.getElementById('projectsGrid');
        if (projects.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 4rem;">
                    <p style="color: var(--text-muted);">No se encontraron proyectos con ese criterio.</p>
                </div>
            `;
            return;
        }

        // Re-renderizar con proyectos filtrados
        const temp = this.projects;
        this.projects = projects;
        this.renderProjects();
        this.projects = temp;
    }

    openNewProjectModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.add('active');
        this.tags = [];
        this.updateTagsDisplay();
    }

    closeProjectModal() {
        const modal = document.getElementById('projectModal');
        modal.classList.remove('active');
        document.getElementById('projectForm').reset();
        this.tags = [];
        this.updateTagsDisplay();
    }

    addTag(tag) {
        tag = tag.trim().toLowerCase();
        if (tag && !this.tags.includes(tag) && this.tags.length < 5) {
            this.tags.push(tag);
            this.updateTagsDisplay();
        }
    }

    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
        this.updateTagsDisplay();
    }

    updateTagsDisplay() {
        const tagList = document.getElementById('tagList');
        const tagsHidden = document.getElementById('tagsHidden');
        
        tagList.innerHTML = this.tags.map(tag => `
            <span class="tag-item">
                #${tag}
                <span class="tag-remove" onclick="projectsManager.removeTag('${tag}')">✕</span>
            </span>
        `).join('');
        
        tagsHidden.value = JSON.stringify(this.tags);
    }

    async submitProject(event) {
        const payload = {
            titulo:       event.target.titulo.value,
            categoria:    event.target.categoria.value,
            presupuesto:  event.target.presupuesto.value,
            descripcion:  event.target.descripcion.value,
            duracion:     event.target.duracion_estimada.value,
            roles:        event.target.roles_necesarios.value.split(',').map(r => r.trim()).filter(Boolean),
            tags:         this.tags || []
        };

        try {
            const response = await fetch('/projects/create', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                this.closeProjectModal();
                this.loadProjects();
                this.showNotification('Proyecto creado exitosamente', 'success');
            } else {
                this.showNotification(data.error || 'Error al crear proyecto', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error de conexión', 'error');
        }
    }

    async viewProject(projectId) {
        const project = this.projects.find(p => p.id === projectId);
        if (!project) return;

        const modal = document.getElementById('projectDetailModal');
        const title = document.getElementById('detailTitle');
        const content = document.getElementById('projectDetailContent');

        title.textContent = project.titulo;
        content.innerHTML = `
            <div class="project-detail-content">
                <div class="detail-section">
                    <h4>Descripción</h4>
                    <p>${project.descripcion}</p>
                </div>
                
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Categoría</span>
                        <span class="detail-value">${project.categoria}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Presupuesto</span>
                        <span class="detail-value">${project.presupuesto}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duración</span>
                        <span class="detail-value">${project.duracion_estimada || 'No especificado'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Creado por</span>
                        <span class="detail-value">${project.autor_nombre}</span>
                    </div>
                </div>
                
                ${project.roles_necesarios ? `
                    <div class="detail-section">
                        <h4>Roles necesarios</h4>
                        <p>${project.roles_necesarios}</p>
                    </div>
                ` : ''}
                
                ${project.tags && project.tags.length > 0 ? `
                    <div class="detail-section">
                        <h4>Tags</h4>
                        <div class="project-tags">
                            ${project.tags.map(tag => `<span class="project-tag">#${tag}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                <div class="detail-section">
                    <h4>Miembros del proyecto (${project.miembros ? project.miembros.length : 0})</h4>
                    <div class="members-list">
                        ${project.miembros && project.miembros.length > 0 ? 
                            project.miembros.map(member => `
                                <div class="member-item">
                                    <div class="member-avatar">${member.nombre.charAt(0).toUpperCase()}</div>
                                    <span>${member.nombre}</span>
                                </div>
                            `).join('') : 
                            '<p style="color: var(--text-muted);">No hay miembros aún</p>'
                        }
                    </div>
                </div>
                
                <div class="detail-actions">
                    ${project.autor_id !== sessionForumUserId ? `
                        <button class="cta-button" onclick="projectsManager.sendJoinRequest('${project.id}')">
                            Solicitar unirse al proyecto
                        </button>
                    ` : `
                        <button class="btn-secondary" onclick="projectsManager.editProject('${project.id}')">
                            Editar proyecto
                        </button>
                    `}
                </div>
            </div>
        `;

        modal.classList.add('active');
    }

    async joinProject(projectId) {
        if (!sessionForumUserId) {
            window.location.href = '/forum';
            return;
        }

        try {
            const response = await fetch(`/api/projects/${projectId}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Solicitud enviada al creador del proyecto', 'success');
                this.loadProjects();
            } else {
                this.showNotification(data.error || 'Error al enviar solicitud', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error de conexión', 'error');
        }
    }

    async sendJoinRequest(projectId) {
        const modal = document.getElementById('projectDetailModal');
        modal.classList.remove('active');
        await this.joinProject(projectId);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">✕</button>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: ${type === 'success' ? 'var(--primary)' : 'var(--accent)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: var(--radius-lg);
            box-shadow: var(--project-shadow);
            display: flex;
            align-items: center;
            gap: 1rem;
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Funciones globales para onclick
function closeProjectModal() {
    projectsManager.closeProjectModal();
}

function closeDetailModal() {
    const modal = document.getElementById('projectDetailModal');
    modal.classList.remove('active');
}

// Variable global para el ID del usuario actual (definir en el template)
let sessionForumUserId = null;

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    // Obtener ID del usuario de la sesión desde el template
    const userElement = document.querySelector('[data-user-id]');
    if (userElement) {
        sessionForumUserId = userElement.dataset.userId;
    }
    
    window.projectsManager = new ProjectsManager();
});

// Animaciones CSS adicionales
const style = document.createElement('style');
style.textContent = `
@keyframes slideInRight {
    from {
        opacity: 0;
        transform: translateX(20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes slideOutRight {
    from {
        opacity: 1;
        transform: translateX(0);
    }
    to {
        opacity: 0;
        transform: translateX(20px);
    }
}

.detail-section {
    margin-bottom: var(--space-xl);
}

.detail-section h4 {
    color: var(--text-primary);
    margin-bottom: var(--space-md);
    font-weight: 600;
}

.detail-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-lg);
    margin-bottom: var(--space-xl);
}

.detail-item {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
}

.detail-label {
    color: var(--text-muted);
    font-size: 0.875rem;
    font-weight: 500;
}

.detail-value {
    color: var(--text-primary);
    font-weight: 500;
}

.members-list {
    display: flex;
    flex-direction: column;
    gap: var(--space-md);
}

.member-item {
    display: flex;
    align-items: center;
    gap: var(--space-md);
}

.detail-actions {
    display: flex;
    gap: var(--space-md);
    margin-top: var(--space-2xl);
    padding-top: var(--space-xl);
    border-top: 1px solid var(--project-border);
}
`;
document.head.appendChild(style);

// Agregar profesionales al modal de crear proyecto
function actualizarModalProyecto() {
    const modal = document.getElementById('project-modal');
    const profesionesContainer = document.createElement('div');
    profesionesContainer.className = 'profesiones-container';
    profesionesContainer.innerHTML = `
        <label>Profesiones requeridas:</label>
        <div class="profesiones-grid">
            ${PROFESIONES_DISPONIBLES.map(prof => `
                <div class="profesion-selector" data-profesion="${prof}">
                    <input type="checkbox" id="prof-${prof}" name="profesiones" value="${prof}">
                    <label for="prof-${prof}" class="profesion-card">${prof}</label>
                    <input type="number" class="cupos-input" min="1" max="10" value="1" 
                           placeholder="Cupos" title="Número de cupos para ${prof}">
                </div>
            `).join('')}
        </div>
    `;
    const descripcionField = modal.querySelector('textarea[name="descripcion"]').parentNode;
    descripcionField.after(profesionesContainer);
}

const PROFESIONES_DISPONIBLES = [
    "Editor", "Animador 3D", "Camarógrafo", "Narrador de voz",
    "Fotógrafo", "Sonidista", "Guionista", "Doblaje", "Creador de contenido"
];

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('project-modal')) {
        actualizarModalProyecto();
    }
});

