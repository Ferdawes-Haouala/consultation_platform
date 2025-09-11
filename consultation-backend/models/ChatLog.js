const mongoose = require('mongoose');

  const chatLogSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    room: { type: String, required: true },
    text: { type: String, required: true },
    user: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  });

  module.exports = mongoose.model('ChatLog', chatLogSchema);