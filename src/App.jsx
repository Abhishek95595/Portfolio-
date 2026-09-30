import React, { useState, useEffect } from 'react';
import ParticleBackground from './components/ParticleBackground';
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
    if (typeof window === 'undefined') return;

    const sections = document.querySelectorAll('section[id]');
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 120) {
          setActiveSection('top');
          return;
        }

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-40% 0px -55% 0px',
        threshold: 0,
      }
    );

    sections.forEach((sec) => observer.observe(sec));

    const handleTopScroll = () => {
      if (window.scrollY < 120) {
        setActiveSection('top');
      }
    };

    window.addEventListener('scroll', handleTopScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleTopScroll);
    };
  }, [isNotFound]);

  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [isNotFound]);

  if (isNotFound) {
    return (
      <>
        <div className="aurora-glow" aria-hidden="true">
          <div className="aurora-blob blob-1" />
          <div className="aurora-blob blob-2" />
        </div>
        <div className="bg-grid-pattern" aria-hidden="true" />
        <ParticleBackground />
        <div className="bg-grain-overlay" aria-hidden="true" />
        <NotFound />
      </>
    );
  }

  return (
    <>
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <div className="aurora-glow" aria-hidden="true">
        <div className="aurora-blob blob-1" />
        <div className="aurora-blob blob-2" />
      </div>
      <div className="bg-grid-pattern" aria-hidden="true" />
      <ParticleBackground />
      <div className="bg-grain-overlay" aria-hidden="true" />
      <div className="site-wrapper">
        <Navbar activeSection={activeSection} />
        <main id="main-content">
          <Hero />
          <div className="scroll-reveal"><About /></div>
          <div className="scroll-reveal"><Experience /></div>
          <div className="scroll-reveal"><Projects /></div>
          <div className="scroll-reveal"><Skills /></div>
          <div className="scroll-reveal"><Education /></div>
          <div className="scroll-reveal"><Contact /></div>
        </main>
        <Footer />
      </div>
    </>
  );
}
