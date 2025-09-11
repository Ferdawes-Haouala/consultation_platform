import { io } from 'socket.io-client';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5002';

const socket = io(API_URL, {
  withCredentials: true,
  transports: ['websocket', 'polling'],
});

socket.on('connect', () => {
  console.log('متصل بالخادم');
});

socket.on('connect_error', (err) => {
  console.error('خطأ في الاتصال:', err.message);
});

socket.on('message', (data) => {
  console.log('تم استلام رسالة:', data);
});

socket.on('disconnect', () => {
  console.log('انقطع الاتصال بالخادم');
});

const sendMessage = (room, user, text) => {
  socket.emit('message', { room, user, text });
};

export { sendMessage };
export default socket;