const express = require('express');
const router = express.Router();
const About = require('../models/About');

// GET about information
router.get('/', async (req, res) => {
  try {
    const about = await About.findOne().sort({ createdAt: -1 });
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found'
      });
    }
    
    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching about information',
      error: error.message
    });
  }
});

// POST about information
router.post('/', async (req, res) => {
  try {
    const about = await About.create(req.body);
    res.status(201).json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating about information',
      error: error.message
    });
  }
});

// PUT update about information
router.put('/:id', async (req, res) => {
  try {
    const about = await About.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!about) {
      return res.status(404).json({
        success: false,
        message: 'About information not found'
      });
    }
    
    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating about information',
      error: error.message
    });
  }
});

module.exports = router;
