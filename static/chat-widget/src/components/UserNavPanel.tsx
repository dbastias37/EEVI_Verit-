import React from 'react';
import { User, MessageCircle } from 'lucide-react';
import COLORS from '../COLORS';

interface UserNavPanelProps {
  onOpen: () => void;
}

export default function UserNavPanel({ onOpen }: UserNavPanelProps) {
  return (
    <button
      onClick={onOpen}
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        background: COLORS.secondary,
        border: `2px solid ${COLORS.border}`,
        borderRadius: '0.5rem',
        padding: '0.5rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        color: COLORS.text,
        zIndex: 9999,
        cursor: 'pointer'
      }}
    >
      <User size={16} />
      <MessageCircle size={16} />
    </button>
  );
}
