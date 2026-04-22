const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    enum: ['frontend', 'backend', 'database', 'devops', 'tools', 'other'],
    required: true
  },
  proficiency: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  icon: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', SkillSchema);
