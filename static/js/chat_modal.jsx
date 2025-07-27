import { socket } from "./socket"; // Asegúrate que este archivo exista y esté configurado

const { useState, useEffect, useRef } = React;

function ChatModal() {
  const [open, setOpen] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [title, setTitle] = useState('Chat');
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const msgEnd = useRef(null);

  useEffect(() => {
    if (msgEnd.current) msgEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    function handler(e) {
      setTitle(e.detail.name || 'Chat');
      setChatId(e.detail.chatId);
      setOpen(true);
    }
    window.addEventListener('openChat', handler);
    return () => window.removeEventListener('openChat', handler);
  }, []);

  useEffect(() => {
    if (open && chatId) {
      socket.connect();
      loadMessages();

      socket.emit("join", { chatId });

      socket.on("nuevo_mensaje", (msg) => {
        if (msg.chat_id === chatId) {
          setMessages((prev) => [...prev, msg]);
        }
      });

      return () => {
        socket.off("nuevo_mensaje");
        socket.disconnect();
      };
    }
  }, [open, chatId]);

  async function loadMessages() {
    try {
      const res = await fetch(`/chat/get_messages/${chatId}`);
      const data = await res.json();
      if (data.success) setMessages(data.messages);
    } catch (e) {
      console.error('loadMessages', e);
    }
  }

  async function send() {
    const mensaje = text.trim();
    if (!mensaje) return;
    try {
      await fetch('/chat/send_message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, mensaje })
      });
      setText('');
      // No se llama a loadMessages porque el socket actualizará automáticamente
    } catch (e) {
      console.error('send', e);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      send();
    }
  }

  return (
    <div className={`fixed bottom-20 right-6 z-50 w-80 max-h-[70vh] bg-[var(--bg-secondary)] text-[var(--text-primary)] rounded-xl shadow-2xl ring-1 ring-neutral-700 flex flex-col transition-all duration-300 ${open ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 translate-y-4'}`}>
      <header className="flex items-center justify-between bg-neutral-900 px-3 py-2 rounded-t-xl">
        <h3 className="text-sm font-semibold truncate">{title}</h3>
        <button aria-label="Cerrar chat" className="text-sm hover:text-red-400" onClick={() => setOpen(false)}>✖</button>
      </header>
      <section className="flex-1 overflow-y-auto px-3 py-2 space-y-2 text-sm scrollbar-thin scrollbar-thumb-neutral-600 scrollbar-track-transparent">
        {messages.map((m, i) => {
          const own = m.autor_id === window.currentUser.user_id;
          const base = 'inline-block max-w-[70%] px-3 py-1 rounded-lg break-words';
          const bubble = own
            ? `self-end bg-[var(--primary)] text-white rounded-br-none ${base}`
            : `self-start bg-neutral-700 rounded-bl-none ${base}`;
          return (
            <div key={i} className={`flex ${own ? 'justify-end' : 'justify-start'}`}>
              <span className={bubble}>
                <span className="font-semibold">{m.autor_nombre}:</span> {m.mensaje}
              </span>
            </div>
          );
        })}
        <div ref={msgEnd}></div>
      </section>
      <footer className="border-t border-neutral-700 p-2 flex items-end gap-1">
        <textarea
          rows="1"
          placeholder="Escribe… Ctrl+Enter"
          className="flex-1 bg-transparent resize-none focus:outline-none placeholder-neutral-400"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKey}
        ></textarea>
        <button aria-label="Enviar" className="text-lg px-2 py-1 hover:text-[var(--primary)]" onClick={send}>
          ➤
        </button>
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('chat-root')).render(<ChatModal />);

window.openChatWith = async function(userId, name) {
  if (!window.currentUser || !window.currentUser.user_id) return;
  try {
    const res = await fetch('/chat/create_chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ participantes: [window.currentUser.user_id, userId] })
    });
    const data = await res.json();
    if (data.success) {
      const event = new CustomEvent('openChat', {
        detail: { chatId: data.chat_id, name }
      });
      window.dispatchEvent(event);
    }
  } catch (e) {
    console.error('openChatWith', e);
  }
};
