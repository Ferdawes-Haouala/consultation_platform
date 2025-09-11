const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const chatRoutes = require('./routes/chat');
const specialistRoutes = require('./routes/specialists');
require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Add Socket.IO with CORS (minimal change)
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

const trainingRoutes = require('./routes/training');
app.use('/api/training', trainingRoutes);


const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));

app.use(express.json());

// Keep existing routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const medicalHistoryRoutes = require('./routes/medicalHistory');
const userRoutes = require('./routes/users');

app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/specialists', specialistRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/medical-history', medicalHistoryRoutes);
app.use('/users', userRoutes);

// Add basic Socket.IO logic (minimal change)
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on('message', (data) => {
    console.log('Received message:', data);
    io.emit('message', data); // Broadcast to all clients
  });
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Keep existing MongoDB connection (remove deprecated options)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5002;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));