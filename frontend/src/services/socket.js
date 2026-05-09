import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

let socket = null;

export const initializeSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 5,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initializeSocket();
  }
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const joinExpertDetail = (expertId) => {
  const socket = getSocket();
  socket.emit('join:expertDetail', expertId);
};

export const leaveExpertDetail = (expertId) => {
  const socket = getSocket();
  socket.emit('leave:expertDetail', expertId);
};

export const onSlotUpdated = (callback) => {
  const socket = getSocket();
  socket.on('slot:updated', callback);
};

export const offSlotUpdated = (callback) => {
  const socket = getSocket();
  socket.off('slot:updated', callback);
};

export const emitSlotBooked = (data) => {
  const socket = getSocket();
  socket.emit('slot:booked', data);
};
