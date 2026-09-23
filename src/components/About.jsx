import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  const pillars = [
    {
      number: "01",
      title: "Mobile Architecture",
      description: "Building production Flutter applications with reactive state management, IoT device control, and real-time location mapping.",
      tag: "Flutter / Dart"
    },
    {
      number: "02",
      title: "Full-Stack Development",
      description: "Designing RESTful API services, backend routing, MongoDB databases, and responsive React frontend applications.",
      tag: "MERN Stack"
    },
    {
      number: "03",
      title: "AI Systems & Protocols",
      description: "Integrating speech recognition, natural voice synthesis, GenAI capabilities, and Model Context Protocol (MCP) toolings.",
      tag: "AI & MCP"
    },
    {
      number: "04",
      title: "Core Computer Science",
      description: "Grounded in algorithms, data structures, object-oriented principles, system design concepts, and version control hygiene.",
      tag: "Engineering"
    }
  ];

  return (
    <section id="about" className="section-padding section-divider">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">01 / Profile</span>
          <h2 className="section-title">Engineering with a product mindset.</h2>
          <p className="section-subtitle">
            Computer Science undergraduate at ABES Engineering College (AKTU 2027) with hands-on experience building mobile apps, cloud services, and AI systems.
          </p>
        </div>

        <div className="about-grid">
          
          {/* Left Bio Card */}
          <div className="about-bio-card card-base">
            <h3 className="bio-title">Software Engineering Focus</h3>
            <p className="bio-text">
              My engineering approach centers around creating software that solves concrete problems.
              Whether implementing real-time IoT device state updates in Flutter, rendering route polylines on Google Maps, or building REST backend endpoints with Node.js, I emphasize clean architecture, maintainable code, and responsive user interfaces.
            </p>
            <p className="bio-text">
              Currently interning as a Software Trainee at <strong>Anvya AI Pvt. Ltd.</strong>, I actively build production features, refine state management workflows, and integrate RESTful APIs.
            </p>
            
            <div className="bio-tech-row">
              <span className="tech-badge cyan">Flutter</span>
              <span className="tech-badge blue">React.js</span>
              <span className="tech-badge emerald">Node.js / Express</span>
              <span className="tech-badge violet">Firebase / Firestore</span>
              <span className="tech-badge blue">MongoDB</span>
              <span className="tech-badge cyan">AI / MCP</span>
            </div>
          </div>

          {/* Right Core Pillars Grid */}
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <div key={pillar.number} className="pillar-card card-base">
                <div className="pillar-top">
                  <span className="pillar-num">{pillar.number}</span>
                  <span className="tech-badge">{pillar.tag}</span>
                </div>
                <h4 className="pillar-title">{pillar.title}</h4>
                <p className="pillar-desc">{pillar.description}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
