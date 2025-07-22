import React from 'react';
import { MessageCircle } from 'lucide-react';

const COLORS = {
  accent: '#00D4B8',
  background: '#1A2332',
  text: '#E9E9E9'
};

interface ChatBubbleProps {
  onClick: () => void;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="fixed bottom-6 left-6 p-3 rounded-full border-2 transition-all shadow-lg z-40"
    style={{
      backgroundColor: COLORS.accent,
      color: COLORS.background,
      borderColor: COLORS.accent
    }}
    onMouseEnter={e => {
      const target = e.currentTarget as HTMLButtonElement;
      target.style.backgroundColor = COLORS.text;
      target.style.borderColor = COLORS.text;
    }}
    onMouseLeave={e => {
      const target = e.currentTarget as HTMLButtonElement;
      target.style.backgroundColor = COLORS.accent;
      target.style.borderColor = COLORS.accent;
    }}
    title="Abrir Chat Global"
  >
    <MessageCircle size={20} />
  </button>
);

export default ChatBubble;
