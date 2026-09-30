import React, { useRef, useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Hero() {
  const heroRef = useRef(null);
  const [spotlightActive, setSpotlightActive] = useState(false);

  useEffect(() => {
    const heroEl = heroRef.current;
    if (!heroEl) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) return;

    let isTouch = false;
    let rafId = null;
    let lastX = -1;
    let lastY = -1;

    const handleTouch = () => {
      isTouch = true;
      setSpotlightActive(false);
    };

    const handleMouseMove = (e) => {
      if (isTouch) return;
      const rect = heroEl.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      if (x === lastX && y === lastY) return;
      lastX = x;
      lastY = y;

      if (!rafId) {
        rafId = requestAnimationFrame(() => {
          heroEl.style.setProperty('--mouse-x', `${lastX}px`);
          heroEl.style.setProperty('--mouse-y', `${lastY}px`);
          setSpotlightActive(true);
          rafId = null;
        });
      }
    };

    const handleMouseLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      setSpotlightActive(false);
    };

    window.addEventListener('touchstart', handleTouch, { passive: true });
    heroEl.addEventListener('mousemove', handleMouseMove, { passive: true });
    heroEl.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('touchstart', handleTouch);
      heroEl.removeEventListener('mousemove', handleMouseMove);
      heroEl.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section id="top" ref={heroRef} className="hero-section section-padding">
      <div className={`hero-spotlight ${spotlightActive ? 'active' : ''}`} aria-hidden="true" />
      <div className="container hero-grid-layout">
        
        {/* Left Copy Column */}
        <div className="hero-copy-col">
          <div className="hero-status-pill hero-fade-1">
            <span className="status-indicator-dot"></span>
            <span>{personalInfo.availability}</span>
          </div>

          <h1 className="hero-headline hero-fade-2">
            <span className="hero-name">{personalInfo.name}</span>
            <span className="hero-subtext">Software Engineer building modern mobile, web & AI-powered products.</span>
          </h1>

          <p className="hero-description hero-fade-3">
            Specializing in <strong>Flutter</strong>, <strong>React</strong>, <strong>Full-Stack MERN</strong>, 
            <strong>Firebase</strong>, <strong>RESTful APIs</strong>, and <strong>AI/ML integrations</strong> (GenAI & Model Context Protocols).
          </p>

          <div className="hero-actions-row hero-fade-4">
            <a href="#projects" className="btn btn-primary">
              <span>View Projects</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
            <a href="/resume.pdf" download className="btn btn-secondary" aria-label="Download Resume PDF">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              <span>Resume</span>
            </a>
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span>GitHub</span>
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
              <span>LinkedIn</span>
            </a>
          </div>

          <div className="hero-meta-row hero-fade-5">
            <span className="hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>{personalInfo.location}</span>
            </span>
            <span className="hero-meta-item">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 8 4 4-4 4"/><path d="M14 16h2"/></svg>
              <span>ABES EC (AKTU 2027)</span>
            </span>
          </div>
        </div>

        {/* Right Engineering Console Visual */}
        <div className="hero-visual-col hero-fade-visual">
          <div className="developer-console-card card-base">
            <div className="console-header">
              <div className="console-window-dots">
                <span className="dot dot-red"></span>
                <span className="dot dot-yellow"></span>
                <span className="dot dot-green"></span>
              </div>
              <div className="console-title-tab">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
                <span>developer_profile.ts</span>
              </div>
              <span className="console-status-badge">ACTIVE RUNTIME</span>
            </div>

            <div className="console-body-code">
              <pre className="code-block">
                <code>
{`const engineer = {
  name: "${personalInfo.name}",
  role: "Software Engineer",
  stack: {
    mobile: "Flutter & Dart",
    web: "React & Node.js",
    backend: "REST APIs & MERN",
    ai: "MCP & Voice Synthesis"
  },
  status: "Shipping Software"
};`}
                </code>
              </pre>
            </div>

            {/* Architecture Node Indicators */}
            <div className="console-footer-nodes">
              <div className="node-item">
                <span className="node-icon cyan">⚡</span>
                <div className="node-info">
                  <span className="node-label">Flutter Engine</span>
                  <span className="node-sub">IoT & Maps Mobile</span>
                </div>
              </div>
              <div className="node-item">
                <span className="node-icon blue">🌐</span>
                <div className="node-info">
                  <span className="node-label">REST & Cloud</span>
                  <span className="node-sub">Node / Firebase</span>
                </div>
              </div>
              <div className="node-item">
                <span className="node-icon emerald">🤖</span>
                <div className="node-info">
                  <span className="node-label">AI Automation</span>
                  <span className="node-sub">Speech & MCP</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
