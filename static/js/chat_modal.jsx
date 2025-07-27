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
import { io } from 'socket.io-client';
const socket = io();
import { COLORS } from './COLORS';

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
  const chatId = 'global'; // ID de la sala. Puedes hacerlo dinámico si quieres.

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const name = localStorage.getItem('displayName');
    if (name) setDisplayName(name);
  }, []);

  useEffect(() => {
    socket.emit('join', { chat_id: chatId });

    socket.on('message', (data: Message) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.emit('leave', { chat_id: chatId });
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const message: Message = {
      text: inputMessage.trim(),
      sender: displayName,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, message]);
    socket.emit('new_message', { ...message, chat_id: chatId });
    setInputMessage('');
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg w-80 z-50"
      style={{ backgroundColor: COLORS.background, color: COLORS.text }}
    >
      <div className="flex justify-between items-center p-2 border-b" style={{ backgroundColor: COLORS.header }}>
        <div className="flex items-center space-x-2">
          <MessageCircle />
          <span>Chat</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? <Maximize2 /> : <Minimize2 />}
          </button>
          <button onClick={onClose}>
            <X />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <div className="flex flex-col p-2 space-y-2 max-h-96 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="text-sm flex flex-col">
              <span className="font-bold">{msg.sender}</span>
              <span>{msg.text}</span>
              <span className="text-xs text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}

      {!isMinimized && (
        <div className="flex items-center p-2 border-t">
          {editingName ? (
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              onBlur={() => {
                setEditingName(false);
                localStorage.setItem('displayName', displayName);
              }}
              className="border rounded p-1 mr-2 flex-1"
            />
          ) : (
            <button
              onClick={() => setEditingName(true)}
              className="flex items-center text-xs text-blue-500 mr-2"
            >
              <User className="w-4 h-4 mr-1" />
              {displayName}
            </button>
          )}
          <input
            ref={inputRef}
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Escribe un mensaje..."
            className="border rounded p-1 flex-1 mr-2"
          />
          <button onClick={handleSendMessage} className="text-blue-500">
            <Send />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatModal;
