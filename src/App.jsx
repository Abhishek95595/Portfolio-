import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import NotFound from './components/NotFound';

export default function App() {
  const [activeSection, setActiveSection] = useState('top');
  const [isNotFound, setIsNotFound] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname;
      return p !== '/' && p !== '/index.html';
    }
    return false;
  });

  useEffect(() => {
    const handlePopState = () => {
      const p = window.location.pathname;
      setIsNotFound(p !== '/' && p !== '/index.html');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['top', 'about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (isNotFound) {
    return <NotFound />;
  }

  return (
    <div className="site-wrapper">
      <div className="bg-grid-pattern" aria-hidden="true"></div>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
