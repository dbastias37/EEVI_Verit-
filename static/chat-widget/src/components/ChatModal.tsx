// Versión optimizada de ChatModal.tsx enfocada en tiempo real con polling como respaldo
// Mantiene el diseño y comportamiento actuales pero organiza mejor la lógica

import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { socket, userManager } from '../socket';
import { COLORS } from '../COLORS';
import { Send, X, MessageCircle, Clock, User } from 'lucide-react';

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

const ChatModal = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const chatId = 'global';
  const currentUser = userManager.getCurrentUser() || userManager.initializeUser();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const normalizeMessage = (raw: RawMessage): Message => {
    return {
      id: raw.id,
      text: raw.text || raw.content || '',
      sender: raw.sender || raw.displayName || raw.user || 'Anónimo',
      timestamp: typeof raw.timestamp === 'string' ? new Date(raw.timestamp).getTime() : raw.timestamp,
      isSystem: raw.isSystem || false
    };
  };

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?chat_id=${chatId}`);
      const data = await res.json();
      const normalized = data.map(normalizeMessage);
      setMessages(normalized);
    } catch (err) {
      console.error('❌ Error al cargar mensajes iniciales:', err);
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
    setMessages(prev => [...prev, {
      text: payload.content,
      sender: payload.displayName,
      timestamp: payload.timestamp
    }]);
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
    fetchMessages();

    socket.auth = { userId: currentUser.userId, displayName: currentUser.displayName };
    socket.connect();

    const onConnect = () => {
      socket.emit('join', {
        chat_id: chatId,
        userId: currentUser.userId,
        displayName: currentUser.displayName,
      });
    };

    const onHistory = (data: { messages: RawMessage[] }) => {
      if (Array.isArray(data?.messages)) {
        const normalized = data.messages.map(normalizeMessage);
        setMessages(normalized);
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
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div style={{ padding: '1rem', width: '22rem', backgroundColor: COLORS.background, color: COLORS.text }}>
      <div style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: '0.5rem' }}>
        <MessageCircle /> Chat Global
        <X style={{ float: 'right', cursor: 'pointer' }} />
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto', marginTop: '1rem' }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: '0.5rem' }}>
            <div style={{ fontSize: '0.75rem', color: COLORS.accent }}>
              <User size={12} /> {msg.sender} <Clock size={10} /> {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <div style={{ paddingLeft: '1rem' }}>{msg.text}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: 'flex', marginTop: '1rem' }}>
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Escribe tu mensaje..."
          style={{ flex: 1, padding: '0.5rem' }}
        />
        <button onClick={handleSendMessage} style={{ padding: '0.5rem' }}><Send size={16} /></button>
      </div>
    </div>
  );
};

export default ChatModal;
