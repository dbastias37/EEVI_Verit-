// ChatModal.tsx actualizado
import React, { useState, useEffect, useRef, KeyboardEvent } from 'react';
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
import { socket, userManager } from '../socket';

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
  const [displayName, setDisplayName] = useState<string>('Anónimo');
  const [lastMessageId, setLastMessageId] = useState<number>(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatId = 'global';
  const currentUser = userManager.getCurrentUser();

  const normalizeMessage = (rawMsg: RawMessage): Message => {
    let timestamp: number = typeof rawMsg.timestamp === 'string'
      ? new Date(rawMsg.timestamp).getTime()
      : rawMsg.timestamp || Date.now();

    return {
      id: rawMsg.id,
      text: rawMsg.text || rawMsg.content || '',
      sender: rawMsg.sender || rawMsg.displayName || rawMsg.user || 'Anónimo',
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

  const handleNewMessage = (data: any) => {
    const msg = normalizeMessage(data);
    setMessages((prev) => {
      const exists = prev.some(
        (m) =>
          m.timestamp === msg.timestamp &&
          m.sender === msg.sender &&
          m.text === msg.text
      );
      if (exists) return prev;
      return [...prev, msg];
    });
  };

  useEffect(() => {
    const user = userManager.getCurrentUser() || userManager.initializeUser();
    setDisplayName(user.displayName);

    fetch('/api/messages?chat_id=' + chatId)
      .then((r) => r.json())
      .then((rawData) => {
        const normalizedMessages = normalizeMessages(rawData);
        setMessages(normalizedMessages);
        if (normalizedMessages.length > 0) {
          setLastMessageId(Math.max(...normalizedMessages.map(msg => msg.id || 0)));
        }
      })
      .catch(() => setMessages([]));

    if (!socket.connected) {
      socket.auth = { userId: user.userId, displayName: user.displayName };
      socket.connect();
    }

    const onConnect = () => {
      socket.emit('join', { chat_id: chatId, userId: user.userId });
    };

    socket.on('connect', onConnect);
    socket.on('new_message', handleNewMessage);

    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.emit('leave', { chat_id: chatId, userId: user.userId });
      socket.off('connect', onConnect);
      socket.off('new_message', handleNewMessage);
    };
  }, [chatId]);

  const sendMessage = (content: string): void => {
    const user = userManager.getCurrentUser();
    if (!user) return;

    const payload = {
      userId: user.userId,
      displayName: user.displayName,
      content,
      timestamp: Date.now()
    };

    socket.emit('send_message', payload);
    setMessages((prev) => [
      ...prev,
      { text: content, sender: user.displayName, timestamp: payload.timestamp }
    ]);
  };

  const handleSendMessage = async (): Promise<void> => {
    if (!inputMessage.trim()) return;
    sendMessage(inputMessage.trim());
    setInputMessage('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div>
      {/* UI simplificada para el ejemplo */}
      <div>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.sender}:</strong> {msg.text}</div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={handleSendMessage}>Enviar</button>
    </div>
  );
};

export default ChatModal;
