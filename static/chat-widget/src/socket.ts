import { io } from 'socket.io-client';

export const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  timeout: 20000,
  forceNew: true
});

// Logs detallados para debug
socket.on('connect', () => {
  console.log('🟢 Socket CONECTADO:', socket.id);
});

socket.on('disconnect', (reason) => {
  console.log('🔴 Socket DESCONECTADO:', reason);
});

socket.on('connect_error', (error) => {
  console.error('❌ ERROR de conexión:', error.message);
});

socket.on('status', (data) => {
  console.log('📊 Status del servidor:', data);
});
