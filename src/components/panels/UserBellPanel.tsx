import { User } from 'lucide-react';
import type { FC } from 'react';

const UserBellPanel: FC = () => {
  return (
    <div className="fixed bottom-24 right-4 flex flex-col gap-2 z-40">
      <button
        className="w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center shadow"
        aria-label="Usuario"
      >
        <User size={20} />
      </button>
    </div>
  );
};

export default UserBellPanel;
