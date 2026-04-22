import React from 'react';
import { motion } from 'framer-motion';
import { X, Github, ExternalLink, Calendar, Users, Code, Globe, Smartphone, Monitor, MoreHorizontal } from 'lucide-react';

const ProjectModal = ({ project, isOpen, onClose }) => {
  if (!isOpen || !project) return null;

  const getCategoryIcon = (category) => {
    const icons = {
      web: Globe,
      mobile: Smartphone,
      desktop: Monitor,
      other: MoreHorizontal,
    };
    return icons[category] || MoreHorizontal;
  };

  const CategoryIcon = getCategoryIcon(project.category);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 md:h-80 object-cover"
            onError={(e) => {
              e.target.src = `https://ui-avatars.com/api/?name=${project.title}&size=800&background=3b82f6&color=fff`;
            }}
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg"
          >
            <X size={20} />
          </button>
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg flex items-center gap-2">
            <CategoryIcon size={16} className="text-primary-600" />
            <span className="text-sm font-medium capitalize">{project.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <div className="mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-secondary-800 mb-3">
              {project.title}
            </h2>
            <p className="text-lg text-secondary-600 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Project Details Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {project.metrics && (
              <>
                {Object.entries(project.metrics).slice(0, 3).map(([key, value], index) => (
                  <div key={index} className="bg-secondary-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Code size={18} className="text-primary-600" />
                      <span className="font-medium text-secondary-700 capitalize">
                        {key.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <p className="text-secondary-600 font-semibold">{value}</p>
                  </div>
                ))}
              </>
            )}
            {!project.metrics && (
              <>
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar size={18} className="text-primary-600" />
                    <span className="font-medium text-secondary-700">Timeline</span>
                  </div>
                  <p className="text-secondary-600">3 months development</p>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Users size={18} className="text-primary-600" />
                    <span className="font-medium text-secondary-700">Team</span>
                  </div>
                  <p className="text-secondary-600">Solo project</p>
                </div>
                
                <div className="bg-secondary-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Code size={18} className="text-primary-600" />
                    <span className="font-medium text-secondary-700">Code Lines</span>
                  </div>
                  <p className="text-secondary-600">~5,000 lines</p>
                </div>
              </>
            )}
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-primary-100 text-primary-700 px-4 py-2 rounded-lg font-medium"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Key Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-600">Automated scaling and load balancing for high availability</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-600">Infrastructure as Code with version control and automated deployments</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-600">Comprehensive monitoring with real-time alerts and dashboards</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary-600 rounded-full mt-2 flex-shrink-0"></div>
                <span className="text-secondary-600">Zero-downtime deployments with automated rollback capabilities</span>
              </li>
            </ul>
          </div>

          {/* Challenges & Solutions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-secondary-800 mb-4">Challenges & Solutions</h3>
            <div className="space-y-4">
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-medium text-secondary-800 mb-1">Scalability Issues</h4>
                <p className="text-secondary-600">Implemented horizontal scaling with auto-scaling groups and load balancers to handle 10x traffic spikes</p>
              </div>
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-medium text-secondary-800 mb-1">Deployment Complexity</h4>
                <p className="text-secondary-600">Standardized deployments using GitOps and CI/CD pipelines, reducing deployment time by 85%</p>
              </div>
              <div className="border-l-4 border-primary-600 pl-4">
                <h4 className="font-medium text-secondary-800 mb-1">Monitoring Gaps</h4>
                <p className="text-secondary-600">Built comprehensive observability stack with distributed tracing and custom metrics for proactive issue detection</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center justify-center gap-2"
              >
                <ExternalLink size={20} />
                View Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                <Github size={20} />
                View Source Code
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
