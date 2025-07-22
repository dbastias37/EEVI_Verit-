import React from 'react';
import { User, MessageCircle } from 'lucide-react';
import COLORS from '../COLORS';

export default function UserNavPanel({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      style={{
        position: 'fixed',
        top: 16,
        right: 16,
        background: COLORS.secondary,
        border: `2px solid ${COLORS.border}`,
        borderRadius: 8,
        padding: '8px 12px',
        color: COLORS.text,
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        zIndex: 1000,
        cursor: 'pointer'
      }}
    >
      <User size={16} /> <MessageCircle size={16} />
    </button>
  );
}
