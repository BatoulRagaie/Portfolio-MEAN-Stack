const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

router.use(express.json());


router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (err) {
    res.status(400).json({ message: 'Error creating skill', error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json(updatedSkill);
  } catch (err) {
    res.status(400).json({ message: 'Error updating skill', error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting skill', error: err.message });
  }
});

module.exports = router;
