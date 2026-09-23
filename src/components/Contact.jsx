import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e) => {
    navigator.clipboard?.writeText(personalInfo.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }).catch(() => {
      // Fallback is default mailto link navigation
    });
  };

  return (
    <section id="contact" className="section-padding section-divider contact-section">
      <div className="container">
        
        <div className="contact-card card-base">
          <div className="contact-card-inner">
            <span className="section-tag">06 / Get In Touch</span>
            <h2 className="contact-headline">Let's build something worth shipping.</h2>
            <p className="contact-lead">
              Interested in software engineering roles, Flutter/mobile development, full-stack systems, or AI integration? Feel free to reach out.
            </p>

            <div className="contact-buttons-grid">
              
              <div className="contact-email-btn-group">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn btn-primary btn-lg"
                  aria-label={`Send email to ${personalInfo.email}`}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                  <span>{personalInfo.email}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="btn btn-secondary btn-lg copy-btn"
                  aria-label="Copy email address to clipboard"
                  title="Copy email to clipboard"
                >
                  {copiedEmail ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent-emerald)" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                      <span style={{ color: 'var(--accent-emerald)' }}>Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <a
                href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                className="btn btn-secondary btn-lg"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.28-1.28a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z"/></svg>
                <span>{personalInfo.phone}</span>
              </a>

            </div>

            <div className="contact-social-row">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span>GitHub Profile ↗</span>
              </a>

              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-item"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LinkedIn Profile ↗</span>
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
