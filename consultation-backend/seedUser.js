// consultation-backend/seedUser.js
const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedUser = async () => {
  try {
    await User.deleteMany({});
    const user = new User({
      user_id: 1,
      name: 'Test User',
      email: 'test@example.com',
      role: 'parent',
      password: 'password123',
      phone: '1234567890',
    });
    await user.save();
    console.log('User seeded successfully');
  } catch (err) {
    console.error('Error seeding user:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedUser();