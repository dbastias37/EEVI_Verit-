import React from 'react';
import { createRoot } from 'react-dom/client';
import ChatOverlay from './components/ChatOverlay';

const el = document.getElementById('eevi-chat-root');
if (el) createRoot(el).render(<ChatOverlay />);
