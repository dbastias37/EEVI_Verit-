import { useState } from 'react';
import EeviChatModal from '../components/chat/eevi-chat-modal';
import ChatBubble from '../components/chat/ChatBubble';
import UserBellPanel from '../components/panels/UserBellPanel';

const ForoPage = () => {
  const [chatOpen, setChatOpen] = useState(false);
  return (
    <>
      <UserBellPanel />
      <ChatBubble onClick={() => setChatOpen(true)} visible={!chatOpen} />
      <EeviChatModal open={chatOpen} onClose={() => setChatOpen(false)} />
    </>
  );
};

export default ForoPage;
