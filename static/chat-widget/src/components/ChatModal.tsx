import React, {
  useState,
  useEffect,
  useRef,
  KeyboardEvent,
} from 'react';
import {
  X,
  Send,
  MessageCircle,
  User,
  Clock,
  Minimize2,
  Maximize2,
} from 'lucide-react';
import { COLORS } from '../COLORS';
import { socket } from '../socket';

interface Message {
  id?: number;
  text: string;
  sender: string;
  timestamp: number;
  isSystem?: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatModal = ({ isOpen, onClose }: ChatModalProps): JSX.Element | null => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>('Anónimo');
  const [editingName, setEditingName] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatId = 'global';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const current = (window as any).currentUser;
    if (current && current.name) {
      setDisplayName(current.name);
    } else {
      setDisplayName(localStorage.getItem('displayName') || 'Anónimo');
    }

    console.log('🚀 Iniciando ChatModal...');

    // Forzar nueva conexión
    if (socket.connected) {
      socket.disconnect();
    }
    
    socket.connect();

    // Cargar mensajes existentes del API
    fetch('/api/messages?chat_id=' + chatId)
      .then((r) => r.json())
      .then((data) => {
        console.log('📥 Mensajes cargados del API:', data.length);
        setMessages(Array.isArray(data) ? data : []);
      })
      .catch((error) => {
        console.error('❌ Error cargando mensajes:', error);
        setMessages([]);
      });

    // Handlers de eventos Socket
    const onMessage = (msg: any) => {
      console.log('💬 MENSAJE RECIBIDO VIA SOCKET:', msg);
      const formattedMsg: Message = {
        id: msg.id || Date.now(),
        text: msg.text || '',
        sender: msg.sender || 'Anónimo',
        timestamp: msg.timestamp || Date.now(),
        isSystem: msg.isSystem || false
      };
      
      setMessages((prevMessages) => {
        console.log('📝 Agregando mensaje al estado. Total actual:', prevMessages.length);
        const newMessages = [...prevMessages, formattedMsg];
        console.log('📝 Nuevo total de mensajes:', newMessages.length);
        return newMessages;
      });
    };

    const onMessageHistory = (history: any[]) => {
      console.log('📚 Historial recibido:', history.length, 'mensajes');
      setMessages(Array.isArray(history) ? history : []);
    };

    const onConnect = () => {
      console.log('✅ Socket conectado, uniéndose a sala:', chatId);
      socket.emit('join', { chat_id: chatId });
    };

    // Registrar eventos
    socket.on('connect', onConnect);
    socket.on('message', onMessage);
    socket.on('message_history', onMessageHistory);

    // Si ya está conectado, unirse inmediatamente
    if (socket.connected) {
      onConnect();
    }

    return () => {
      console.log('🧹 Limpiando eventos de socket...');
      socket.emit('leave', { chat_id: chatId });
      socket.off('connect', onConnect);
      socket.off('message', onMessage);
      socket.off('message_history', onMessageHistory);
    };
  }, [chatId]);

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, messages]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleSendMessage = (): void => {
    if (!inputMessage.trim()) return;

    const msg = {
      text: inputMessage.trim(),
      sender: displayName,
      timestamp: Date.now(),
      chat_id: chatId
    };

    console.log('📤 Enviando mensaje:', msg);
    
    // Enviar via Socket
    socket.emit('new_message', msg);
    
    setInputMessage('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: number): string =>
    new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

  if (!isOpen) return null;

  return (
    <div
      className="chat-modal-overlay chat-overlay"
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        width: '20rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        backgroundColor: COLORS.background,
        color: COLORS.text,
        border: `2px solid ${COLORS.border}`,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem',
          borderBottom: `2px solid ${COLORS.border}`,
          backgroundColor: COLORS.secondary,
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageCircle size={18} color={COLORS.accent} />
          <span style={{ fontWeight: 600 }}>CHAT GLOBAL EEVI</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>
      </div>

      {/* Cuerpo */}
      {!isMinimized && (
        <>
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '0.75rem'
            }}
          >
            {messages.map((msg: Message) => (
              <div key={msg.id} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                  <User size={12} color={msg.isSystem ? COLORS.accent : COLORS.text} />
                  <span style={{ fontWeight: 600 }}>{msg.sender}</span>
                  <Clock size={10} color="#888" />
                  <span style={{ color: '#888' }}>{formatTime(msg.timestamp)}</span>
                </div>
                <div
                  style={{
                    marginLeft: msg.sender === displayName ? '1rem' : 0,
                    padding: '0.5rem',
                    borderLeft: `4px solid ${msg.isSystem ? COLORS.accent : COLORS.border}`,
                    backgroundColor: msg.isSystem ? COLORS.secondary : COLORS.border,
                    borderRadius: '0.25rem',
                    color: COLORS.text,
                    fontSize: '0.875rem'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div
            style={{
              borderTop: `2px solid ${COLORS.border}`,
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: COLORS.accent }}>Conectado como:</span>
              {editingName ? (
                <input
                  id="chat-display-name"
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onBlur={() => {
                    setEditingName(false);
                    localStorage.setItem('displayName', displayName);
                  }}
                  placeholder="Tu nombre"
                  autoComplete="username"
                  style={{ fontSize: '0.75rem' }}
                />
              ) : (
                <span
                  style={{ fontSize: '0.75rem', fontWeight: 600, cursor: (window as any).currentUser ? 'default' : 'pointer' }}
                  onClick={() => {
                    if (!(window as any).currentUser) setEditingName(true);
                  }}
                >
                  {displayName}
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                ref={inputRef}
                id="chat-message-input"
                name="message"
                type="text"
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
                autoComplete="off"
                autoCapitalize="sentences"
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: `2px solid ${COLORS.border}`,
                  backgroundColor: COLORS.background,
                  color: COLORS.text,
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: `2px solid ${COLORS.accent}`,
                  backgroundColor: COLORS.accent,
                  color: COLORS.background,
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}

      {/* Minimizado */}
      {isMinimized && (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <MessageCircle size={20} color={COLORS.accent} />
          <div style={{ color: COLORS.text }}>Chat minimizado</div>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
