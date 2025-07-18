// Sistema de mensajes de proyectos
class MessagesManager {
    constructor() {
        this.messages = [];
        this.unreadCount = 0;
        this.userId = document.querySelector('[data-user-id]')?.dataset.userId;
        
        if (this.userId) {
            this.init();
        }
    }

    init() {
        this.loadMessages();
        // Actualizar cada 30 segundos
        setInterval(() => this.loadMessages(), 30000);
    }

    async loadMessages() {
        try {
            const response = await fetch('/api/messages/projects');
            const data = await response.json();
            
            if (data.success) {
                this.messages = data.messages;
                this.updateUnreadCount();
                this.renderMessages();
            }
        } catch (error) {
            console.error('Error loading messages:', error);
        }
    }

    updateUnreadCount() {
        this.unreadCount = this.messages.filter(m => !m.leido).length;
        const badge = document.getElementById('unreadCount');
        if (badge) {
            badge.textContent = this.unreadCount;
            badge.style.display = this.unreadCount > 0 ? 'block' : 'none';
        }
    }

    renderMessages() {
        const container = document.getElementById('messagesList');
        if (!container) return;

        if (this.messages.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; color: var(--dash-text-muted); padding: 2rem;">
                    No tienes mensajes de proyectos
                </div>
            `;
            return;
        }

        container.innerHTML = this.messages.map(msg => `
            <div class="message-item ${!msg.leido ? 'unread' : ''}" 
                 onclick="messagesManager.handleMessage('${msg.id}')">
                <div class="message-type">${this.getMessageTypeText(msg.tipo)}</div>
                <div class="message-content">${msg.mensaje}</div>
                <div class="message-meta">
                    <span>${msg.emisor_nombre}</span>
                    <span>${this.formatDate(msg.created_at)}</span>
                </div>
                ${msg.tipo === 'solicitud_proyecto' && msg.estado === 'pendiente' ? `
                    <div class="message-actions">
                        <button class="msg-btn msg-btn-accept" 
                                onclick="event.stopPropagation(); messagesManager.acceptRequest('${msg.id}', '${msg.proyecto_id}', '${msg.emisor_id}')">
                            Aceptar
                        </button>
                        <button class="msg-btn msg-btn-reject" 
                                onclick="event.stopPropagation(); messagesManager.rejectRequest('${msg.id}')">
                            Rechazar
                        </button>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    getMessageTypeText(tipo) {
        const types = {
            'solicitud_proyecto': '📋 Solicitud de Proyecto',
            'notificacion': '🔔 Notificación',
            'mensaje': '💬 Mensaje'
        };
        return types[tipo] || tipo;
    }

    formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        const now = new Date();
        const diff = now - date;
        
        if (diff < 60000) return 'Hace un momento';
        if (diff < 3600000) return `Hace ${Math.floor(diff / 60000)} minutos`;
        if (diff < 86400000) return `Hace ${Math.floor(diff / 3600000)} horas`;
        if (diff < 604800000) return `Hace ${Math.floor(diff / 86400000)} días`;
        
        return date.toLocaleDateString('es-CL', { 
            day: 'numeric', 
            month: 'short',
            year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
        });
    }

    async handleMessage(messageId) {
        // Marcar como leído
        await this.markAsRead(messageId);
        this.loadMessages();
    }

    async markAsRead(messageId) {
        try {
            await fetch(`/api/messages/${messageId}/read`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error marking message as read:', error);
        }
    }

    async acceptRequest(messageId, projectId, userId) {
        try {
            const response = await fetch(`/api/projects/${projectId}/accept/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Usuario aceptado en el proyecto', 'success');
                this.loadMessages();
            } else {
                this.showNotification(data.error || 'Error al aceptar solicitud', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            this.showNotification('Error de conexión', 'error');
        }
    }

    async rejectRequest(messageId) {
        try {
            const response = await fetch(`/api/messages/${messageId}/reject`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            
            if (data.success) {
                this.showNotification('Solicitud rechazada', 'info');
                this.loadMessages();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'var(--dash-primary)' : 'var(--dash-accent)'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: var(--dash-shadow);
            z-index: 1000;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', () => {
    window.messagesManager = new MessagesManager();
});

