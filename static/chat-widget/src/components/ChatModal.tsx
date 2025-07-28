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
  Lock,
  Unlock,
} from 'lucide-react';
import { COLORS } from '../COLORS';
import { socket } from '../socket';
import UserManager from '../utils/userManager';

interface Message {
  id?: number;
  text: string;
  sender: string;
  timestamp: number;
  isSystem?: boolean;
}

interface RawMessage {
  id?: number;
  text: string;
  user?: string;
  sender?: string;
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
  const [nameLocked, setNameLocked] = useState<boolean>(false);
  const [lastMessageId, setLastMessageId] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const chatId = 'global';
  const userManager = UserManager.getInstance();
  const currentUser = userManager.getCurrentUser();

  // NUEVA FUNCIÓN: Normalizar mensajes de BD a formato interno
  const normalizeMessage = (rawMsg: RawMessage): Message => {
    let timestamp: number;

    if (typeof rawMsg.timestamp === 'string') {
      timestamp = new Date(rawMsg.timestamp).getTime();
    } else {
      timestamp = rawMsg.timestamp || Date.now();
    }

    return {
      id: rawMsg.id,
      text: rawMsg.text || '',
      sender: rawMsg.sender || rawMsg.user || 'Anónimo',
      timestamp,
      isSystem: rawMsg.isSystem || false
    };
  };

  const normalizeMessages = (rawMessages: RawMessage[]): Message[] => {
    if (!Array.isArray(rawMessages)) return [];
    return rawMessages.map(normalizeMessage);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Polling para sincronización cada 2 segundos
  const startPolling = () => {
    if (pollingRef.current) clearInterval(pollingRef.current);
    
    pollingRef.current = setInterval(async () => {
      try {
        const response = await fetch('/api/messages?chat_id=' + chatId);
        const rawData = await response.json();

        if (Array.isArray(rawData) && rawData.length > 0) {
          const normalized = normalizeMessages(rawData);
          const latestId = Math.max(...normalized.map(msg => msg.id || 0));

          if (latestId > lastMessageId) {
            console.log('📊 Polling: Nuevos mensajes detectados');
            setMessages(normalized);
            setLastMessageId(latestId);
          }
        }
      } catch (error) {
        console.error('❌ Error en polling:', error);
      }
    }, 2000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  // Cargar configuración inicial y sockets
  useEffect(() => {
    const user = userManager.getCurrentUser() || userManager.initializeUser();
    setDisplayName(user.displayName);
    setNameLocked(user.isLocked);

    console.log('🚀 ChatModal iniciado para usuario:', user.userId);

    fetch('/api/messages?chat_id=' + chatId)
      .then((r) => r.json())
      .then((rawData) => {
        console.log('📥 Mensajes raw de BD:', rawData.length);
        const normalizedMessages = normalizeMessages(rawData);
        console.log('📥 Mensajes normalizados:', normalizedMessages.length);

        setMessages(normalizedMessages);
        if (normalizedMessages.length > 0) {
          setLastMessageId(Math.max(...normalizedMessages.map(msg => msg.id || 0)));
        }
      })
      .catch((error) => {
        console.error('❌ Error cargando mensajes:', error);
        setMessages([]);
      });

    if (!socket.connected) {
      socket.auth = { userId: user.userId, displayName: user.displayName };
      socket.connect();
    }

    const onMessage = (rawMsg: any) => {
      console.log('💬 Mensaje raw recibido:', rawMsg);

      const msg = normalizeMessage(rawMsg);

      if (rawMsg.userId === user.userId && rawMsg.socketId === socket.id) {
        console.log('🔄 Ignorando eco de nuestro propio mensaje');
        return;
      }

      setMessages((prevMessages) => {
        const exists = prevMessages.some(m => m.id === msg.id);
        if (exists) {
          console.log('⚠️ Mensaje duplicado ignorado:', msg.id);
          return prevMessages;
        }
        const newMessages = [...prevMessages, msg];
        setLastMessageId(Math.max(lastMessageId, msg.id || 0));
        console.log('✅ Nuevo mensaje normalizado agregado. Total:', newMessages.length);
        return newMessages;
      });
    };

    const onMessageHistory = (data: any) => {
      const rawHistory = data.messages || data;
      console.log('📚 Historial raw recibido:', rawHistory.length);

      const normalizedHistory = normalizeMessages(rawHistory);
      console.log('📚 Historial normalizado:', normalizedHistory.length);

      setMessages(normalizedHistory);
      if (normalizedHistory.length > 0) {
        setLastMessageId(Math.max(...normalizedHistory.map(msg => msg.id || 0)));
      }
    };

    const onUserRegistered = (data: any) => {
      console.log('✅ Usuario registrado en servidor:', data);
    };

    const onUserJoined = (data: any) => {
      console.log('👥 Usuario se unió:', data.userId);
    };

    const onUserLeft = (data: any) => {
      console.log('👋 Usuario salió:', data.userId);
    };

    const onConnect = () => {
      console.log('✅ Socket conectado, uniéndose a sala:', chatId);
      socket.emit('join', { chat_id: chatId, userId: user.userId });
    };

    socket.on('connect', onConnect);
    socket.on('message', onMessage);
    socket.on('message_history', onMessageHistory);
    socket.on('user_registered', onUserRegistered);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);

    if (socket.connected) {
      onConnect();
    }

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch('/api/messages?chat_id=' + chatId);
        const rawData = await response.json();

        if (Array.isArray(rawData) && rawData.length > 0) {
          const normalizedData = normalizeMessages(rawData);
          const latestId = Math.max(...normalizedData.map(msg => msg.id || 0));

          if (latestId > lastMessageId) {
            console.log('📊 Polling: Nuevos mensajes detectados y normalizados');
            setMessages(normalizedData);
            setLastMessageId(latestId);
          }
        }
      } catch (error) {
        console.error('❌ Error en polling:', error);
      }
    }, 3000);

    return () => {
      console.log('🧹 Limpiando ChatModal para usuario:', user.userId);
      clearInterval(pollInterval);
      socket.emit('leave', { chat_id: chatId, userId: user.userId });
      socket.off('connect', onConnect);
      socket.off('message', onMessage);
      socket.off('message_history', onMessageHistory);
      socket.off('user_registered', onUserRegistered);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
    };
  }, [chatId]);

  // Auto-scroll cuando hay nuevos mensajes
  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized, messages]);

  // Manejo de tecla Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Enviar mensaje
  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;

    const user = userManager.getCurrentUser();
    if (!user) return;

    const msg = {
      text: inputMessage.trim(),
      user: displayName,
      sender: displayName,
      userId: user.userId,
      timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
      chat_id: chatId
    };

    console.log('📤 Enviando mensaje formato BD desde usuario:', user.userId);

    socket.emit('new_message', msg);

    setInputMessage('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNameLock = () => {
    const user = userManager.getCurrentUser();
    if (!user) return;

    if (!nameLocked && displayName.trim()) {
      userManager.updateDisplayName(displayName);
      userManager.lockName();
      setNameLocked(true);

      socket.emit('update_user_info', {
        displayName: displayName
      });

      console.log('🔒 Nombre bloqueado para usuario:', user.userId);
    } else if (nameLocked && !(window as any).currentUser) {
      userManager.unlockName();
      setNameLocked(false);
      console.log('🔓 Nombre desbloqueado para usuario:', user.userId);
    }
  };

  const formatTime = (timestamp: number): string =>
    new Date(timestamp).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const formatDate = (timestamp: number): string =>
    new Date(timestamp).toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
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
              padding: '0.75rem',
              maxHeight: '300px'
            }}
          >
            {messages.map((msg: Message) => (
              <div key={msg.id || Math.random()} style={{ marginBottom: '0.75rem' }}>
                {/* Header del mensaje: Usuario + Timestamp */}
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.5rem', 
                  fontSize: '0.75rem',
                  marginBottom: '0.25rem',
                  color: '#888'
                }}>
                  <User size={12} color={msg.isSystem ? COLORS.accent : COLORS.text} />
                  <span style={{ fontWeight: 600, color: COLORS.accent }}>
                    {msg.sender}
                  </span>
                  <span>•</span>
                  <Clock size={10} />
                  <span>{formatTime(msg.timestamp)}</span>
                  <span>{formatDate(msg.timestamp)}</span>
                </div>
                
                {/* Contenido del mensaje */}
                <div
                  style={{
                    marginLeft: '1rem',
                    padding: '0.5rem 0.75rem',
                    borderLeft: `3px solid ${msg.isSystem ? COLORS.accent : COLORS.border}`,
                    backgroundColor: msg.isSystem ? COLORS.secondary : 'rgba(255,255,255,0.05)',
                    borderRadius: '0 0.25rem 0.25rem 0',
                    color: COLORS.text,
                    fontSize: '0.875rem',
                    lineHeight: '1.4'
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Footer */}
          <div
            style={{
              borderTop: `2px solid ${COLORS.border}`,
              padding: '0.75rem',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Control de nombre */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '0.5rem',
              padding: '0.5rem',
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderRadius: '0.25rem'
            }}>
              <span style={{ fontSize: '0.75rem', color: COLORS.accent }}>Usuario:</span>
              
              {editingName && !nameLocked ? (
                <input
                  id="chat-display-name"
                  name="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  onBlur={() => setEditingName(false)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      setEditingName(false);
                      localStorage.setItem('displayName', displayName);
                    }
                  }}
                  placeholder="Tu nombre"
                  autoComplete="username"
                  style={{ 
                    fontSize: '0.75rem',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    border: '1px solid ' + COLORS.border,
                    backgroundColor: COLORS.background,
                    color: COLORS.text,
                    flex: 1
                  }}
                  autoFocus
                />
              ) : (
                <span
                  style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    cursor: nameLocked ? 'default' : 'pointer',
                    flex: 1,
                    color: nameLocked ? COLORS.text : COLORS.accent
                  }}
                  onClick={() => {
                    if (!nameLocked) setEditingName(true);
                  }}
                >
                  {displayName}
                </span>
              )}
              
              <button
                onClick={handleNameLock}
                disabled={!(window as any).currentUser && (!displayName.trim() || editingName)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem',
                  color: nameLocked ? COLORS.accent : COLORS.text,
                  opacity: (!(window as any).currentUser && (!displayName.trim() || editingName)) ? 0.5 : 1
                }}
                title={nameLocked ? 'Nombre bloqueado' : 'Bloquear nombre'}
              >
                {nameLocked ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
            </div>
            
            {/* Input de mensaje */}
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
                disabled={!displayName.trim()}
                style={{
                  flex: 1,
                  padding: '0.5rem',
                  borderRadius: '0.25rem',
                  border: `2px solid ${COLORS.border}`,
                  backgroundColor: COLORS.background,
                  color: COLORS.text,
                  fontSize: '0.875rem',
                  opacity: !displayName.trim() ? 0.5 : 1
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || !displayName.trim()}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '0.25rem',
                  border: `2px solid ${COLORS.accent}`,
                  backgroundColor: (!inputMessage.trim() || !displayName.trim()) ? COLORS.border : COLORS.accent,
                  color: (!inputMessage.trim() || !displayName.trim()) ? COLORS.text : COLORS.background,
                  cursor: (!inputMessage.trim() || !displayName.trim()) ? 'not-allowed' : 'pointer'
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
          <div style={{ color: COLORS.text, fontSize: '0.875rem' }}>Chat minimizado</div>
          {messages.length > 0 && (
            <div style={{ color: '#888', fontSize: '0.75rem' }}>
              {messages.length} mensajes
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatModal;

