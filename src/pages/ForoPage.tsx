import React from 'react';
import ForumChatOverlay from '@/components/forumChat/ForumChatOverlay';

const mockUser = {
  username: 'UsuarioEEVI_2025',
};
export default function ForoPage() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0A] text-white">
      <section className="py-8 px-4">
        <h1 className="text-3xl font-bold mb-4">Bienvenido al Foro</h1>
        {/* Otros componentes del foro van aquí */}
      </section>

      {/* Chat overlay global */}
      <ForumChatOverlay user={mockUser} />
    </main>
  );
}
