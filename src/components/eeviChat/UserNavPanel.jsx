import React, { useState } from 'react';
import { MessageCircle, User } from 'lucide-react';
import COLORS from './COLORS';

function UserNavPanel({ onOpenChat }) {
  const [open, setOpen] = useState(true);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5rem',
        right: '1rem',
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        gap: '0.5rem',
        zIndex: 999,
      }}
    >
      <button
        onClick={onOpenChat}
        style={{ background: COLORS.accent, border: 'none', color: COLORS.background, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-label="Abrir chat"
      >
        <MessageCircle size={20} />
      </button>
      <button
        style={{ background: COLORS.secondary, border: 'none', color: COLORS.text, borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        aria-label="Usuario"
      >
        <User size={20} />
      </button>
    </div>
  );
}

export default UserNavPanel;
