import React, { useState, useEffect } from 'react';
import UserNavPanel from './UserNavPanel';
import ChatModal from './ChatModal';

export default function ChatOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpenChat = () => {
      setIsOpen(true);
    };

    window.addEventListener('openChat', handleOpenChat);
    return () => {
      window.removeEventListener('openChat', handleOpenChat);
    };
  }, []);

  return (
    <>
      <UserNavPanel onOpen={() => setIsOpen(true)} />
      <ChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
