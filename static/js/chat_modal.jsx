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
      setMessages(prev

                
