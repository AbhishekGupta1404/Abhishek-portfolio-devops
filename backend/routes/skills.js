const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

// GET all skills
router.get('/', async (req, res) => {
  try {
    const { category, featured } = req.query;
    let query = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured === 'true') {
      query.featured = true;
    }
    
    const skills = await Skill.find(query).sort({ proficiency: -1, name: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills',
      error: error.message
    });
  }
});

// GET skills by category
router.get('/category/:category', async (req, res) => {
  try {
    const skills = await Skill.find({ category: req.params.category }).sort({ proficiency: -1, name: 1 });
    res.json({
      success: true,
      count: skills.length,
      data: skills
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching skills by category',
      error: error.message
    });
  }
});

// POST new skill
router.post('/', async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating skill',
      error: error.message
    });
  }
});

// PUT update skill
router.put('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      data: skill
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating skill',
      error: error.message
    });
  }
});

// DELETE skill
router.delete('/:id', async (req, res) => {
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting skill',
      error: error.message
    });
  }
});

module.exports = router;
