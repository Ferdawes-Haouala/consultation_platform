import React, { useEffect, useState } from 'react';
import api from '../api';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/users/me');
        setUser(response.data);
        setRoom(response.data.role === 'admin' ? 'admin-room' : 'general-room');
      } catch (err) {
        setError('Failed to fetch user data: ' + err.message);
      }
    };
    fetchUser();
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const data = {
        room,
        text: message,
        user: user?.name || 'Anonymous',
      };
      setMessages((prev) => [...prev, data]); // Local simulation
      setMessage('');
    }
  };

  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!user) return <div className="text-center p-4">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Chat (Disabled)</h1>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="h-64 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <div key={index} className="mb-2">
                <span className="font-semibold">{msg.user}:</span> {msg.text}
              </div>
            ))}
          </div>
          <div className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-2 border rounded-l"
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="bg-blue-600 text-white px-4 py-2 rounded-r">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;