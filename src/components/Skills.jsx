import React from 'react';
import { skillCategories } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="section-padding section-divider">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">04 / Technical Capabilities</span>
          <h2 className="section-title">Technologies & Engineering Toolkit</h2>
          <p className="section-subtitle">
            Categorized technical skills based on practical application across mobile apps, full-stack web platforms, and AI tooling.
          </p>
        </div>

        <div className="skills-grid">
          {skillCategories.map((group, idx) => (
            <div key={idx} className="skill-category-card card-base">
              
              <div className="category-header">
                <span className="category-num">0{idx + 1}</span>
                <div>
                  <h3 className="category-title">{group.category}</h3>
                  <p className="category-desc">{group.description}</p>
                </div>
              </div>

              <div className="skills-badge-wrap">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-item-tag">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level-pill">{skill.level}</span>
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
