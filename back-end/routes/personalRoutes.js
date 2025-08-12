const express = require('express');
const router = express.Router();
const PersonalInfo = require('../models/PersonalInfo');
const upload = require('../middleware/upload');

router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const info = await PersonalInfo.findOne();
    res.json(info);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', upload.fields([{ name: 'image' }, { name: 'cv' }]), async (req, res) => {
  try {
    const updateData = { ...req.body };

    
    if (updateData.socialLinks) {
      updateData.socialLinks = JSON.parse(updateData.socialLinks);
    }

    if (req.files.image) {
      updateData.image = req.files.image[0].filename; 
    }

    if (req.files.cv) {
      updateData.cv = req.files.cv[0].filename; 
    }

    const updatedInfo = await PersonalInfo.findOneAndUpdate(
      {},
      updateData,
      { new: true, upsert: true }
    );

    res.json(updatedInfo);
  } catch (err) {
    res.status(400).json({ message: 'Error saving personal info', error: err.message });
  }
});


module.exports = router;
