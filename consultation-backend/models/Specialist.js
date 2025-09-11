const mongoose = require('mongoose');

const specialistSchema = new mongoose.Schema({
  specialist_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  specialty: { type: String, required: true },
  bio: { type: String },
  availability: { type: String }, // Will store as JSON string for simplicity (e.g., {"monday": ["09:00-10:00"]})
});

specialistSchema.methods.conductAssessment = async function () {
  // Placeholder for conducting assessment
  throw new Error('conductAssessment method not implemented');
};

specialistSchema.methods.prescribeIntervention = async function () {
  // Placeholder for prescribing intervention
  throw new Error('prescribeIntervention method not implemented');
};

specialistSchema.methods.updateAvailability = async function (availability) {
  this.availability = JSON.stringify(availability);
  await this.save();
};

module.exports = mongoose.model('Specialist', specialistSchema);