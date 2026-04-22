import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        // For now, use sample data. In production, this would come from an API
        const sampleTestimonials = [
          {
            _id: '1',
            name: 'Sarah Johnson',
            position: 'CEO at TechStart',
            company: 'TechStart Inc.',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b332c2ca?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            testimonial: 'Working with [Your Name] was an absolute pleasure. They delivered our project on time and exceeded our expectations with their attention to detail and innovative solutions.',
            project: 'E-Commerce Platform',
            date: '2024-01-15'
          },
          {
            _id: '2',
            name: 'Michael Chen',
            position: 'Product Manager',
            company: 'Digital Solutions Ltd',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            testimonial: 'Exceptional developer with strong problem-solving skills. They transformed our ideas into a beautiful, functional application that our users love.',
            project: 'Task Management App',
            date: '2024-02-20'
          },
          {
            _id: '3',
            name: 'Emily Rodriguez',
            position: 'Marketing Director',
            company: 'Creative Agency',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
            rating: 4,
            testimonial: 'Professional, reliable, and creative. They brought our vision to life and provided excellent support throughout the entire development process.',
            project: 'Weather Dashboard',
            date: '2024-03-10'
          },
          {
            _id: '4',
            name: 'David Kim',
            position: 'CTO',
            company: 'FinTech Solutions',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
            rating: 5,
            testimonial: 'Outstanding technical skills and communication. They delivered a complex banking application that meets all our security and performance requirements.',
            project: 'Mobile Banking App',
            date: '2024-01-28'
          }
        ];
        
        setTestimonials(sampleTestimonials);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
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
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="h-4 bg-gray-200 rounded w-24 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded mb-4"></div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-24"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Client Testimonials
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            What my clients say about working with me
          </p>
        </motion.div>

        {/* Featured Testimonial */}
        <div className="mb-16">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="flex items-center justify-center mb-6">
                <Quote className="w-12 h-12 text-primary-600" />
              </div>
              
              <blockquote className="text-xl md:text-2xl text-secondary-700 text-center mb-8 leading-relaxed">
                "{testimonials[currentIndex].testimonial}"
              </blockquote>

              <div className="flex items-center justify-center gap-1 mb-6">
                {renderStars(testimonials[currentIndex].rating)}
              </div>

              <div className="flex items-center justify-center gap-4">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${testimonials[currentIndex].name}&size=100&background=3b82f6&color=fff`;
                  }}
                />
                <div className="text-center">
                  <div className="font-semibold text-secondary-800">
                    {testimonials[currentIndex].name}
                  </div>
                  <div className="text-secondary-600">
                    {testimonials[currentIndex].position}
                  </div>
                  <div className="text-sm text-primary-600 font-medium">
                    {testimonials[currentIndex].company}
                  </div>
                </div>
              </div>

              <div className="text-center mt-6">
                <span className="text-sm text-secondary-500 bg-secondary-100 px-3 py-1 rounded-full">
                  Project: {testimonials[currentIndex].project}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevTestimonial}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentIndex ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button
              onClick={nextTestimonial}
              className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* All Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`card p-6 cursor-pointer transition-all duration-300 ${
                index === currentIndex ? 'ring-2 ring-primary-600 shadow-xl' : ''
              }`}
              onClick={() => goToTestimonial(index)}
            >
              <div className="flex items-center gap-1 mb-4">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="text-secondary-600 mb-4 line-clamp-3">
                "{testimonial.testimonial}"
              </p>
              
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${testimonial.name}&size=100&background=3b82f6&color=fff`;
                  }}
                />
                <div className="flex-1">
                  <div className="font-medium text-secondary-800 text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-secondary-600">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-semibold text-secondary-800 mb-4">
            Ready to work together?
          </h3>
          <p className="text-secondary-600 mb-6 max-w-2xl mx-auto">
            Join my list of satisfied clients. Let's discuss your project and bring your ideas to life.
          </p>
          <a
            href="#contact"
            className="btn-primary"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
