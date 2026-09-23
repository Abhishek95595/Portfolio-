import React from 'react';

export default function NotFound() {
  const handleBackHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="not-found-wrapper">
      <div className="bg-grid-pattern" aria-hidden="true"></div>
      <div className="container not-found-container">
        <div className="not-found-card card-base">
          <div className="not-found-badge">
            <span className="tech-badge cyan">404 ERROR</span>
          </div>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-desc">
            The page you are looking for does not exist or has been moved.
          </p>
          <div className="not-found-actions">
            <button onClick={handleBackHome} className="btn btn-primary">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              <span>Back to Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
