import { io } from 'socket.io-client';

export const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  timeout: 10000,
});

// Debug para desarrollo
if (process.env.NODE_ENV === 'development') {
  socket.on('connect', () => {
    console.log('✅ Socket conectado:', socket.id);
  });

  socket.on('disconnect', (reason) => {
    console.log('❌ Socket desconectado:', reason);
  });

  socket.on('connect_error', (error) => {
    console.error('🔥 Error de conexión:', error);
  });

  socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Reconectado después de', attemptNumber, 'intentos');
  });
}