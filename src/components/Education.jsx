import React from 'react';
import { personalInfo, courseworkList } from '../data/portfolioData';

export default function Education() {
  const edu = personalInfo.education;

  return (
    <section id="education" className="section-padding section-divider">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">05 / Education & Foundations</span>
          <h2 className="section-title">Academic Background</h2>
          <p className="section-subtitle">
            Solid CS foundation grounded in core computer science theory, algorithms, and software design principles.
          </p>
        </div>

        <div className="education-card card-base">
          <div className="edu-card-grid">
            
            <div className="edu-icon-badge">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--accent-blue)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c2 2 10 2 12 0v-5"/><path d="M22 10v6"/></svg>
            </div>

            <div className="edu-main-info">
              <div className="edu-top-row">
                <span className="tech-badge blue">{edu.period}</span>
                <span className="edu-location-text">{edu.location}</span>
              </div>

              <h3 className="edu-degree">{edu.degree}</h3>
              <p className="edu-institution">
                <strong>{edu.institution}</strong> • Affiliated with {edu.affiliation}
              </p>

              <div className="coursework-container">
                <span className="coursework-label">RELEVANT COURSEWORK & FOUNDATIONS:</span>
                <div className="coursework-pills-row">
                  {courseworkList.map((course) => (
                    <span key={course} className="tech-badge">{course}</span>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
