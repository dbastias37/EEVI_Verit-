import { io } from 'socket.io-client';
import UserManager from './utils/userManager';

const userManager = UserManager.getInstance();
const userSession = userManager.initializeUser();

export const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket', 'polling'],
  withCredentials: true,
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  timeout: 20000,
  forceNew: false,
  auth: {
    userId: userSession.userId,
    displayName: userSession.displayName
  }
});

// Logs detallados con userId
socket.on('connect', () => {
  console.log('🟢 Socket CONECTADO:', socket.id, 'Usuario:', userSession.userId);
});

socket.on('disconnect', (reason) => {
  console.log('🔴 Socket DESCONECTADO:', reason, 'Usuario:', userSession.userId);
});

socket.on('connect_error', (error) => {
  console.error('❌ ERROR de conexión:', error.message, 'Usuario:', userSession.userId);
});

socket.on('reconnect', (attemptNumber) => {
  console.log('🔄 Reconectado después de', attemptNumber, 'intentos. Usuario:', userSession.userId);
});

export { userManager };
