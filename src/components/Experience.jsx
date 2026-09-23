import React from 'react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section-padding section-divider">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">02 / Experience</span>
          <h2 className="section-title">Where I'm building.</h2>
          <p className="section-subtitle">
            Professional software engineering experience focusing on mobile app features, REST integrations, and clean code practices.
          </p>
        </div>

        <div className="experience-list">
          {experienceData.map((exp, idx) => (
            <div key={idx} className="experience-card card-base">
              <div className="experience-header-row">
                <div className="exp-title-meta">
                  <h3 className="exp-role">{exp.role}</h3>
                  <div className="exp-company-info">
                    <span className="exp-company">{exp.company}</span>
                    <span className="dot-sep">•</span>
                    <span className="exp-location">{exp.location}</span>
                  </div>
                </div>

                <div className="exp-badge-period">
                  <span className="status-badge-current">{exp.status}</span>
                  <span className="exp-period-text">{exp.period}</span>
                </div>
              </div>

              <div className="experience-body">
                <ul className="exp-bullets">
                  {exp.highlights.map((bullet, bIdx) => (
                    <li key={bIdx} className="exp-bullet-item">
                      <span className="bullet-icon">▸</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="exp-tags-row">
                  {exp.technologies.map((tech) => (
                    <span key={tech} className="tech-badge blue">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
