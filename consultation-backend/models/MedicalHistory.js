const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
  patient_id: { type: Number, required: true },
  diagnosis: { type: String }, // e.g., dyslexia, ADHD
  symptoms: { type: String },
  previous_treatments: { type: String },
  learning_difficulty_details: { type: String },
  family_history: { type: String },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('MedicalHistory', medicalHistorySchema);