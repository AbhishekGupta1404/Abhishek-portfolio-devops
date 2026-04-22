import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsAPI } from '../utils/api';
import { Github, ExternalLink, Filter, Code, Smartphone, Monitor, MoreHorizontal, Search, Grid, List, Server, Database } from 'lucide-react';
import ProjectModal from './ProjectModal';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = [
    { id: 'all', name: 'All Projects', icon: MoreHorizontal },
    { id: 'devops', name: 'DevOps', icon: Code },
    { id: 'infrastructure', name: 'Infrastructure', icon: Server },
    { id: 'monitoring', name: 'Monitoring', icon: Database },
    { id: 'containerization', name: 'Containerization', icon: Monitor },
    { id: 'security', name: 'Security', icon: Code },
  ];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await projectsAPI.getAll({ featured: false });
        setProjects(data.data);
        setFilteredProjects(data.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        // Use fallback data if API fails
        const fallbackProjects = [
          {
            _id: '1',
            title: 'Production Kubernetes Cluster Setup',
            description: 'Deployed and managed a 3-node Kubernetes production cluster with automated scaling, load balancing, and disaster recovery. Achieved 99.9% uptime and reduced deployment time by 85%.',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
            technologies: ['Kubernetes', 'Helm', 'Istio', 'MetalLB', 'Cert-Manager'],
            liveUrl: 'https://k8s-dashboard.example.com',
            githubUrl: 'https://github.com/username/k8s-production-cluster',
            featured: true,
            category: 'devops',
            metrics: {
              uptime: '99.9%',
              deployments: '200+/month',
              scaling: 'Auto',
              nodes: '3 master + 6 worker'
            }
          },
          {
            _id: '2',
            title: 'Multi-Cloud Infrastructure with Terraform',
            description: 'Designed and implemented infrastructure across AWS, Azure, and GCP using Terraform modules. Managed 50+ environments with IaC, reducing infrastructure costs by 40%.',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
            technologies: ['Terraform', 'AWS', 'Azure', 'GCP', 'Terragrunt'],
            liveUrl: 'https://infra-console.example.com',
            githubUrl: 'https://github.com/username/multi-cloud-terraform',
            featured: false,
            category: 'infrastructure',
            metrics: {
              environments: '50+',
              cost_reduction: '40%',
              providers: '3',
              modules: '25+'
            }
          },
          {
            _id: '3',
            title: 'Enterprise Monitoring Stack',
            description: 'Built comprehensive monitoring with Prometheus, Grafana, and Loki. Monitored 500+ services with 10,000+ metrics, reducing incident response time by 75%.',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
            technologies: ['Prometheus', 'Grafana', 'Loki', 'AlertManager', 'VictoriaMetrics'],
            liveUrl: 'https://monitoring.example.com',
            githubUrl: 'https://github.com/username/enterprise-monitoring',
            featured: false,
            category: 'monitoring',
            metrics: {
              services: '500+',
              metrics: '10,000+/sec',
              alerts: '200+',
              response_time: '75% reduction'
            }
          },
          {
            _id: '4',
            title: 'Docker Microservices Platform',
            description: 'Containerized 30+ monolith applications into microservices using Docker and Docker Compose. Improved resource utilization by 60% and deployment frequency by 300%.',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
            technologies: ['Docker', 'Docker Compose', 'Portainer', 'Nginx', 'Redis'],
            liveUrl: 'https://docker-hub.example.com',
            githubUrl: 'https://github.com/username/microservices-platform',
            featured: false,
            category: 'containerization',
            metrics: {
              microservices: '30+',
              utilization: '60% improvement',
              deployments: '300% increase',
              images: '200+'
            }
          },
          {
            _id: '5',
            title: 'Zero-Trust Security Implementation',
            description: 'Implemented comprehensive zero-trust security architecture with SSO, MFA, and network segmentation. Achieved SOC 2 compliance and reduced security incidents by 95%.',
            image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
            technologies: ['OpenSSL', 'Vault', 'OAuth2', 'Fail2Ban', 'WAF'],
            liveUrl: 'https://security.example.com',
            githubUrl: 'https://github.com/username/zero-trust-security',
            featured: false,
            category: 'security',
            metrics: {
              compliance: 'SOC 2',
              incidents: '95% reduction',
              auth_methods: 'SSO + MFA',
              policies: '50+'
            }
          },
          {
            _id: '6',
            title: 'GitOps with ArgoCD',
            description: 'Implemented GitOps workflow using ArgoCD for automated deployments. Synced 15+ Kubernetes clusters from Git, achieving 100% deployment consistency.',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
            technologies: ['ArgoCD', 'Git', 'Kustomize', 'Helm', 'Kubernetes'],
            liveUrl: 'https://argocd.example.com',
            githubUrl: 'https://github.com/username/gitops-argocd',
            featured: true,
            category: 'devops',
            metrics: {
              clusters: '15+',
              consistency: '100%',
              sync_time: '2 minutes',
              rollbacks: 'Automated'
            }
          }
        ];
        setProjects(fallbackProjects);
        setFilteredProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilter = (categoryId) => {
    setActiveFilter(categoryId);
    let filtered = projects;
    
    if (categoryId !== 'all') {
      filtered = filtered.filter(project => project.category === categoryId);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
    
    setFilteredProjects(filtered);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    let filtered = projects;
    
    if (activeFilter !== 'all') {
      filtered = filtered.filter(project => project.category === activeFilter);
    }
    
    if (term) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(term.toLowerCase()) ||
        project.description.toLowerCase().includes(term.toLowerCase()) ||
        project.technologies.some(tech => 
          tech.toLowerCase().includes(term.toLowerCase())
        )
      );
    }
    
    setFilteredProjects(filtered);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  if (loading) {
    return (
      <section id="projects" className="section-padding bg-secondary-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  <div className="h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-4">
                    <div className="h-6 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="projects" className="section-padding bg-secondary-50">
        <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Explore my recent work and see how I bring ideas to life through code
          </p>
        </motion.div>

        {/* Search and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
              <input
                type="text"
                placeholder="Search projects by name, description, or technology..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-secondary-300">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleFilter(category.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                activeFilter === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-white text-secondary-700 hover:bg-secondary-100'
              }`}
            >
              <category.icon size={18} />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Display */}
        <AnimatePresence mode="wait">
          {viewMode === 'grid' ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card group cursor-pointer"
                  onClick={() => openModal(project)}
                >
                  {/* Project Image */}
                  <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary-100 to-primary-200">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${project.title}&size=400&background=3b82f6&color=fff`;
                      }}
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                        <span className="text-white text-sm font-medium capitalize">
                          {project.category}
                        </span>
                        {project.featured && (
                          <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-secondary-800 mb-3">
                      {project.title}
                    </h3>
                    <p className="text-secondary-600 mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                          +{project.technologies.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-primary text-center flex items-center justify-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 btn-secondary text-center flex items-center justify-center gap-2"
                        >
                          <Github size={16} />
                          Code
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card p-6 cursor-pointer hover:shadow-xl transition-all duration-300"
                  onClick={() => openModal(project)}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {/* Project Image */}
                    <div className="md:w-48 h-32 md:h-32 flex-shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${project.title}&size=200&background=3b82f6&color=fff`;
                        }}
                      />
                    </div>

                    {/* Project Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold text-secondary-800 mb-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-3 text-sm text-secondary-600">
                            <span className="capitalize">{project.category}</span>
                            {project.featured && (
                              <span className="bg-primary-100 text-primary-700 px-2 py-1 rounded-full text-xs">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <p className="text-secondary-600 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="px-3 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                            +{project.technologies.length - 4}
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-primary flex items-center justify-center gap-2"
                          >
                            <ExternalLink size={16} />
                            Live Demo
                          </a>
                        )}
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary flex items-center justify-center gap-2"
                          >
                            <Github size={16} />
                            Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty State */}
        {filteredProjects.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">No projects found</div>
            <p className="text-secondary-600 text-lg">
              No projects match the selected category.
            </p>
          </motion.div>
        )}
      </div>
    </section>

    {/* Project Modal */}
    <AnimatePresence>
      {isModalOpen && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </AnimatePresence>
    </>
  );
};

export default Projects;
