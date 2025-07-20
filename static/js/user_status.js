class UserStatusManager {
    constructor() {
        this.currentStatus = 'online';
        this.heartbeatInterval = null;
        this.init();
    }

    init() {
        this.createStatusSelector();
        this.startHeartbeat();
        this.setupEventListeners();
        this.loadOnlineUsers();
    }

    createStatusSelector() {
        // Verificar si ya existe
        if (document.getElementById('user-status-selector')) return;

        const selector = document.createElement('div');
        selector.id = 'user-status-selector';
        selector.className = 'status-selector';
        selector.innerHTML = `
            <label for="status-select">Estado:</label>
            <select id="status-select">
                <option value="online">🟢 En línea</option>
                <option value="ocupado">🟡 Ocupado</option>
                <option value="offline">⚫ Desconectado</option>
            </select>
        `;

        const sidebar = document.querySelector('.forum-sidebar') || 
                       document.querySelector('.dashboard-sidebar') ||
                       document.querySelector('.sidebar');
        
        if (sidebar) {
            sidebar.appendChild(selector);
        }
    }

    setupEventListeners() {
        const statusSelect = document.getElementById('status-select');
        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => {
                this.updateStatus(e.target.value);
            });
        }

        let inactivityTimer;
        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                if (this.currentStatus === 'online') {
                    this.updateStatus('ocupado', false);
                }
            }, 300000);
        };

        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'].forEach(event => {
            document.addEventListener(event, resetTimer, true);
        });
    }

    async updateStatus(newStatus, updateSelector = true) {
        try {
            const response = await fetch('/status/update_status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });

            const result = await response.json();
            if (result.success) {
                this.currentStatus = newStatus;
                
                if (updateSelector) {
                    const statusSelect = document.getElementById('status-select');
                    if (statusSelect) {
                        statusSelect.value = newStatus;
                    }
                }

                this.updateUIStatus(newStatus);
                this.loadOnlineUsers();
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    }

    updateUIStatus(status) {
        const statusIndicators = document.querySelectorAll('.my-status-indicator');
        statusIndicators.forEach(indicator => {
            indicator.className = `my-status-indicator status-${status}`;
        });
    }

    async loadOnlineUsers() {
        try {
            const response = await fetch('/status/get_online_users');
            const result = await response.json();
            
            if (result.success) {
                this.renderOnlineUsers(result.users);
            }
        } catch (error) {
            console.error('Error loading online users:', error);
        }
    }

    renderOnlineUsers(users) {
        const container = document.getElementById('usuarios-online-list');
        if (!container) return;

        if (users.length === 0) {
            container.innerHTML = '<div class="no-users">No hay usuarios conectados</div>';
            return;
        }

        container.innerHTML = users.map(user => `
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
                    <button class="btn-add-friend" onclick="showUserActions('${user.user_id}', this)">
                        ⋯
                    </button>
                </div>
            </div>
        `).join('');

        this.setupUserInteractions();
    }

    setupUserInteractions() {
        const userItems = document.querySelectorAll('.user-online-item');
        userItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (!e.target.closest('.user-actions')) {
                    const userId = item.dataset.userId;
                    this.showUserProfile(userId, e.target);
                }
            });
        });
    }

    showUserProfile(userId, element) {
        console.log('Showing profile for user:', userId);
    }

    getStatusText(status) {
        const statusTexts = {
            'online': 'En línea',
            'ocupado': 'Ocupado',
            'offline': 'Desconectado'
        };
        return statusTexts[status] || 'Desconocido';
    }

    startHeartbeat() {
        this.heartbeatInterval = setInterval(() => {
            if (this.currentStatus !== 'offline') {
                this.updateStatus(this.currentStatus, false);
            }
        }, 30000);
    }

    destroy() {
        if (this.heartbeatInterval) {
            clearInterval(this.heartbeatInterval);
        }
    }
}

function showUserActions(userId, button) {
    const existingMenu = document.querySelector('.user-context-menu');
    if (existingMenu) {
        existingMenu.remove();
    }

    const menu = document.createElement('div');
    menu.className = 'user-context-menu';
    menu.innerHTML = `
        <button onclick="sendFriendRequest('${userId}')" class="context-menu-item">
            👤 Agregar amigo
        </button>
        <button onclick="sendMessage('${userId}')" class="context-menu-item">
            💬 Enviar mensaje
        </button>
    `;

    document.body.appendChild(menu);

    const rect = button.getBoundingClientRect();
    menu.style.position = 'absolute';
    menu.style.top = (rect.bottom + window.scrollY) + 'px';
    menu.style.left = (rect.left + window.scrollX) + 'px';
    menu.style.zIndex = '1001';

    setTimeout(() => {
        document.addEventListener('click', function closeMenu(e) {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        });
    }, 100);
}

async function sendFriendRequest(userId) {
    try {
        const response = await fetch('/friends/send_friend_request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ receptor_id: userId })
        });

        const result = await response.json();
        if (result.success) {
            showToast('Solicitud de amistad enviada', 'success');
        } else {
            showToast(result.error || 'Error al enviar solicitud', 'error');
        }
    } catch (error) {
        showToast('Error de conexión', 'error');
    }

    document.querySelector('.user-context-menu')?.remove();
}

function sendMessage(userId) {
    // chat removed
    document.querySelector('.user-context-menu')?.remove();
}

function showToast(message, type = 'info') {
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

document.addEventListener('DOMContentLoaded', () => {
    if (window.currentUser && window.currentUser.authenticated) {
        window.userStatusManager = new UserStatusManager();
    }
});

window.addEventListener('beforeunload', () => {
    if (window.userStatusManager) {
        window.userStatusManager.destroy();
    }
});
