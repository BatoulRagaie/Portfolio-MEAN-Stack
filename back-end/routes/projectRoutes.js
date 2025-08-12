const express = require('express');
const router = express.Router();
router.use(express.json());

const Project = require('../models/Project');
const upload = require('../middleware/upload');


router.get('/', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching projects', error: err.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json(project);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching project', error: err.message });
  }
});

router.get('/link/:link', async (req, res) => {
  try {
    const project = await Project.findOne({ link: req.params.link });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.post('/', upload.single('image'), async (req, res) => {
  try {
    const projectData = {
      ...req.body,
      image: req.file ? req.file.filename : null 
    };

    const newProject = new Project(projectData);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (err) {
    res.status(400).json({ message: 'Error creating project', error: err.message });
  }
});


router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updatedData = {
      ...req.body
    };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
    res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ message: 'Error updating project', error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Error deleting project', error: err.message });
  }
});

module.exports = router;
