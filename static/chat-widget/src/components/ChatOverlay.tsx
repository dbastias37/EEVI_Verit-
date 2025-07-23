import React, { useState } from 'react';
import UserNavPanel from './UserNavPanel';
import ChatModal from './ChatModal';

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UserNavPanel onOpen={() => setIsOpen(true)} />
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
