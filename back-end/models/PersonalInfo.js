const mongoose = require('mongoose');

const personalInfoSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  title: { type: String, trim: true },
  bio: { type: String, trim: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address']
  },
  phone: { type: String, trim: true },
  address: { type: String, trim: true },
  socialLinks: {
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true }
  },
  cv: { type: String, trim: true },
  image: { type: String, trim: true }
});


module.exports = mongoose.model('PersonalInfo',personalInfoSchema)