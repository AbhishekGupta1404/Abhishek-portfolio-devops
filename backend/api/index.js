import { connectDB } from '../config/database.js';
import Project from '../models/Project.js';
import Skill from '../models/Skill.js';
import About from '../models/About.js';
import Contact from '../models/Contact.js';

// Initialize database connection
let dbConnected = false;

async function ensureDBConnection() {
  if (!dbConnected) {
    await connectDB();
    dbConnected = true;
  }
}

// Generic error handler
const handleError = (res, error, message = 'Internal Server Error') => {
  console.error(error);
  return res.status(500).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
};

// Projects API
export async function projectsHandler(req, res) {
  try {
    await ensureDBConnection();
    
    if (req.method === 'GET') {
      const projects = await Project.find().sort({ createdAt: -1 });
      return res.status(200).json({
        success: true,
        data: projects
      });
    }
    
    if (req.method === 'POST') {
      const project = await Project.create(req.body);
      return res.status(201).json({
        success: true,
        data: project
      });
    }
    
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    return handleError(res, error);
  }
}

// Skills API
export async function skillsHandler(req, res) {
  try {
    await ensureDBConnection();
    
    if (req.method === 'GET') {
      const { category } = req.query;
      const filter = category ? { category } : {};
      const skills = await Skill.find(filter).sort({ featured: -1, proficiency: -1 });
      
      return res.status(200).json({
        success: true,
        data: skills
      });
    }
    
    if (req.method === 'POST') {
      const skill = await Skill.create(req.body);
      return res.status(201).json({
        success: true,
        data: skill
      });
    }
    
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    return handleError(res, error);
  }
}

// About API
export async function aboutHandler(req, res) {
  try {
    await ensureDBConnection();
    
    if (req.method === 'GET') {
      let about = await About.findOne();
      
      if (!about) {
        // Return fallback data if no about entry exists
        about = {
          title: "About Me",
          subtitle: "System Administrator & DevOps Engineer",
          description: "I'm Abhishek Gupta, a passionate System Administrator and DevOps Engineer with 5+ years of experience building robust infrastructure, automating deployments, and optimizing system performance.",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
          socialLinks: [
            { platform: "GitHub", url: "https://github.com/AbhishekGupta1404" },
            { platform: "LinkedIn", url: "https://www.linkedin.com/in/abhishek-gupta-a3a4692b8" },
            { platform: "Twitter", url: "https://twitter.com/abhishekdevops" }
          ],
          stats: [
            { label: "Years Experience", value: "5+" },
            { label: "Servers Managed", value: "100+" },
            { label: "CI/CD Pipelines", value: "25+" },
            { label: "Technologies", value: "20+" }
          ]
        };
      }
      
      return res.status(200).json({
        success: true,
        data: about
      });
    }
    
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    return handleError(res, error);
  }
}

// Contact API
export async function contactHandler(req, res) {
  try {
    await ensureDBConnection();
    
    if (req.method === 'POST') {
      const contact = await Contact.create(req.body);
      return res.status(201).json({
        success: true,
        data: contact,
        message: 'Message sent successfully!'
      });
    }
    
    return res.status(405).json({
      success: false,
      message: 'Method not allowed'
    });
  } catch (error) {
    return handleError(res, error);
  }
}

// Health check
export async function healthHandler(req, res) {
  try {
    return res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  } catch (error) {
    return handleError(res, error);
  }
}
