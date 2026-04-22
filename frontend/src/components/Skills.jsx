import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { skillsAPI } from '../utils/api';
import { Code, Database, Globe, Server, Wrench, MoreHorizontal } from 'lucide-react';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Skills', icon: MoreHorizontal },
    { id: 'cloud', name: 'Cloud Platforms', icon: Globe },
    { id: 'containerization', name: 'Containerization', icon: Code },
    { id: 'cicd', name: 'CI/CD & Automation', icon: Server },
    { id: 'monitoring', name: 'Monitoring', icon: Database },
    { id: 'systems', name: 'System Administration', icon: Wrench },
    { id: 'database', name: 'Databases', icon: Database },
    { id: 'tools', name: 'Tools', icon: Code },
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await skillsAPI.getAll();
        setSkills(data.data);
        setFilteredSkills(data.data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        // Use fallback data if API fails
        const fallbackSkills = [
          // Cloud Platforms
          { _id: '1', name: 'AWS', category: 'cloud', proficiency: 5, featured: true },
          { _id: '2', name: 'Azure', category: 'cloud', proficiency: 4, featured: true },
          { _id: '3', name: 'Google Cloud', category: 'cloud', proficiency: 3, featured: false },
          
          // Containerization
          { _id: '4', name: 'Docker', category: 'containerization', proficiency: 5, featured: true },
          { _id: '5', name: 'Kubernetes', category: 'containerization', proficiency: 5, featured: true },
          { _id: '6', name: 'Helm', category: 'containerization', proficiency: 4, featured: false },
          
          // CI/CD & Automation
          { _id: '7', name: 'GitLab CI', category: 'cicd', proficiency: 5, featured: true },
          { _id: '8', name: 'Jenkins', category: 'cicd', proficiency: 4, featured: true },
          { _id: '9', name: 'Terraform', category: 'cicd', proficiency: 5, featured: true },
          
          // Monitoring
          { _id: '10', name: 'Prometheus', category: 'monitoring', proficiency: 5, featured: true },
          { _id: '11', name: 'Grafana', category: 'monitoring', proficiency: 5, featured: true },
          { _id: '12', name: 'ELK Stack', category: 'monitoring', proficiency: 4, featured: false },
          
          // System Administration
          { _id: '13', name: 'Linux', category: 'systems', proficiency: 5, featured: true },
          { _id: '14', name: 'Bash Scripting', category: 'systems', proficiency: 5, featured: true },
          { _id: '15', name: 'Network Security', category: 'systems', proficiency: 4, featured: false },
          
          // Tools
          { _id: '16', name: 'Git', category: 'tools', proficiency: 5, featured: true },
          { _id: '17', name: 'Nginx', category: 'tools', proficiency: 5, featured: false },
        ];
        setSkills(fallbackSkills);
        setFilteredSkills(fallbackSkills);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const handleCategoryFilter = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === 'all') {
      setFilteredSkills(skills);
    } else {
      setFilteredSkills(skills.filter(skill => skill.category === categoryId));
    }
  };

  const getProficiencyColor = (proficiency) => {
    const colors = [
      'bg-red-500',
      'bg-orange-500',
      'bg-yellow-500',
      'bg-lime-500',
      'bg-green-500',
    ];
    return colors[proficiency - 1] || 'bg-gray-500';
  };

  const getProficiencyLabel = (proficiency) => {
    const labels = ['Beginner', 'Novice', 'Intermediate', 'Advanced', 'Expert'];
    return labels[proficiency - 1] || 'Unknown';
  };

  if (loading) {
    return (
      <section id="skills" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-2 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-16"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            My expertise across different technologies and tools
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryFilter(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
              }`}
            >
              <category.icon size={16} />
              {category.name}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill._id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              className="card p-6 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-secondary-800">
                  {skill.name}
                </h3>
                {skill.featured && (
                  <span className="bg-primary-100 text-primary-600 text-xs px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </div>

              {/* Proficiency Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-secondary-600">Proficiency</span>
                  <span className="text-sm font-medium text-secondary-700">
                    {getProficiencyLabel(skill.proficiency)}
                  </span>
                </div>
                <div className="w-full bg-secondary-200 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(skill.proficiency / 5) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
                    className={`h-2 rounded-full ${getProficiencyColor(skill.proficiency)}`}
                  />
                </div>
              </div>

              {/* Category Badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-secondary-500 capitalize">
                  {skill.category}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-1.5 h-1.5 rounded-full mx-0.5 ${
                        i < skill.proficiency
                          ? getProficiencyColor(skill.proficiency)
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredSkills.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">No skills found</div>
            <p className="text-secondary-600 text-lg">
              No skills match the selected category.
            </p>
          </motion.div>
        )}

        {/* Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid md:grid-cols-4 gap-6"
        >
          {categories.slice(1).map((category, index) => {
            const categorySkills = skills.filter(skill => skill.category === category.id);
            return (
              <div
                key={category.id}
                className="text-center p-6 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl"
              >
                <category.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                <div className="text-2xl font-bold text-primary-800 mb-1">
                  {categorySkills.length}
                </div>
                <div className="text-sm text-primary-600">
                  {category.name}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
