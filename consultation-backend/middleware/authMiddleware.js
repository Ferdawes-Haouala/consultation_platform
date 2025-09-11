const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate JWT token
const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Please authenticate' });
    }
    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id); // Ensure 'id' matches token payload
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    req.user = { id: user._id, role: user.role }; // <-- include role here
    req.token = token;
    next();
  } catch (error) {
    console.error('Authentication error:', error.message);
    res.status(401).json({ message: 'Please authenticate' });
  }
};

module.exports = { authenticateToken }; // Export as an object with authenticateToken