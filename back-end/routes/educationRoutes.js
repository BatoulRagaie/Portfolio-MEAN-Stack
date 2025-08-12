const express = require('express');
const router = express.Router();
const Education = require('../models/Education');

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const educations = await Education.find();
    res.json(educations);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newEducation = new Education(req.body);
    const savedEducation = await newEducation.save();
    res.status(201).json(savedEducation);
  } catch (err) {
    res.status(400).json({ message: 'Error creating education', error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedEducation = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEducation) return res.status(404).json({ message: 'Education not found' });
    res.json(updatedEducation);
  } catch (err) {
    res.status(400).json({ message: 'Error updating education', error: err.message });
  }
});

router.delete('/:id',  async (req, res) => {
  try {
    const deletedEducation = await Education.findByIdAndDelete(req.params.id);
    if (!deletedEducation) return res.status(404).json({ message: 'Education not found' });
    res.json({ message: 'Education deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting education', error: err.message });
  }
});

module.exports = router;
