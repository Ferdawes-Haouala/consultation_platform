const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  appointment_id: { type: Number, required: true, unique: true },
  patient_id: { type: Number, required: true },
  specialist_id: { type: Number, required: true },
  date_time: { type: Date, required: true },
  duration: { type: Number, required: true }, // Duration in minutes
  status: { type: String, required: true, enum: ['pending', 'confirmed', 'completed', 'cancelled'] },
  description: { type: String },
  notes: { type: String },
  parent_id: { type: Number },
  is_fast_track: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Appointment', appointmentSchema);