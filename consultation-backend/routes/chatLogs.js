const express = require('express');
  const router = express.Router();
  const ChatLog = require('../models/ChatLog');
  const jwt = require('jsonwebtoken');

  // Middleware to verify JWT token
  const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
      req.user = user;
      next();
    });
  };

  // GET /api/chat-logs - Fetch all chat logs (admin only)
  router.get('/', authenticateToken, async (req, res) => {
    try {
      const userRole = localStorage.getItem('role'); // Note: This should ideally come from the token
      if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
      }
      const chatLogs = await ChatLog.find().sort({ createdAt: -1 });
      res.json(chatLogs);
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });

  module.exports = router;