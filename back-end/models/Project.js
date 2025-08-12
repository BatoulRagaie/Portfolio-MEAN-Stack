const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  technologies: [{ type: String, required: true, trim: true }],
  image: { type: String, trim: true },
  link: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now },
  category: { type: String, required: true, trim: true },
});


module.exports = mongoose.model('Project', projectSchema);