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
import { socket, userManager } from './socket';
import { COLORS } from './COLORS';

interface Message {
  id?: number;
  text: string;
  sender: string;
  timestamp: number;
  isSystem?: boolean;
}

interface RawMessage {
  id?: number;
  text?: string;
  content?: string;
  user?: string;
  sender?: string;
  displayName?: string;
  timestamp: string | number;
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
  const currentUser = userManager.getCurrentUser() || userManager.initializeUser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const normalizeMessage = (raw: RawMessage): Message => ({
    id: raw.id,
    text: raw.text || raw.content || '',
    sender: raw.sender || raw.displayName || raw.user || 'Anónimo',
    timestamp: typeof raw.timestamp === 'string' ? new Date(raw.timestamp).getTime() : raw.timestamp,
    isSystem: raw.isSystem || false
  });

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?chat_id=${chatId}`);
      const data = await res.json();
      setMessages(data.map(normalizeMessage));
    } catch (err) {
      console.error('Error loading messages', err);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const payload = {
      userId: currentUser.userId,
      displayName: currentUser.displayName,
      content: inputMessage.trim(),
      timestamp: Date.now()
    };
    socket.emit('send_message', payload);
    setMessages(prev => [...prev, { text: payload.content, sender: payload.displayName, timestamp: payload.timestamp }]);
    setInputMessage('');
  };

  const handleIncomingMessage = (raw: RawMessage) => {
    const msg = normalizeMessage(raw);
    setMessages(prev => {
      const exists = prev.some(m => m.timestamp === msg.timestamp && m.sender === msg.sender && m.text === msg.text);
      return exists ? prev : [...prev, msg];
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    fetchMessages();

    socket.auth = { userId: currentUser.userId, displayName: currentUser.displayName };
    socket.connect();

    const onConnect = () => {
      socket.emit('join', { chat_id: chatId, userId: currentUser.userId, displayName: currentUser.displayName });
    };

    const onHistory = (data: { messages: RawMessage[] }) => {
      if (Array.isArray(data?.messages)) {
        setMessages(data.messages.map(normalizeMessage));
      }
    };

    socket.on('new_message', handleIncomingMessage);
    socket.on('message_history', onHistory);
    socket.on('connect', onConnect);

    return () => {
      socket.off('new_message', handleIncomingMessage);
      socket.off('message_history', onHistory);
      socket.off('connect', onConnect);
      socket.emit('leave', { chat_id: chatId, userId: currentUser.userId });
      socket.disconnect();
    };
  }, [isOpen]);

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
        zIndex: 9998,
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
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onBlur={() => {
                    setEditingName(false);
                    localStorage.setItem('displayName', displayName);
                  }}
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
                type="text"
                value={inputMessage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Escribe tu mensaje..."
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
