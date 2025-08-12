const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  icon: { type: String, trim: true },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true }
});

module.exports = mongoose.model('Service', serviceSchema);