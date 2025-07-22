import React, { useState } from 'react';
import ChatBubble from './ChatBubble';
import ChatModal from './ChatModal';
import UserNavPanel from './UserNavPanel';

interface ForumChatOverlayProps {
  user?: { username?: string };
}

const ForumChatOverlay: React.FC<ForumChatOverlayProps> = ({ user }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const username = user?.username || 'Usuario_EEVI';

  return (
    <>
      <UserNavPanel onOpenChat={() => setIsChatOpen(true)} username={username} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} user={user} />
      {!isChatOpen && <ChatBubble onClick={() => setIsChatOpen(true)} />}
    </>
  );
};

export default ForumChatOverlay;
