import React, { useState, useEffect, useRef } from 'react';
import { X, Send, MessageCircle, User, Clock, Minimize2, Maximize2 } from 'lucide-react';
import { io } from 'socket.io-client';
import COLORS from './COLORS';

const socket = io(import.meta.env.VITE_CHAT_URL || 'http://localhost:4000');

function ChatModal({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const messagesEndRef = useRef(null);
  const [minimized, setMinimized] = useState(false);
  const username = 'User';

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages(prev => [...prev, msg]);
    });
    return () => socket.off('chat message');
  }, []);

  function sendMessage() {
    const trimmed = text.trim();
    if (!trimmed) return;
    const newMessage = {
      id: Date.now(),
      text: trimmed,
      sender: username,
      timestamp: new Date(),
      isSystem: false
    };
    setMessages(prev => [...prev, newMessage]);
    socket.emit('chat message', newMessage);
    setText('');
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        right: '1rem',
        width: '320px',
        maxHeight: '70vh',
        background: COLORS.background,
        color: COLORS.text,
        border: `1px solid ${COLORS.border}`,
        borderRadius: '0.5rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.4)',
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        zIndex: 1000,
      }}
    >
      <header
        style={{
          padding: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: COLORS.secondary,
          borderTopLeftRadius: '0.5rem',
          borderTopRightRadius: '0.5rem',
        }}
      >
        <span>Chat</span>
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button
            onClick={() => setMinimized(!minimized)}
            style={{ background: 'transparent', border: 'none', color: COLORS.text }}
          >
            {minimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
          </button>
          <button
            aria-label="Cerrar"
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: COLORS.text }}
          >
            <X size={16} />
          </button>
        </div>
      </header>
      {!minimized && (
        <>
          <div style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ marginBottom: '0.25rem' }}>
                <span style={{ fontWeight: 'bold' }}>{m.sender || m.user}:</span> {m.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <footer style={{ borderTop: `1px solid ${COLORS.border}`, padding: '0.5rem', display: 'flex', gap: '0.25rem' }}>
            <textarea
              rows={1}
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe... Ctrl+Enter"
              style={{ flex: 1, resize: 'none', background: 'transparent', color: COLORS.text, border: `1px solid ${COLORS.border}`, borderRadius: '0.25rem', padding: '0.25rem' }}
            />
            <button
              aria-label="Enviar"
              onClick={sendMessage}
              style={{ background: COLORS.accent, border: 'none', color: COLORS.background, padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}
            >
              <Send size={16} />
            </button>
          </footer>
        </>
      )}
    </div>
  );
}

export default ChatModal;
