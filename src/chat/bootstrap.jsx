import React from 'react';
import { createRoot } from 'react-dom/client';
import { ChatModal, UserNavPanel } from '../components/eeviChat';

function Shell() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <UserNavPanel onOpenChat={() => setOpen(true)} />
      <ChatModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}

const mount = document.getElementById('eevi-chat-root');
if (mount) createRoot(mount).render(<Shell />);
