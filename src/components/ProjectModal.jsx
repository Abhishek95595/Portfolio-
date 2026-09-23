import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
      <div className="modal-content card-base" onClick={(e) => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div className="modal-header">
          <div className="modal-type-badge">
            <span className="tech-badge cyan">{project.type}</span>
            <span className="modal-period">{project.period}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close project details">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        <h2 id="project-modal-title" className="modal-title">{project.title}</h2>
        <p className="modal-subtitle">{project.subtitle}</p>

        {/* Modal Body */}
        <div className="modal-body-scroll">
          <div className="modal-section">
            <h4 className="modal-sec-title">Overview</h4>
            <p className="modal-text">{project.description}</p>
          </div>

          {/* Architecture Breakdown */}
          {project.architecture && (
            <div className="modal-section">
              <h4 className="modal-sec-title">Engineering Architecture</h4>
              <div className="arch-layers-grid">
                {project.architecture.map((arch, i) => (
                  <div key={i} className="arch-layer-item">
                    <span className="arch-layer-name">{arch.layer}</span>
                    <span className="arch-layer-detail">{arch.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          <div className="modal-section">
            <h4 className="modal-sec-title">Key Capabilities & Features</h4>
            <ul className="modal-feature-list">
              {project.features.map((feat, i) => (
                <li key={i} className="modal-feature-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div className="modal-section">
            <h4 className="modal-sec-title">Technology Stack</h4>
            <div className="modal-tech-tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-badge blue">{tech}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary btn-sm"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span>View Repository</span>
            </a>
          )}
          <button className="btn btn-primary btn-sm" onClick={onClose}>
            Done
          </button>
        </div>

      </div>
    </div>
  );
}
