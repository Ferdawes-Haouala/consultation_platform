const mongoose = require('mongoose');

const treatmentPlanSchema = new mongoose.Schema({
  patient_id: { type: Number, required: true },
  specialist_id: { type: Number, required: true },
  plan_details: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TreatmentPlan', treatmentPlanSchema);