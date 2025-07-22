import React from 'react';
import { createRoot } from 'react-dom/client';
import ForumChatOverlay from './components/ForumChatOverlay';

const chatRoot = document.getElementById('chat-root');
if (chatRoot) {
  createRoot(chatRoot).render(<ForumChatOverlay />);
}
