const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email'],
  },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ['parent', 'doctor', 'specialist', 'teacher', 'admin'],
  },
  name: { type: String, required: true },
  phone: { type: String },
  created_at: { type: Date, default: Date.now },
});

userSchema.pre('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model('User', userSchema);