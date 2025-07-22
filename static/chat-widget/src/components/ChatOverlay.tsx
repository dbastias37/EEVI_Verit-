import React, { useState } from 'react';
import UserNavPanel from './UserNavPanel';
import ChatModal from './ChatModal';  // adapta tu eevi-chat-modal.tsx aquí

export default function ChatOverlay() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UserNavPanel onOpen={() => setOpen(true)} />
      <ChatModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
