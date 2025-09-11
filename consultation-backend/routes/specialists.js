const express = require('express');
const router = express.Router();
const Specialist = require('../models/Specialist');
const { authenticateToken } = require('../middleware/authMiddleware');

// Get all specialists
router.get('/', authenticateToken, async (req, res) => {
  try {
    const specialists = await Specialist.find();
    res.json(specialists);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch specialists', error: err.message });
  }
});

// Register a new specialist (Admin only)
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user.id);
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    const { specialist_id, user_id, specialty, bio, availability } = req.body;
    const newSpecialist = new Specialist({
      specialist_id,
      user_id,
      specialty,
      bio,
      availability: JSON.stringify(availability),
    });
    await newSpecialist.save();
    res.status(201).json({ message: 'Specialist registered successfully', specialist: newSpecialist });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register specialist', error: err.message });
  }
});

module.exports = router;