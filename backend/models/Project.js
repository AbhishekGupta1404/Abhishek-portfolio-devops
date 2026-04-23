import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  technologies: [{
    type: String,
    required: true
  }],
  liveUrl: {
    type: String,
    required: false
  },
  githubUrl: {
    type: String,
    required: false
  },
  featured: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    enum: ['infrastructure', 'cicd', 'monitoring', 'security', 'containerization', 'cloud'],
    default: 'infrastructure'
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

export default mongoose.model('Project', ProjectSchema);
