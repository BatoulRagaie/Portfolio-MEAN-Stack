const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/Message');

router.use(express.json());


router.post('/', async (req, res) => {
  try {
    const newMessage = new ContactMessage(req.body);
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(400).json({ message: 'Error sending message', error: err.message });
  }
});


router.get('/',  async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const updatedMessage = await ContactMessage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
    res.json(updatedMessage);
  } catch (err) {
    res.status(400).json({ message: 'Error updating message', error: err.message });
  }
});

router.delete('/:id',  async (req, res) => {
  try {
    const deletedMessage = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting message', error: err.message });
  }
});

module.exports = router;
