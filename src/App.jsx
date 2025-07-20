import React, { useState } from 'react';
import { ChatModal, UserNavPanel } from './components/eeviChat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="App">
      <h1>EEVI App</h1>
      <UserNavPanel onOpenChat={() => setIsChatOpen(true)} />
      <ChatModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;
