const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const About = require('./models/About');
require('dotenv').config();

const sampleProjects = [
  {
    title: 'Production Kubernetes Cluster Setup',
    description: 'Deployed and managed a 3-node Kubernetes production cluster with automated scaling, load balancing, and disaster recovery. Achieved 99.9% uptime and reduced deployment time by 85%.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    technologies: ['Kubernetes', 'Helm', 'Istio', 'MetalLB', 'Cert-Manager'],
    liveUrl: 'https://k8s-dashboard.example.com',
    githubUrl: 'https://github.com/username/k8s-production-cluster',
    featured: true,
    category: 'devops'
  },
  {
    title: 'Multi-Cloud Infrastructure with Terraform',
    description: 'Designed and implemented infrastructure across AWS, Azure, and GCP using Terraform modules. Managed 50+ environments with IaC, reducing infrastructure costs by 40%.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    technologies: ['Terraform', 'AWS', 'Azure', 'GCP', 'Terragrunt'],
    liveUrl: 'https://infra-console.example.com',
    githubUrl: 'https://github.com/username/multi-cloud-terraform',
    featured: false,
    category: 'infrastructure'
  },
  {
    title: 'Enterprise Monitoring Stack',
    description: 'Built comprehensive monitoring with Prometheus, Grafana, and Loki. Monitored 500+ services with 10,000+ metrics, reducing incident response time by 75%.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    technologies: ['Prometheus', 'Grafana', 'Loki', 'AlertManager', 'VictoriaMetrics'],
    liveUrl: 'https://monitoring.example.com',
    githubUrl: 'https://github.com/username/enterprise-monitoring',
    featured: false,
    category: 'monitoring'
  },
  {
    title: 'Docker Microservices Platform',
    description: 'Containerized 30+ monolith applications into microservices using Docker and Docker Compose. Improved resource utilization by 60% and deployment frequency by 300%.',
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    technologies: ['Docker', 'Docker Compose', 'Portainer', 'Nginx', 'Redis'],
    liveUrl: 'https://docker-hub.example.com',
    githubUrl: 'https://github.com/username/microservices-platform',
    featured: false,
    category: 'containerization'
  },
  {
    title: 'Zero-Trust Security Implementation',
    description: 'Implemented comprehensive zero-trust security architecture with SSO, MFA, and network segmentation. Achieved SOC 2 compliance and reduced security incidents by 95%.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
    technologies: ['OpenSSL', 'Vault', 'OAuth2', 'Fail2Ban', 'WAF'],
    liveUrl: 'https://security.example.com',
    githubUrl: 'https://github.com/username/zero-trust-security',
    featured: false,
    category: 'security'
  },
  {
    title: 'GitOps with ArgoCD',
    description: 'Implemented GitOps workflow using ArgoCD for automated deployments. Synced 15+ Kubernetes clusters from Git, achieving 100% deployment consistency.',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
    technologies: ['ArgoCD', 'Git', 'Kustomize', 'Helm', 'Kubernetes'],
    liveUrl: 'https://argocd.example.com',
    githubUrl: 'https://github.com/username/gitops-argocd',
    featured: true,
    category: 'devops'
  }
];

const sampleSkills = [
  // Cloud Platforms
  { name: 'AWS', category: 'cloud', proficiency: 5, featured: true },
  { name: 'Azure', category: 'cloud', proficiency: 4, featured: true },
  { name: 'Google Cloud', category: 'cloud', proficiency: 3, featured: false },
  { name: 'DigitalOcean', category: 'cloud', proficiency: 4, featured: false },
  
  // Containerization & Orchestration
  { name: 'Docker', category: 'containerization', proficiency: 5, featured: true },
  { name: 'Kubernetes', category: 'containerization', proficiency: 5, featured: true },
  { name: 'Docker Swarm', category: 'containerization', proficiency: 4, featured: false },
  { name: 'Helm', category: 'containerization', proficiency: 4, featured: false },
  
  // CI/CD & Automation
  { name: 'GitLab CI', category: 'cicd', proficiency: 5, featured: true },
  { name: 'Jenkins', category: 'cicd', proficiency: 4, featured: true },
  { name: 'GitHub Actions', category: 'cicd', proficiency: 4, featured: false },
  { name: 'Terraform', category: 'cicd', proficiency: 5, featured: true },
  { name: 'Ansible', category: 'cicd', proficiency: 4, featured: false },
  
  // Infrastructure & Monitoring
  { name: 'Prometheus', category: 'monitoring', proficiency: 5, featured: true },
  { name: 'Grafana', category: 'monitoring', proficiency: 5, featured: true },
  { name: 'ELK Stack', category: 'monitoring', proficiency: 4, featured: false },
  { name: 'Nagios', category: 'monitoring', proficiency: 3, featured: false },
  { name: 'Zabbix', category: 'monitoring', proficiency: 3, featured: false },
  
  // System Administration
  { name: 'Linux', category: 'systems', proficiency: 5, featured: true },
  { name: 'Windows Server', category: 'systems', proficiency: 4, featured: false },
  { name: 'Bash Scripting', category: 'systems', proficiency: 5, featured: true },
  { name: 'PowerShell', category: 'systems', proficiency: 4, featured: false },
  { name: 'Network Security', category: 'systems', proficiency: 4, featured: false },
  
  // Databases & Storage
  { name: 'PostgreSQL', category: 'database', proficiency: 4, featured: false },
  { name: 'MySQL', category: 'database', proficiency: 4, featured: false },
  { name: 'Redis', category: 'database', proficiency: 4, featured: false },
  { name: 'MongoDB', category: 'database', proficiency: 3, featured: false },
  
  // Tools & Version Control
  { name: 'Git', category: 'tools', proficiency: 5, featured: true },
  { name: 'Nginx', category: 'tools', proficiency: 5, featured: false },
  { name: 'Apache', category: 'tools', proficiency: 4, featured: false },
  { name: 'VS Code', category: 'tools', proficiency: 5, featured: false }
];

const sampleAbout = {
  title: "About Me",
  subtitle: "System Administrator & DevOps Engineer",
  description: "I'm Abhishek Gupta, a passionate System Administrator and DevOps Engineer with 5+ years of experience building robust infrastructure, automating deployments, and optimizing system performance. I specialize in cloud architecture, containerization, and CI/CD pipelines. When I'm not managing servers, you'll find me exploring new DevOps tools, contributing to open-source infrastructure projects, or sharing my knowledge with the tech community.",
  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
  resume: "#",
  socialLinks: [
    { platform: "GitHub", url: "https://github.com/AbhishekGupta1404", icon: "Github" },
    { platform: "LinkedIn", url: "https://linkedin.com/in/abhishek-gupta-1404", icon: "Linkedin" },
    { platform: "Twitter", url: "https://twitter.com/abhishekdevops", icon: "Twitter" },
    { platform: "Docker Hub", url: "https://hub.docker.com/u/abhishek1404", icon: "Docker" }
  ],
  stats: [
    { label: "Years Experience", value: "5+" },
    { label: "Servers Managed", value: "100+" },
    { label: "CI/CD Pipelines", value: "25+" },
    { label: "Technologies", value: "20+" }
  ]
};

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await About.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample data
    await Project.insertMany(sampleProjects);
    console.log('Inserted sample projects');

    await Skill.insertMany(sampleSkills);
    console.log('Inserted sample skills');

    await About.create(sampleAbout);
    console.log('Inserted sample about data');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
