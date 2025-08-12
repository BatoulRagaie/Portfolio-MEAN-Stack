const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address']
  },
  subject: { type: String, required: true, trim: true },
  message: { type: String, required: true, maxlength: 360, trim: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('Message', contactMessageSchema);