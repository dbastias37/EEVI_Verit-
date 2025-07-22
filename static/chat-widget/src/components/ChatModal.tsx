import React, { useEffect, useRef } from 'react';
import { X, Send, MessageCircle, User, Clock, Minimize2, Maximize2 } from 'lucide-react';
import COLORS from '../COLORS';

interface Message {
  id: number;
  text: string;
  sender: string;
  timestamp: Date;
  isSystem: boolean;
}

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    username: string;
  };
}

export default function ChatModal({ isOpen, onClose, user }: ChatModalProps) {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [inputMessage, setInputMessage] = React.useState('');
  const [isMinimized, setIsMinimized] = React.useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: user.username,
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
        sender: 'Bot_EEVI',
        timestamp: new Date(),
        isSystem: true
      }]);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: Date) =>
    timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });

  if (!isOpen) return null;

  return (
    <div
      className="chat-modal-overlay"
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.75rem',
        borderBottom: `2px solid ${COLORS.border}`,
        backgroundColor: COLORS.secondary,
        borderTopLeftRadius: '0.5rem',
        borderTopRightRadius: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageCircle size={18} style={{ color: COLORS.accent }} />
          <span style={{ fontWeight: 600 }}>CHAT GLOBAL EEVI</span>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={() => setIsMinimized(!isMinimized)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <X size={16} color={COLORS.text} />
          </button>
        </div>
      </div>
      {!isMinimized && (
        <>
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '0.75rem',
          }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem' }}>
                  <User size={12} color={msg.isSystem ? COLORS.accent : COLORS.text} />
                  <span style={{ fontWeight: 600 }}>{msg.sender}</span>
                  <Clock size={10} color="#888" />
                  <span style={{ color: '#888' }}>{formatTime(msg.timestamp)}</span>
                </div>
                <div style={{
                  marginLeft: msg.sender === user.username ? '1rem' : 0,
                  padding: '0.5rem',
                  borderLeft: `4px solid ${msg.isSystem ? COLORS.accent : COLORS.border}`,
                  backgroundColor: msg.isSystem ? COLORS.secondary : COLORS.border,
                  borderRadius: '0.25rem',
                  color: COLORS.text,
                  fontSize: '0.875rem'
                }}>
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div style={{
            borderTop: `2px solid ${COLORS.border}`,
            padding: '0.75rem',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.75rem', color: COLORS.accent }}>Conectado como:</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{user.username}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
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
              <button onClick={handleSendMessage} disabled={!inputMessage.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: `2px solid ${COLORS.accent}`,
                  backgroundColor: COLORS.accent,
                  color: COLORS.background,
                  cursor: inputMessage.trim() ? 'pointer' : 'not-allowed'
                }}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
      {isMinimized && (
        <div style={{ padding: '1rem', textAlign: 'center' }}>
          <MessageCircle size={20} style={{ color: COLORS.accent }} />
          <div style={{ color: COLORS.text }}>Chat minimizado</div>
        </div>
      )}
    </div>
