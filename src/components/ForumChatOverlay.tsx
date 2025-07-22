import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, User, Clock, Minimize2, Maximize2 } from 'lucide-react';

// Paleta de colores EEVI
const COLORS = {
  background: '#1A2332',
  text: '#E9E9E9',
  accent: '#00D4B8',
  secondary: '#2A3441',
  border: '#3A3F51'
};

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string;
  };
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, user }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "¡Bienvenido al chat de EEVI! 👋",
      sender: "Sistema",
      timestamp: new Date(Date.now() - 300000),
      isSystem: true
    },
    {
      id: 2,
      text: "Hola, ¿cómo están todos?",
      sender: "AlexDev",
      timestamp: new Date(Date.now() - 180000),
      isSystem: false
    },
    {
      id: 3,
      text: "Todo bien por aquí, trabajando en el nuevo update",
      sender: "MariaDesign",
      timestamp: new Date(Date.now() - 120000),
      isSystem: false
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const username = user.username || 'Usuario_Anónimo';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, isMinimized]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: username,
      timestamp: new Date(),
      isSystem: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    setTimeout(() => {
      const responses = [
        "¡Interesante punto de vista! 🤔",
        "Gracias por participar en la conversación 👍",
        "¿Alguien más tiene experiencia con esto? 🙋‍♂️",
        "Excelente aporte al debate 💭",
        "Me gusta esa perspectiva 🎯",
        "Buen punto para discutir 📝"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: randomResponse,
        sender: "Bot_EEVI",
        timestamp: new Date(),
        isSystem: true
      }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSendMessage();
    } else if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.replace(urlRegex, '<a href="$1" target="_blank" rel="noopener noreferrer" style="color: #00D4B8; text-decoration: underline;">$1</a>');
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 w-96 rounded-lg shadow-2xl font-mono"
      style={{ backgroundColor: COLORS.background, color: COLORS.text, border: `2px solid ${COLORS.border}` }}
    >
      <div 
        className="flex items-center justify-between p-4 border-b-2 rounded-t-lg"
        style={{ borderColor: COLORS.border, backgroundColor: COLORS.secondary }}
      >
        <div className="flex items-center gap-2">
          <MessageCircle size={18} style={{ color: COLORS.accent }} />
          <span className="font-bold text-sm">CHAT GLOBAL EEVI</span>
          <span className="text-xs font-bold px-2 py-1 rounded" style={{ color: COLORS.accent, backgroundColor: COLORS.background }}>LIVE</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setIsMinimized(!isMinimized)} className="transition-colors hover:opacity-80" style={{ color: COLORS.text }} onMouseEnter={(e) => (e.currentTarget.style.color = COLORS.accent)} onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}>
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose} className="transition-colors hover:opacity-80" style={{ color: COLORS.text }} onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')} onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.text)}>
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          <div className="h-80 overflow-y-auto p-4 space-y-3 scrollbar-thin" style={{ backgroundColor: COLORS.background, scrollbarColor: `${COLORS.border} ${COLORS.secondary}` }}>
            {messages.map((message) => (
              <div key={message.id} className="space-y-1">
                <div className="flex items-center gap-2 text-xs">
                  <User size={12} style={{ color: message.isSystem ? COLORS.accent : COLORS.text }} />
                  <span className="font-bold" style={{ color: message.isSystem ? COLORS.accent : COLORS.text }}>{message.sender}</span>
                  <Clock size={10} className="text-gray-500" />
                  <span className="text-gray-500">{formatTime(message.timestamp)}</span>
                </div>
                <div className="text-sm p-3 rounded border-l-4" style={{
                    backgroundColor: message.isSystem ? COLORS.secondary : message.sender === username ? COLORS.border : COLORS.secondary,
                    borderColor: message.isSystem ? COLORS.accent : message.sender === username ? COLORS.accent : COLORS.border,
                    color: message.isSystem ? COLORS.accent : COLORS.text,
                    marginLeft: message.sender === username ? '1rem' : '0'
                  }} dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t-2 rounded-b-lg" style={{ borderColor: COLORS.border, backgroundColor: COLORS.secondary }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs" style={{ color: COLORS.accent }}>Conectado como:</span>
              <span className="text-xs font-bold" style={{ color: COLORS.text }}>{username}</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: '#10b981' }}></div>
                <span className="text-xs text-green-400">En línea</span>
              </div>
            </div>
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje... (Enter para enviar, Shift+Enter para nueva línea)"
                className="flex-1 rounded px-3 py-2 text-sm placeholder-gray-500 focus:outline-none transition-all"
                style={{ backgroundColor: COLORS.background, border: `2px solid ${COLORS.border}`, color: COLORS.text }}
                onFocus={(e) => e.currentTarget.style.borderColor = COLORS.accent}
                onBlur={(e) => e.currentTarget.style.borderColor = COLORS.border}
              />
              <button onClick={handleSendMessage} disabled={!inputMessage.trim()} className="px-4 py-2 rounded font-bold text-sm border-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all" style={{ backgroundColor: COLORS.accent, color: COLORS.background, borderColor: COLORS.accent }} onMouseEnter={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = COLORS.text;
                    e.currentTarget.style.borderColor = COLORS.text;
                  }
                }} onMouseLeave={(e) => {
                  if (!e.currentTarget.disabled) {
                    e.currentTarget.style.backgroundColor = COLORS.accent;
                    e.currentTarget.style.borderColor = COLORS.accent;
                  }
                }}>
                <Send size={16} />
              </button>
            </div>
            <div className="text-xs text-gray-500 mt-2 flex justify-between items-center">
              <span>💡 Tip: Enter para enviar, Shift+Enter para nueva línea</span>
              <span className="text-xs" style={{ color: COLORS.accent }}>{messages.filter(m => !m.isSystem).length} mensajes</span>
            </div>
          </div>
        </>
      )}

      {isMinimized && (
        <div className="p-4 text-center">
          <MessageCircle size={20} style={{ color: COLORS.accent }} className="mx-auto mb-2" />
          <span className="text-sm" style={{ color: COLORS.text }}>Chat minimizado</span>
        </div>
      )}
    </div>
  );
};

const UserNavPanel: React.FC<{ onOpenChat: () => void }> = ({ onOpenChat }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-4 py-2 rounded font-mono font-bold transition-all flex items-center gap-2"
          style={{ backgroundColor: COLORS.secondary, border: `2px solid ${COLORS.border}`, color: COLORS.text }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = COLORS.accent)}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = COLORS.border)}
        >
          <User size={16} />
          <span>Usuario_EEVI</span>
        </button>
        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-48 rounded shadow-lg" style={{ backgroundColor: COLORS.background, border: `2px solid ${COLORS.border}` }}>
            <div className="p-2 space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm rounded transition-colors" style={{ color: COLORS.text }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.secondary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                Mi Perfil
              </button>
              <button className="w-full text-left px-3 py-2 text-sm rounded transition-colors" style={{ color: COLORS.text }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.secondary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                Configuración
              </button>
              <button onClick={onOpenChat} className="w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center gap-2" style={{ color: COLORS.accent }} onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.secondary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                <MessageCircle size={14} />
                Abrir Chat
              </button>
              <hr style={{ borderColor: COLORS.border }} className="my-1" />
              <button className="w-full text-left px-3 py-2 text-sm text-red-400 rounded transition-colors" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = COLORS.secondary)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}>
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ForumChatOverlay: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const mockUser = {
    username: "Usuario_EEVI"
  };

  return (
    <>
      <UserNavPanel onOpenChat={() => setIsChatOpen(true)} />
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 left-6 p-3 rounded-full border-2 transition-all shadow-lg z-40"
          style={{ backgroundColor: COLORS.accent, color: COLORS.background, borderColor: COLORS.accent }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.text;
            e.currentTarget.style.borderColor = COLORS.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = COLORS.accent;
            e.currentTarget.style.borderColor = COLORS.accent;
          }}
          title="Abrir Chat Global"
        >
          <MessageCircle size={20} />
        </button>
      )}
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} user={mockUser} />
    </>
  );
};

export default ForumChatOverlay;
