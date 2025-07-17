// VFORUM Interactive JavaScript - Sistema Dinámico

document.addEventListener('DOMContentLoaded', function() {
    const forum = new VForumInteractive();
});

class VForumInteractive {
    constructor() {
        this.initElements();
        this.bindEvents();
        this.loadResponses();
    }

    initElements() {
        this.newTopicBtn = document.getElementById('newTopicBtn');
        this.newTopicForm = document.getElementById('newTopicForm');
        this.topicForm = document.getElementById('topicForm');
        this.cancelBtn = document.getElementById('cancelBtn');
        this.fabBtn = document.getElementById('fabBtn');
        this.topicsList = document.getElementById('topicsList');
    }

    bindEvents() {
        // Botones para mostrar formulario
        if (this.newTopicBtn) {
            this.newTopicBtn.addEventListener('click', () => this.showNewTopicForm());
        }
        if (this.fabBtn) {
            this.fabBtn.addEventListener('click', () => this.showNewTopicForm());
        }
        
        // Botón cancelar
        if (this.cancelBtn) {
            this.cancelBtn.addEventListener('click', () => this.hideNewTopicForm());
        }

        // Envío de formulario (interceptar para hacer AJAX)
        if (this.topicForm) {
            this.topicForm.addEventListener('submit', (e) => this.handleTopicSubmit(e));
        }

        // Click en topic cards para expandir
        document.querySelectorAll('.topic-card').forEach(card => {
            const topicId = card.dataset.topicId;
            card.addEventListener('click', (e) => {
                if (!e.target.closest('.delete-btn') && 
                    !e.target.closest('.topic-detail') && 
                    !e.target.closest('.form-actions')) {
                    this.toggleTopicDetail(topicId);
                }
            });
        });
    }

    showNewTopicForm() {
        if (this.newTopicBtn) this.newTopicBtn.classList.add('hidden');
        if (this.fabBtn) this.fabBtn.classList.add('hidden');
        if (this.newTopicForm) {
            this.newTopicForm.classList.add('show');
            // Focus en el primer campo
            const firstInput = this.newTopicForm.querySelector('input');
            if (firstInput) firstInput.focus();
        }
    }

    hideNewTopicForm() {
        if (this.newTopicForm) {
            this.newTopicForm.classList.remove('show');
        }
        
        // Esperar a que termine la animación antes de mostrar botones
        setTimeout(() => {
            if (this.newTopicBtn) this.newTopicBtn.classList.remove('hidden');
            if (this.fabBtn) this.fabBtn.classList.remove('hidden');
        }, 400);
        
        // Limpiar formulario
        if (this.topicForm) this.topicForm.reset();
    }

    async handleTopicSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.topicForm);
        const submitBtn = this.topicForm.querySelector('button[type="submit"]');
        
        // Mostrar estado de carga
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Publicando...';
        submitBtn.disabled = true;

        try {
            const response = await fetch(this.topicForm.action, {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Recargar la página para mostrar el nuevo tema
                window.location.reload();
            } else {
                throw new Error('Error al crear el tema');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el tema. Inténtalo de nuevo.');
            
            // Restaurar botón
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    toggleTopicDetail(topicId) {
        const detail = document.getElementById(`detail-${topicId}`);
        if (!detail) return;

        const isVisible = detail.classList.contains('show');
        
        // Cerrar otros topics abiertos
        document.querySelectorAll('.topic-detail.show').forEach(el => {
            el.classList.remove('show');
        });

        if (!isVisible) {
            detail.classList.add('show');
            this.loadTopicResponses(topicId);
        }
    }

    closeTopic(topicId) {
        const detail = document.getElementById(`detail-${topicId}`);
        if (detail) {
            detail.classList.remove('show');
        }
    }

    async loadTopicResponses(topicId) {
        try {
            const response = await fetch(`/forum/topic/${topicId}/responses`);
            if (response.ok) {
                const responses = await response.json();
                this.renderResponses(topicId, responses);
            }
        } catch (error) {
            console.error('Error loading responses:', error);
        }
    }

    renderResponses(topicId, responses) {
        const container = document.getElementById(`responses-${topicId}`);
        const countElement = document.getElementById(`responses-count-${topicId}`);
        const titleCountElement = document.getElementById(`responses-title-count-${topicId}`);
        
        if (!container) return;

        if (responses.length === 0) {
            container.innerHTML = '<p style="color: var(--text-muted); font-style: italic;">Sé el primero en responder este tema.</p>';
        } else {
            container.innerHTML = responses.map(response => `
                <div class="response-card">
                    <div class="response-meta">Por ${response.author} • ${this.getTimeAgo(new Date(response.timestamp))}</div>
                    <div class="response-content">${response.content}</div>
                </div>
            `).join('');
        }

        // Actualizar contadores
        if (countElement) countElement.textContent = responses.length;
        if (titleCountElement) titleCountElement.textContent = responses.length;
    }

    async loadResponses() {
        // Cargar respuestas para todos los topics visibles
        document.querySelectorAll('.topic-card').forEach(card => {
            const topicId = card.dataset.topicId;
            if (topicId) {
                this.loadTopicResponses(topicId);
            }
        });
    }

    getTimeAgo(date) {
        const now = new Date();
        const diff = now - date;
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 1) return 'Hace unos segundos';
        if (minutes < 60) return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        if (hours < 24) return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
        return `Hace ${days} día${days > 1 ? 's' : ''}`;
    }
}

// Funciones globales para ser llamadas desde el HTML
function closeTopic(topicId) {
    const detail = document.getElementById(`detail-${topicId}`);
    if (detail) {
        detail.classList.remove('show');
    }
}

async function addResponse(event, topicId) {
    event.preventDefault();
    
    const form = event.target;
    const textarea = form.querySelector('textarea[name="response_content"]');
    const content = textarea.value.trim();
    const submitBtn = form.querySelector('button[type="submit"]');
    
    if (!content) {
        alert('Por favor escribe una respuesta');
        return;
    }

    // Estado de carga
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('author', 'Usuario'); // O el usuario actual desde la sesión

        const response = await fetch(`/forum/topic/${topicId}/reply`, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            // Limpiar formulario
            textarea.value = '';
            
            // Recargar respuestas del topic
            const forum = new VForumInteractive();
            await forum.loadTopicResponses(topicId);
            
        } else {
            throw new Error('Error al enviar la respuesta');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al enviar la respuesta. Inténtalo de nuevo.');
    } finally {
        // Restaurar botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

async function deleteTopic(topicId) {
    if (!confirm('¿Estás seguro de que quieres eliminar este tema?')) {
        return;
    }

    try {
        const response = await fetch(`/forum/topic/${topicId}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (response.ok) {
            // Remover el tema del DOM
            const topicCard = document.querySelector(`[data-topic-id="${topicId}"]`);
            if (topicCard) {
                topicCard.style.opacity = '0';
                topicCard.style.transform = 'translateY(-20px)';
                setTimeout(() => {
                    topicCard.remove();
                }, 300);
            }
        } else {
            throw new Error('Error al eliminar el tema');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al eliminar el tema. Inténtalo de nuevo.');
    }
}
