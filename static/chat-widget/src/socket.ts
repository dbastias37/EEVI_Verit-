import { io } from 'socket.io-client';

export const socket = io('/', {
  path: '/socket.io',
  transports: ['websocket'],
  withCredentials: true,
  autoConnect: false,
});