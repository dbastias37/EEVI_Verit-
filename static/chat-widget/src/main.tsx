import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatOverlay from './components/ChatOverlay';

const container = document.getElementById('eevi-chat-root');
if (container) {
  const root = createRoot(container);
  root.render(<ChatOverlay />);
}
