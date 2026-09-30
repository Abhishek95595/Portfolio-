import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', botcheck: false });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    if (formData.botcheck) return;

    setStatus('loading');
    const apiKey = import.meta.env.VITE_WEB3FORMS_KEY;

    if (!apiKey) {
      setTimeout(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', botcheck: false });
      }, 1000);
      return;
    }

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: apiKey,
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          subject: `Portfolio Contact Message from ${formData.name.trim()}`,
          from_name: 'Abhishek Verma Portfolio',
        }),
      });

      const resData = await response.json();
      if (resData.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '', botcheck: false });
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(personalInfo.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }).catch(() => {});
  };

  return (
    <section id="contact" className="section-padding section-divider contact-section">
      <div className="container">
        
        <div className="contact-card card-base">
          <div className="contact-card-inner">
            <span className="section-tag">06 / Get In Touch</span>
            <h2 className="contact-headline">Let's build something worth shipping.</h2>
            <p className="contact-lead">
              Interested in software engineering roles, Flutter/mobile development, full-stack systems, or AI integration? Send a direct message below.
            </p>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <input
                type="checkbox"
                name="botcheck"
                style={{ display: 'none' }}
                checked={formData.botcheck}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />

              {status === 'success' && (
                <div className="form-status-banner success" role="alert">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                  <span>Thank you! Your message has been received. I'll respond shortly.</span>
                </div>
              )}

              {status === 'error' && (
                <div className="form-status-banner error" role="alert">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span>An error occurred while sending your message. Please try again or use direct email.</span>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="contact-name" className="form-label">Your Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    name="name"
                    className={`form-input ${errors.name ? 'invalid' : ''}`}
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Alex Smith"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                  />
                  {errors.name && (
                    <span id="name-error" className="form-error-msg" aria-live="polite">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">Email Address</label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    className={`form-input ${errors.email ? 'invalid' : ''}`}
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alex@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <span id="email-error" className="form-error-msg" aria-live="polite">
                      {errors.email}
                    </span>
                  )}
                </div>
              </div>

              <div className="form-group margin-top-md">
                <label htmlFor="contact-message" className="form-label">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="4"
                  className={`form-textarea ${errors.message ? 'invalid' : ''}`}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project, team, or opportunity..."
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && (
                  <span id="message-error" className="form-error-msg" aria-live="polite">
                    {errors.message}
                  </span>
                )}
              </div>

              <div className="form-actions">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-full-mobile"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <span className="spinner-icon" aria-hidden="true" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <div className="contact-divider-row">
              <span className="divider-line" />
              <span className="divider-text">OR DIRECT CONTACT</span>
              <span className="divider-line" />
            </div>

            <div className="contact-buttons-grid">
              <div className="contact-email-btn-group">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="btn btn-secondary btn-lg"
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
