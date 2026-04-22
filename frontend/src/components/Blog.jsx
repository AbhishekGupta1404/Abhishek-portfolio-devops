import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Tag, Search, ChevronRight, ArrowRight } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'kubernetes', name: 'Kubernetes' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'cicd', name: 'CI/CD' },
    { id: 'monitoring', name: 'Monitoring' },
    { id: 'security', name: 'Security' },
    { id: 'tutorials', name: 'Tutorials' },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Sample blog posts data
        const samplePosts = [
          {
            _id: '1',
            title: 'Kubernetes Best Practices for Production Deployments',
            slug: 'kubernetes-best-practices-production',
            excerpt: 'Learn the essential best practices for deploying and managing Kubernetes clusters in production, including security, monitoring, and scaling strategies.',
            content: 'Full article content here...',
            image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=400&fit=crop',
            author: {
              name: 'Abhishek Gupta',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            category: 'kubernetes',
            tags: ['Kubernetes', 'DevOps', 'Production', 'Best Practices'],
            readTime: 12,
            publishedAt: '2024-01-15T10:00:00Z',
            featured: true
          },
          {
            _id: '2',
            title: 'Complete Guide to Infrastructure as Code with Terraform',
            slug: 'terraform-infrastructure-as-code-guide',
            excerpt: 'A comprehensive guide to implementing Infrastructure as Code using Terraform, from basic concepts to advanced patterns for cloud resource management.',
            content: 'Full article content here...',
            image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
            author: {
              name: 'Abhishek Gupta',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            category: 'infrastructure',
            tags: ['Terraform', 'IaC', 'AWS', 'DevOps'],
            readTime: 15,
            publishedAt: '2024-01-10T14:30:00Z',
            featured: false
          },
          {
            _id: '3',
            title: 'Building Effective CI/CD Pipelines with GitLab CI',
            slug: 'gitlab-ci-cd-pipelines-tutorial',
            excerpt: 'Learn how to create robust CI/CD pipelines using GitLab CI, including automated testing, container builds, and deployment strategies.',
            content: 'Full article content here...',
            image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
            author: {
              name: 'Abhishek Gupta',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            category: 'cicd',
            tags: ['GitLab CI', 'CI/CD', 'Docker', 'Automation'],
            readTime: 10,
            publishedAt: '2024-01-05T09:15:00Z',
            featured: false
          },
          {
            _id: '4',
            title: 'Monitoring Kubernetes Clusters with Prometheus and Grafana',
            slug: 'monitoring-kubernetes-prometheus-grafana',
            excerpt: 'Step-by-step guide to setting up comprehensive monitoring for Kubernetes clusters using Prometheus for metrics collection and Grafana for visualization.',
            content: 'Full article content here...',
            image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
            author: {
              name: 'Abhishek Gupta',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            category: 'monitoring',
            tags: ['Prometheus', 'Grafana', 'Kubernetes', 'Monitoring'],
            readTime: 14,
            publishedAt: '2023-12-28T16:45:00Z',
            featured: true
          },
          {
            _id: '5',
            title: 'Linux Security Hardening for Production Servers',
            slug: 'linux-security-hardening-production',
            excerpt: 'Essential security measures and best practices for hardening Linux servers in production environments, including firewalls, access control, and monitoring.',
            content: 'Full article content here...',
            image: 'https://images.unsplash.com/photo-1558494949-ef010cbcc31b?w=800&h=400&fit=crop',
            author: {
              name: 'Abhishek Gupta',
              avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
            },
            category: 'security',
            tags: ['Linux', 'Security', 'Hardening', 'Production'],
            readTime: 18,
            publishedAt: '2023-12-20T11:20:00Z',
            featured: false
          }
        ];
        
        setPosts(samplePosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <section className="section-padding bg-white">
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
    <section className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Blog & Articles
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            Sharing my thoughts, experiences, and tutorials on web development and technology
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-colors duration-200"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-secondary-100 text-secondary-700 hover:bg-secondary-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Post */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-16"
          >
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-white">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <span className="inline-block bg-white/20 text-white text-sm px-3 py-1 rounded-full mb-4">
                    Featured Article
                  </span>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {filteredPosts.find(post => post.featured)?.title}
                  </h3>
                  <p className="text-lg mb-6 text-primary-100">
                    {filteredPosts.find(post => post.featured)?.excerpt}
                  </p>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>{filteredPosts.find(post => post.featured)?.readTime} min read</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>{formatDate(filteredPosts.find(post => post.featured)?.publishedAt)}</span>
                    </div>
                  </div>
                  <a
                    href={`/blog/${filteredPosts.find(post => post.featured)?.slug}`}
                    className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200"
                  >
                    Read Full Article
                    <ArrowRight size={20} />
                  </a>
                </div>
                <div className="relative">
                  <img
                    src={filteredPosts.find(post => post.featured)?.image}
                    alt={filteredPosts.find(post => post.featured)?.title}
                    className="rounded-xl shadow-2xl w-full h-64 object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="card group cursor-pointer hover:shadow-xl transition-all duration-300"
            >
              {/* Post Image */}
              <div className="relative overflow-hidden h-48">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {post.featured && (
                  <div className="absolute top-4 left-4 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>

              {/* Post Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-secondary-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{post.readTime} min</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-secondary-800 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200">
                  {post.title}
                </h3>
                
                <p className="text-secondary-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                  {post.tags.length > 3 && (
                    <span className="px-2 py-1 bg-secondary-100 text-secondary-700 text-xs rounded-full">
                      +{post.tags.length - 3}
                    </span>
                  )}
                </div>

                {/* Author and Read More */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm text-secondary-700">{post.author.name}</span>
                  </div>
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center gap-1"
                  >
                    Read More
                    <ChevronRight size={16} />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">No articles found</div>
            <p className="text-secondary-600 text-lg">
              No articles match your search criteria.
            </p>
          </motion.div>
        )}

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-gradient-to-r from-primary-600 to-primary-800 rounded-2xl p-8 md:p-12 text-center text-white"
        >
          <h3 className="text-3xl font-bold mb-4">
            Subscribe to My Newsletter
          </h3>
          <p className="text-lg mb-8 text-primary-100 max-w-2xl mx-auto">
            Get the latest articles, tutorials, and insights delivered straight to your inbox. No spam, unsubscribe anytime.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-secondary-800 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-50 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Blog;
