import React, { useState } from 'react';
import Home from './pages/Home.jsx';
import { ChatModal, UserNavPanel } from './components/eeviChat';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <>
      <Home />

      {/* flotantes, sin tocar */}
      <UserNavPanel onOpenChat={() => setIsChatOpen(true)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </>
  );
}
