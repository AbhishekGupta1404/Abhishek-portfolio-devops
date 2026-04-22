import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Testimonials from './components/Testimonials';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-secondary-50 dark:bg-secondary-900 transition-colors duration-200">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={
                <>
                  <Hero />
                  <About />
                  <Projects />
                  <Skills />
                  <Testimonials />
                  <Blog />
                  <Contact />
                </>
              } />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#1e293b',
                color: '#f8fafc',
              },
            }}
          />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
