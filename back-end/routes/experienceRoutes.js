const express = require('express');
const router = express.Router();
const Experience = require('../models/Experience');

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newExperience = new Experience(req.body);
    const savedExperience = await newExperience.save();
    res.status(201).json(savedExperience);
  } catch (err) {
    res.status(400).json({ message: 'Error creating experience', error: err.message });
  }
});

router.put('/:id',  async (req, res) => {
  try {
    const updatedExperience = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExperience) return res.status(404).json({ message: 'Experience not found' });
    res.json(updatedExperience);
  } catch (err) {
    res.status(400).json({ message: 'Error updating experience', error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
    if (!deletedExperience) return res.status(404).json({ message: 'Experience not found' });
    res.json({ message: 'Experience deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting experience', error: err.message });
  }
});

module.exports = router;
