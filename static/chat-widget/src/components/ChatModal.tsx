import React, { useState, useEffect, useRef } from 'react';
import COLORS from '../COLORS';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModal({ isOpen, onClose }: ChatModalProps) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [title, setTitle] = useState('Chat');
  const [messages, setMessages] = useState<any[]>([]);
  const [text, setText] = useState('');
  const msgEnd = useRef<HTMLDivElement>(null);
  const pollRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isOpen && chatId) {
      loadMessages();
      pollRef.current = setInterval(loadMessages, 4000);
    }
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [isOpen, chatId]);

  useEffect(() => {
    if (msgEnd.current) msgEnd.current.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    function handler(e: any) {
      setTitle(e.detail.name || 'Chat');
      setChatId(e.detail.chatId);
    }
    window.addEventListener('openChat', handler);
    return () => window.removeEventListener('openChat', handler);
  }, []);

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
      await loadMessages();
    } catch (e) {
      console.error('send', e);
    }
  }

  function handleKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      send();
    }
  }

  if (!isOpen) return null;

  const containerStyle: React.CSSProperties = {
    position: 'fixed',
    bottom: 80,
    right: 24,
    width: 320,
    maxHeight: '70vh',
    background: COLORS.secondary,
    color: COLORS.text,
    borderRadius: 12,
    boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1000
  };

  return (
    <div style={containerStyle}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          background: COLORS.background,
          padding: '8px 12px',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12
        }}
      >
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: 600,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </h3>
        <button
          aria-label="Cerrar chat"
          onClick={onClose}
          style={{ color: COLORS.text }}
        >
          ✖
        </button>
      </header>
      <section
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '8px 12px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }}
      >
        {messages.map((m, i) => {
          const own =
            (window as any).currentUser &&
            m.autor_id === (window as any).currentUser.user_id;
          const base: React.CSSProperties = {
            display: 'inline-block',
            maxWidth: '70%',
            padding: '4px 8px',
            borderRadius: 8,
            wordBreak: 'break-word'
          };
          const bubbleStyle: React.CSSProperties = own
            ? {
                ...base,
                alignSelf: 'flex-end',
                background: COLORS.accent,
                color: '#fff',
                borderBottomRightRadius: 0
              }
            : {
                ...base,
                alignSelf: 'flex-start',
                background: '#3b3b3b',
                borderBottomLeftRadius: 0
              };
          return (
            <div
              key={i}
              style={{ display: 'flex', justifyContent: own ? 'flex-end' : 'flex-start' }}
            >
              <span style={bubbleStyle}>
                <span style={{ fontWeight: 600 }}>{m.autor_nombre}:</span> {m.mensaje}
              </span>
            </div>
          );
        })}
        <div ref={msgEnd}></div>
      </section>
      <footer
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          padding: 8,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 4
        }}
      >
        <textarea
          rows={1}
          placeholder="Escribe… Ctrl+Enter"
          style={{
            flex: 1,
            background: 'transparent',
            resize: 'none',
            outline: 'none',
            color: COLORS.text
          }}
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKey}
        />
        <button aria-label="Enviar" style={{ padding: '0 8px' }} onClick={send}>
          ➤
        </button>
      </footer>
    </div>
  );
}

export function openChatWith(userId: string, name: string) {
  const event = new CustomEvent('openChat', { detail: { chatId: userId, name } });
  window.dispatchEvent(event);
}
