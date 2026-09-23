import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section section-divider">
      <div className="container footer-container">
        
        <div className="footer-top-row">
          <div className="footer-brand-col">
            <a href="#top" className="footer-brand">
              <span className="brand-badge">AV</span>
              <span className="brand-name">{personalInfo.name}</span>
            </a>
            <p className="footer-tagline">{personalInfo.tagline}</p>
          </div>

          <div className="footer-nav-col">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#education">Education</a>
            <a href="#contact">Contact</a>
          </div>
        </div>

        <div className="footer-bottom-row">
          <span className="footer-copy">
            © {currentYear} {personalInfo.name}. Built with React & Vite.
          </span>
          <div className="footer-links-row">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href={`mailto:${personalInfo.email}`}>Email</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
