const express = require('express');
const router = express.Router();
const TreatmentPlan = require('../models/TreatmentPlan');
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

// POST /api/treatment-plans - Create a new treatment plan
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { patient_id, plan_details, start_date, end_date } = req.body;
    const treatmentPlan = new TreatmentPlan({
      patient_id,
      specialist_id: req.user.id,
      plan_details,
      start_date,
      end_date,
    });
    await treatmentPlan.save();
    res.status(201).json({ message: 'Treatment plan created successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error creating treatment plan', error: err.message });
  }
});

// GET /api/treatment-plans - Fetch treatment plans for the logged-in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const userRole = localStorage.getItem('role');
    const query = userRole === 'doctor' ? { specialist_id: userId } : { patient_id: userId };
    const treatmentPlans = await TreatmentPlan.find(query);
    res.json(treatmentPlans);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;