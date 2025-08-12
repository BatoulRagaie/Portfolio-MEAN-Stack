const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

router.use(express.json());


router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/', async (req, res) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    res.status(400).json({ message: 'Error creating service', error: err.message });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedService) return res.status(404).json({ message: 'Service not found' });
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: 'Error updating service', error: err.message });
  }
});


router.delete('/:id',  async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ message: 'Service not found' });
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting service', error: err.message });
  }
});

module.exports = router;
