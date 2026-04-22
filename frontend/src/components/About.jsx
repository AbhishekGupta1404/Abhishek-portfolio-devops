import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { aboutAPI } from '../utils/api';
import { Calendar, MapPin, Download, ExternalLink } from 'lucide-react';

const About = () => {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const data = await aboutAPI.get();
        setAbout(data.data);
      } catch (error) {
        console.error('Error fetching about data:', error);
        // Use fallback data if API fails
        setAbout({
          title: "About Me",
          subtitle: "Full Stack Developer",
          description: "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating intuitive, performant applications that solve real-world problems.",
          image: "/profile-image.jpg",
          resume: "#",
          socialLinks: [
            { platform: "GitHub", url: "#", icon: "Github" },
            { platform: "LinkedIn", url: "#", icon: "Linkedin" },
            { platform: "Twitter", url: "#", icon: "Twitter" }
          ],
          stats: [
            { label: "Years Experience", value: "5+" },
            { label: "Projects Completed", value: "50+" },
            { label: "Happy Clients", value: "30+" },
            { label: "Technologies", value: "15+" }
          ]
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return (
      <section id="about" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-96 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!about) return null;

  return (
    <section id="about" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            {about.title}
          </h2>
          <p className="text-xl text-secondary-600 max-w-2xl mx-auto">
            {about.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={about.image}
                alt="Profile"
                className="w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=Your+Name&size=400&background=3b82f6&color=fff`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent"></div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-xl p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary-600">5+</div>
                <div className="text-sm text-secondary-600">Years Experience</div>
              </div>
            </div>
          </motion.div>

          {/* Content Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="prose prose-lg text-secondary-700">
              <p>{about.description}</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-4 bg-secondary-50 rounded-lg"
                >
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-secondary-600">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href={about.resume}
                className="btn-primary flex items-center justify-center gap-2"
              >
                <Download size={20} />
                Download CV
              </a>
              <a
                href="#contact"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                Get In Touch
                <ExternalLink size={20} />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Social Links */}
        {about.socialLinks && about.socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 text-center"
          >
            <h3 className="text-xl font-semibold text-secondary-800 mb-6">Connect With Me</h3>
            <div className="flex justify-center items-center space-x-6">
              {about.socialLinks.map((social, index) => (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-secondary-100 rounded-full hover:bg-primary-100 hover:text-primary-600 transition-all duration-200 transform hover:scale-110"
                >
                  <span className="text-xl">{social.platform[0]}</span>
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default About;
