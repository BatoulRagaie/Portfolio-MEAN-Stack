
const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'], 
    default: 'Beginner'
  },
  category: { type: String, trim: true }
});


module.exports = mongoose.model('Skill', skillSchema);