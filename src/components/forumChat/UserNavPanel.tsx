import React, { useState } from 'react';
import { User, MessageCircle } from 'lucide-react';

const COLORS = {
  background: '#1A2332',
  text: '#E9E9E9',
  accent: '#00D4B8',
  secondary: '#2A3441',
  border: '#3A3F51'
};

interface UserNavPanelProps {
  onOpenChat: () => void;
  username?: string;
}

const UserNavPanel: React.FC<UserNavPanelProps> = ({ onOpenChat, username = 'Usuario_EEVI' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="fixed top-6 right-6 z-40">
      <div className="relative">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="px-4 py-2 rounded font-mono font-bold transition-all flex items-center gap-2"
          style={{
            backgroundColor: COLORS.secondary,
            border: `2px solid ${COLORS.border}`,
            color: COLORS.text
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = COLORS.accent)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = COLORS.border)}
        >
          <User size={16} />
          <span>{username}</span>
        </button>
        {isDropdownOpen && (
          <div
            className="absolute top-full right-0 mt-2 w-48 rounded shadow-lg"
            style={{
              backgroundColor: COLORS.background,
              border: `2px solid ${COLORS.border}`
            }}
          >
            <div className="p-2 space-y-1">
              <button
                className="w-full text-left px-3 py-2 text-sm rounded transition-colors"
                style={{ color: COLORS.text }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = COLORS.secondary)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Mi Perfil
              </button>
              <button
                className="w-full text-left px-3 py-2 text-sm rounded transition-colors"
                style={{ color: COLORS.text }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = COLORS.secondary)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Configuración
              </button>
              <button
                onClick={onOpenChat}
                className="w-full text-left px-3 py-2 text-sm rounded transition-colors flex items-center gap-2"
                style={{ color: COLORS.accent }}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = COLORS.secondary)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <MessageCircle size={14} />
                Abrir Chat
              </button>
              <hr style={{ borderColor: COLORS.border }} className="my-1" />
              <button
                className="w-full text-left px-3 py-2 text-sm text-red-400 rounded transition-colors"
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = COLORS.secondary)}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserNavPanel;
