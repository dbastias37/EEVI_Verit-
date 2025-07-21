import { MessageCircle } from 'lucide-react';
import type { FC } from 'react';

interface ChatBubbleProps {
  onClick: () => void;
  visible: boolean;
}

const ChatBubble: FC<ChatBubbleProps> = ({ onClick, visible }) => {
  if (!visible) return null;
  return (
    <button
      aria-label="Abrir chat"
      onClick={onClick}
      className="fixed bottom-4 left-4 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center shadow fade-in"
    >
      <MessageCircle size={24} />
    </button>
  );
};

export default ChatBubble;
