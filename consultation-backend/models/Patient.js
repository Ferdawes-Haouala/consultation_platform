const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  patient_id: { type: Number, required: true, unique: true },
  user_id: { type: Number, required: true },
  date_of_birth: { type: Date, required: true },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  state: { type: String, required: true },
  zip_code: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

// Method to get patient details
patientSchema.methods.getPatientDetails = function () {
  return {
    patient_id: this.patient_id,
    user_id: this.user_id,
    date_of_birth: this.date_of_birth,
    gender: this.gender,
    address: this.address,
    state: this.state,
    zip_code: this.zip_code,
    created_at: this.created_at,
  };
};

// Method to register a new patient (static method)
patientSchema.statics.registerPatient = async function (patientData) {
  const patient = new this(patientData);
  return await patient.save();
};

// Placeholder for uploadMedicalRecords and addMedicalRecord
// These methods will require file upload logic (e.g., using multer) which can be implemented later
patientSchema.methods.uploadMedicalRecords = async function () {
  // Placeholder: Implement file upload logic
  throw new Error('uploadMedicalRecords method not implemented');
};

patientSchema.methods.addMedicalRecord = async function () {
  // Placeholder: Implement adding medical record logic
  throw new Error('addMedicalRecord method not implemented');
};

module.exports = mongoose.model('Patient', patientSchema);