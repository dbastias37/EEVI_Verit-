class ChatManager {
  constructor() {
    this.widget      = document.getElementById('chat-widget');
    this.title       = document.getElementById('chat-title');
    this.closeBtn    = document.getElementById('chat-close-btn');
    this.msgBox      = document.getElementById('chat-messages');
    this.input       = document.getElementById('chat-input');
    this.sendBtn     = document.getElementById('send-btn');
    this.emojiBtn    = document.getElementById('emoji-btn');
    this.emojiPicker = document.getElementById('emoji-picker');

    /* listeners */
    this.closeBtn.addEventListener('click', () => this.close());
    this.sendBtn.addEventListener('click', () => this.send());
    this.input.addEventListener('keydown', e => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        this.send();
      }
    });
    this.emojiBtn.addEventListener('click', () =>
      this.emojiPicker.classList.toggle('hidden'));
    this.emojiPicker.addEventListener('click', e => {
      if (e.target.textContent.trim()) {
        this.input.value += e.target.textContent.trim();
        this.emojiPicker.classList.add('hidden');
        this.input.focus();
      }
    });
  }

  _show() {
    this.widget.classList.remove('invisible', 'opacity-0', 'translate-y-4');
  }
  _hide() {
    this.widget.classList.add('opacity-0', 'translate-y-4');
    setTimeout(() => this.widget.classList.add('invisible'), 300);
  }

  open(chatId, targetName) {
    this._show();
    this.title.textContent = targetName ?? 'Chat';
    this.chatId = chatId;
    this.loadMessages();
    this.pollId = setInterval(() => this.loadMessages(), 4000);
  }

  close() {
    this._hide();
    if (this.pollId) clearInterval(this.pollId);
  }

  toggle() {
    if (this.widget.classList.contains('invisible')) {
      this._show();
    } else {
      this.close();
    }
  }

  async loadMessages() {
    try {
      const res = await fetch(`/chat/get_messages/${this.chatId}`);
      const data = await res.json();
      if (!data.success) { console.error(data.error); return this.close(); }
      const uid = window.currentUser.user_id;
      this.msgBox.innerHTML = data.messages.map(m => {
        const own = m.autor_id === uid;
        const base = 'inline-block max-w-[70%] px-3 py-1 rounded-lg break-words';
        const bubble = own
          ? `self-end bg-primary text-white rounded-br-none ${base}`
          : `self-start bg-neutral-700 rounded-bl-none ${base}`;
        return `<div class="flex ${own ? 'justify-end' : 'justify-start'}">
                  <span class="${bubble}">
                    <span class="font-semibold">${m.autor_nombre}:</span> ${m.mensaje}
                  </span>
                </div>`;
      }).join('');
      this.msgBox.scrollTop = this.msgBox.scrollHeight;
    } catch (err) {
      console.error('loadMessages', err);
    }
  }

  async send() {
    const texto = this.input.value.trim();
    if (!texto) return;
    try {
      await fetch('/chat/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: this.chatId, mensaje: texto })
      });
      await this.loadMessages();
      this.input.value = '';
    } catch (err) {
      console.error('send', err);
    }
  }
}

const chatManager = new ChatManager();
window.chatManager = chatManager;

async function openChatWith(userId, name) {
  if (!window.currentUser || !window.currentUser.user_id) return;
  try {
    const res = await fetch('/chat/create_chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantes: [window.currentUser.user_id, userId] })
    });
    const data = await res.json();
    if (data.success) {
      chatManager.open(data.chat_id, name);
    }
  } catch (e) {
    console.error('openChatWith', e);
  }
}

/* Mantiene compatibilidad con btn-chat existentes */
document.addEventListener('click', e => {
  const btn = e.target.closest('.btn-chat');
  if (!btn) return;
  const target = btn.dataset.chatTarget;
  const name   = btn.dataset.chatName || null;
  if (target) {
    e.preventDefault();
    openChatWith(target, name);
  }
});

