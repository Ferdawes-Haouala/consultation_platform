const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const { authenticateToken } = require('../middleware/authMiddleware');

// Register a new patient
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const { patient_id, user_id, date_of_birth, gender, address, state, zip_code } = req.body;
    const newPatient = await Patient.registerPatient({
      patient_id,
      user_id,
      date_of_birth,
      gender,
      address,
      state,
      zip_code,
    });
    res.status(201).json({ message: 'Patient registered successfully', patient: newPatient });
  } catch (err) {
    res.status(500).json({ message: 'Failed to register patient', error: err.message });
  }
});

// Get patient details by patient_id
router.get('/:patient_id', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findOne({ patient_id: req.params.patient_id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient.getPatientDetails());
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch patient details', error: err.message });
  }
});

// Placeholder for uploadMedicalRecords and addMedicalRecord endpoints
router.post('/:patient_id/upload-medical-records', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findOne({ patient_id: req.params.patient_id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.uploadMedicalRecords();
    res.json({ message: 'Medical records uploaded successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to upload medical records', error: err.message });
  }
});

router.post('/:patient_id/add-medical-record', authenticateToken, async (req, res) => {
  try {
    const patient = await Patient.findOne({ patient_id: req.params.patient_id });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.addMedicalRecord();
    res.json({ message: 'Medical record added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add medical record', error: err.message });
  }
});

module.exports = router;