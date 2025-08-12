const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
  school: { type: String, required: true, trim: true },
  degree: { type: String, trim: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String, trim: true }
});


module.exports=mongoose.model('Education',educationSchema)