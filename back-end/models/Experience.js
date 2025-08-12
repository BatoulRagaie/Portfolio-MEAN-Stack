const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true, trim: true },
  title: { type: String, required: true, trim: true },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String, trim: true },
});


module.exports=mongoose.model('Experience',experienceSchema)