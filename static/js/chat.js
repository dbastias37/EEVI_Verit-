class ChatManager {
    constructor(chatId, userId) {
        this.chatId = chatId;
        this.userId = userId;
        this._pollInterval = null;
        this.init();
    }

    async init() {
        await this.loadMessages();
        this._pollInterval = setInterval(() => this.loadMessages(), 4000);
        const input = document.getElementById('chat-input');
        input.addEventListener('keydown', e => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                this.sendMessage(input.value);
                input.value = '';
            }
        });
    }

    async loadMessages() {
        try {
            const res = await fetch(`/chat/get_messages/${this.chatId}`);
            const data = await res.json();
            if (!data.success) {
                console.error('Chat polling stopped:', data.error);
                clearInterval(this._pollInterval);
                return;
            }
            if (data.success) {
                this.renderMessages(data.messages);
            }
        } catch (e) {
            console.error('loadMessages', e);
        }
    }

    renderMessages(msgs) {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        container.innerHTML = msgs.map(m => {
            const mine = m.autor_id === this.userId;
            return `
            <div class="chat-bubble ${mine ? 'mine' : 'other'}">
                <div class="text">${m.mensaje}</div>
                <div class="time">${this.formatFecha(m.fecha)}</div>
            </div>`;
        }).join('');
        this.autoScrollBottom();
    }

    async sendMessage(text) {
        text = (text || '').trim();
        if (!text) return;
        try {
            const res = await fetch('/chat/send_message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: this.chatId, mensaje: text })
            });
            const data = await res.json();
            if (data.success) {
                await this.loadMessages();
            }
        } catch (e) {
            console.error('sendMessage', e);
        }
    }

    autoScrollBottom() {
        const container = document.getElementById('chat-messages');
        container.scrollTop = container.scrollHeight;
    }

    formatFecha(fecha) {
        try {
            let d;
            if (typeof fecha === 'string') d = new Date(fecha);
            else if (fecha && fecha.seconds) d = new Date(fecha.seconds * 1000);
            else d = new Date();
            const diff = Date.now() - d.getTime();
            if (diff < 60000) return 'Hace un momento';
            if (diff < 3600000) return `Hace ${Math.floor(diff/60000)} min`;
            return d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'});
        } catch (e) {
            return '';
        }
    }

    destroy() {
        clearInterval(this._pollInterval);
    }
}

let currentChat = null;

async function openChatWith(userId) {
    if (!window.currentUser || !window.currentUser.user_id) return;
    try {
        const res = await fetch('/chat/create_chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ participantes: [window.currentUser.user_id, userId] })
        });
        const data = await res.json();
        if (data.success) {
            showChatModal(data.chat_id);
        }
    } catch (e) {
        console.error('openChatWith', e);
    }
}

function showChatModal(chatId) {
    const modal = document.getElementById('chat-modal');
    modal.classList.remove('hidden');
    if (currentChat) currentChat.destroy();
    currentChat = new ChatManager(chatId, window.currentUser.user_id);
}

function closeChatModal() {
    const modal = document.getElementById('chat-modal');
    modal.classList.add('hidden');
    if (currentChat) currentChat.destroy();
    currentChat = null;
    document.getElementById('chat-messages').innerHTML = '';
}

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-chat')) {
        const target = e.target.dataset.chatTarget;
        if (target) {
            e.preventDefault();
            openChatWith(target);
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const btnClose = document.getElementById('chat-close');
    if (btnClose) btnClose.addEventListener('click', closeChatModal);
});
