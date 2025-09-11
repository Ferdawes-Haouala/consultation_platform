const express = require('express');
const router = express.Router();
const MedicalHistory = require('../models/MedicalHistory');
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

// POST /api/medical-history - Submit medical history
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { diagnosis, symptoms, previous_treatments, learning_difficulty_details, family_history } = req.body;
    const medicalHistory = new MedicalHistory({
      patient_id: req.user.id,
      diagnosis,
      symptoms,
      previous_treatments,
      learning_difficulty_details,
      family_history,
    });
    await medicalHistory.save();
    res.status(201).json({ message: 'Medical history submitted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error submitting medical history', error: err.message });
  }
});

// GET /api/medical-history - Fetch medical history for the logged-in patient
router.get('/', authenticateToken, async (req, res) => {
  try {
    const medicalHistory = await MedicalHistory.find({ patient_id: req.user.id });
    res.json(medicalHistory);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;