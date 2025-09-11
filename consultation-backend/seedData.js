// consultation-backend/seedData.js
const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Specialist = require('./models/Specialist');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    await mongoose.connection.once('open', async () => {
      console.log('Connected to MongoDB');
      
      await Patient.deleteMany({});
      const patient = new Patient({
        patient_id: 1,
        user_id: 1,
        specialty: 'General',
        name: 'John Doe',
        availability: 'Available',
        gender: 'Male',
        address: '123 Main St',
        state: 'CA',
        zip_code: '90210',
      });
      await patient.save();

      await Specialist.deleteMany({});
      const specialist = new Specialist({
        specialist_id: 1,
        user_id: 2,
        specialty: 'Pediatrics',
        name: 'Dr. Smith',
        availability: 'Available',
        gender: 'Female',
        address: '456 Oak St',
        state: 'CA',
        zip_code: '90210',
      });
      await specialist.save();

      console.log('Data seeded successfully');
      mongoose.connection.close();
    });
  } catch (err) {
    console.error('Error seeding data:', err);
    mongoose.connection.close();
  }
};

seedData();