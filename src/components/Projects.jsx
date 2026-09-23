import React, { useState } from 'react';
import { featuredProjects } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Interactive state for Hasomi demo
  const [hasomiDevices, setHasomiDevices] = useState({
    livingRoomLights: true,
    acClimate: true,
    smokeSensor: true,
    securityLock: true,
  });

  const toggleDevice = (key) => {
    setHasomiDevices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const hasomiProject = featuredProjects.find((p) => p.id === 'hasomi');
  const agoProject = featuredProjects.find((p) => p.id === 'ago-ridemate');
  const assistantProject = featuredProjects.find((p) => p.id === 'virtual-assistant');

  return (
    <section id="projects" className="section-padding section-divider">
      <div className="container">
        
        <div className="section-header">
          <span className="section-tag">03 / Selected Engineering Work</span>
          <h2 className="section-title">Projects that turn ideas into software.</h2>
          <p className="section-subtitle">
            Mini product showcases featuring IoT platforms, mobile maps applications, and full-stack AI assistants.
          </p>
        </div>

        {/* 1. PRIMARY FEATURED PROJECT: HASOMI / SMART HOMEZ */}
        {hasomiProject && (
          <div className="hasomi-primary-card card-base">
            <div className="hasomi-grid-layout">
              
              {/* Left Details */}
              <div className="hasomi-info-side">
                <div className="card-top-meta">
                  <span className="featured-badge">★ PRIMARY FEATURED PROJECT</span>
                  <span className="project-period">{hasomiProject.period}</span>
                </div>

                <h3 className="hasomi-title">{hasomiProject.title}</h3>
                <p className="hasomi-subtitle">{hasomiProject.subtitle}</p>
                <p className="hasomi-summary">{hasomiProject.summary}</p>

                {/* Architecture Layers Quick-View */}
                <div className="hasomi-arch-preview">
                  <span className="arch-heading">SYSTEM ARCHITECTURE HIGHLIGHTS</span>
                  <div className="arch-pills-row">
                    <span className="arch-pill">Flutter UI Engine</span>
                    <span className="arch-pill">Firebase Auth</span>
                    <span className="arch-pill">REST Protocol Parser</span>
                    <span className="arch-pill">IoT Safety Alerts</span>
                  </div>
                </div>

                <div className="project-tech-tags">
                  {hasomiProject.technologies.map((tech) => (
                    <span key={tech} className="tech-badge cyan">{tech}</span>
                  ))}
                </div>

                <div className="card-action-row">
                  <button
                    className="btn btn-primary"
                    onClick={() => setSelectedProject(hasomiProject)}
                  >
                    <span>Explore System Details</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                  </button>
                  {hasomiProject.github && (
                    <a
                      href={hasomiProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary btn-sm"
                    >
                      GitHub Repository ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Interactive IoT Control Visualizer */}
              <div className="hasomi-visual-side">
                <div className="iot-console-mock card-base">
                  <div className="iot-header">
                    <div className="iot-header-title">
                      <span className="device-status-dot green"></span>
                      <span>HASOMI SMART HUB v2.4</span>
                    </div>
                    <span className="iot-mode">LIVE SIMULATOR</span>
                  </div>

                  <div className="iot-controls-grid">
                    
                    {/* Device 1 */}
                    <div className={`iot-device-item ${hasomiDevices.livingRoomLights ? 'active' : ''}`}>
                      <div className="device-item-top">
                        <span className="device-icon">💡</span>
                        <button
                          className={`device-switch ${hasomiDevices.livingRoomLights ? 'on' : ''}`}
                          onClick={() => toggleDevice('livingRoomLights')}
                          aria-label="Toggle Living Room Lights"
                        >
                          <span className="switch-knob"></span>
                        </button>
                      </div>
                      <span className="device-name">Living Room Lights</span>
                      <span className="device-state-text">
                        {hasomiDevices.livingRoomLights ? 'State: Active (100%)' : 'State: Powered Off'}
                      </span>
                    </div>

                    {/* Device 2 */}
                    <div className={`iot-device-item ${hasomiDevices.acClimate ? 'active' : ''}`}>
                      <div className="device-item-top">
                        <span className="device-icon">❄️</span>
                        <button
                          className={`device-switch ${hasomiDevices.acClimate ? 'on' : ''}`}
                          onClick={() => toggleDevice('acClimate')}
                          aria-label="Toggle Climate Control"
                        >
                          <span className="switch-knob"></span>
                        </button>
                      </div>
                      <span className="device-name">Climate Control</span>
                      <span className="device-state-text">
                        {hasomiDevices.acClimate ? '22°C • Auto Mode' : 'Climate Idle'}
                      </span>
                    </div>

                    {/* Device 3 */}
                    <div className={`iot-device-item ${hasomiDevices.smokeSensor ? 'active' : ''}`}>
                      <div className="device-item-top">
                        <span className="device-icon">🔥</span>
                        <button
                          className={`device-switch ${hasomiDevices.smokeSensor ? 'on' : ''}`}
                          onClick={() => toggleDevice('smokeSensor')}
                          aria-label="Toggle Smoke Alarm Sensor"
                        >
                          <span className="switch-knob"></span>
                        </button>
                      </div>
                      <span className="device-name">Smoke Safety Sensor</span>
                      <span className="device-state-text">
                        {hasomiDevices.smokeSensor ? 'Monitoring • Normal' : 'Sensor Muted'}
                      </span>
                    </div>

                    {/* Device 4 */}
                    <div className={`iot-device-item ${hasomiDevices.securityLock ? 'active' : ''}`}>
                      <div className="device-item-top">
                        <span className="device-icon">🔒</span>
                        <button
                          className={`device-switch ${hasomiDevices.securityLock ? 'on' : ''}`}
                          onClick={() => toggleDevice('securityLock')}
                          aria-label="Toggle Smart Door Lock"
                        >
                          <span className="switch-knob"></span>
                        </button>
                      </div>
                      <span className="device-name">Main Door Lock</span>
                      <span className="device-state-text">
                        {hasomiDevices.securityLock ? 'Status: Secured' : 'Status: Unlocked'}
                      </span>
                    </div>

                  </div>

                  <div className="iot-footer-status">
                    <span>Hierarchy: <strong>Home &gt; Floor 1 &gt; Living Room</strong></span>
                    <span className="telemetry-tag">Flutter UI • Live State</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* SECONDARY PROJECTS GRID (DISTINCT CARDS FOR AGO AND VIRTUAL ASSISTANT) */}
        <div className="secondary-projects-grid">
          
          {/* 2. AGO / RIDEMATE (MAPS CARD) */}
          {agoProject && (
            <div className="project-card-secondary card-base maps-theme">
              <div className="sec-card-header">
                <span className="tech-badge blue">{agoProject.type}</span>
                <span className="project-period">{agoProject.period}</span>
              </div>

              <h3 className="sec-card-title">{agoProject.title}</h3>
              <p className="sec-card-subtitle">{agoProject.subtitle}</p>
              <p className="sec-card-summary">{agoProject.summary}</p>

              {/* Map Route Visual Widget */}
              <div className="map-route-visual-mock">
                <div className="map-route-header">
                  <span className="map-pin-badge origin">A</span>
                  <span className="map-path-line"></span>
                  <span className="map-pin-badge dest">B</span>
                  <span className="map-status-text">Google Maps Route Rendered</span>
                </div>
                <div className="map-route-details">
                  <div className="map-meta-chip">
                    <span>Route Polyline</span>
                  </div>
                  <div className="map-meta-chip">
                    <span>Live Driver Marker</span>
                  </div>
                  <div className="map-meta-chip">
                    <span>Firestore Status</span>
                  </div>
                </div>
              </div>

              <div className="project-tech-tags">
                {agoProject.technologies.map((tech) => (
                  <span key={tech} className="tech-badge blue">{tech}</span>
                ))}
              </div>

              <div className="sec-card-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedProject(agoProject)}
                >
                  View Details & Architecture ↗
                </button>
              </div>
            </div>
          )}

          {/* 3. VIRTUAL ASSISTANT (WEB AI VOICE CARD) */}
          {assistantProject && (
            <div className="project-card-secondary card-base ai-theme">
              <div className="sec-card-header">
                <span className="tech-badge violet">{assistantProject.type}</span>
                <span className="project-period">{assistantProject.period}</span>
              </div>

              <h3 className="sec-card-title">{assistantProject.title}</h3>
              <p className="sec-card-subtitle">{assistantProject.subtitle}</p>
              <p className="sec-card-summary">{assistantProject.summary}</p>

              {/* Voice Terminal Visual Widget */}
              <div className="voice-terminal-mock">
                <div className="voice-term-header">
                  <span className="term-dot"></span>
                  <span className="term-title">Web Speech API + MERN Server</span>
                </div>
                <div className="voice-wave-animation">
                  <span className="wave-bar h1"></span>
                  <span className="wave-bar h3"></span>
                  <span className="wave-bar h2"></span>
                  <span className="wave-bar h4"></span>
                  <span className="wave-bar h2"></span>
                  <span className="wave-bar h3"></span>
                </div>
                <div className="voice-prompt-line">
                  <code>$ assistant --command "Search developer docs"</code>
                </div>
              </div>

              <div className="project-tech-tags">
                {assistantProject.technologies.map((tech) => (
                  <span key={tech} className="tech-badge violet">{tech}</span>
                ))}
              </div>

              <div className="sec-card-actions">
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSelectedProject(assistantProject)}
                >
                  View Details & Architecture ↗
                </button>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
