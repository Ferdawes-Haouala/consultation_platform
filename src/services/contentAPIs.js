import { sendMessage } from '../socketHandler';

const sendContentMessage = (action, data = {}) => {
  console.log('content api message', { action, ...data });
  sendMessage('general', 'system', JSON.stringify({ action, ...data }));
};

export { sendContentMessage };