import { useEffect, useRef, useState, type FC } from 'react';
import { X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  id: number;
  text: string;
  sender?: string;
}

interface ChatModalProps {
  open: boolean;
  onClose: () => void;
}

const socket: Socket = io(import.meta.env.VITE_CHAT_URL ?? 'http://localhost:4000');

const EeviChatModal: FC<ChatModalProps> = ({ open, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState('');
  const [minimized, setMinimized] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    socket.on('chat message', (msg: ChatMessage) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    if (endRef.current) endRef.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  function send() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const msg: ChatMessage = { id: Date.now(), text: trimmed, sender: 'User' };
    setMessages(prev => [...prev, msg]);
    socket.emit('chat message', msg);
    setText('');
  }

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 w-80 max-h-[70vh] bg-white text-black border border-gray-300 rounded shadow flex flex-col z-50 fade-in">
      <header className="p-2 flex items-center justify-between bg-gray-100 rounded-t">
        <span>Chat</span>
        <div className="flex gap-1">
          <button onClick={() => setMinimized(!minimized)} aria-label="Minimizar" className="text-gray-600">
            {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose} aria-label="Cerrar" className="text-gray-600">
            <X size={16} />
          </button>
        </div>
      </header>
      {!minimized && (
        <>
          <div className="flex-1 overflow-y-auto p-2">
            {messages.map(m => (
              <div key={m.id} className="mb-1">
                <span className="font-bold">{m.sender ?? 'Anon'}:</span> {m.text}
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <footer className="border-t border-gray-300 p-2 flex gap-1">
            <textarea
              className="flex-1 resize-none border border-gray-300 rounded p-1 bg-transparent"
              rows={1}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Escribe... Ctrl+Enter"
            />
            <button onClick={send} aria-label="Enviar" className="bg-blue-600 text-white rounded px-2">
              <Send size={16} />
            </button>
          </footer>
        </>
      )}
    </div>
  );
};

export default EeviChatModal;
