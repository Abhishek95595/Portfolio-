import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

const projects = [
  {
    number: "01",
    title: "Smart Homez",
    subtitle: "IoT Smart Home Management Application",
    period: "July 2026 — Present",
    description:
      "Flutter IoT application for monitoring and controlling homes, rooms, devices, energy, water, safety systems, and automations.",
    tags: ["Flutter", "IoT", "REST APIs", "Firebase Auth", "Real-time Data"],
    details: [
      "Property, floor, room, and device management",
      "Client dashboards and fire/smoke alerts",
      "Role-based access control and secure authentication",
      "Reusable responsive UI components"
    ]
  },
  {
    number: "02",
    title: "AGo",
    subtitle: "Smart Ride Sharing & Carpooling App",
    period: "June 2026 — August 2026",
    description:
      "Flutter mobile application for ride creation, ride discovery, seat booking, route visualization, and real-time Google Maps tracking.",
    tags: ["Flutter", "Firebase", "Firestore", "Google Maps", "Backend APIs"],
    details: [
      "Car and bike ride support",
      "Chat, notifications, ride history, and completion",
      "Location services and route visualization",
      "Android deployment and responsive UI/UX"
    ]
  },
  {
    number: "03",
    title: "Virtual Assistant",
    subtitle: "MERN Stack / AI Voice Assistant",
    period: "Present",
    description:
      "Full-stack AI voice assistant with speech recognition, text-to-speech, browser tasks, web search/site navigation, and query history.",
    tags: ["React", "Node.js", "Express.js", "MongoDB", "AI"],
    details: [
      "Speech recognition and text-to-speech",
      "Browser task and web-navigation capabilities",
      "REST APIs using Node.js and Express.js",
      "MongoDB-backed query history"
    ]
  }
];

const skillGroups = [
  {
    title: "Programming",
    items: ["Java", "Python", "JavaScript", "DSA", "OOP", "System Design", "Problem Solving"]
  },
  {
    title: "Development",
    items: ["Flutter", "React", "MERN", "Web Development", "REST APIs", "Responsive UI/UX"]
  },
  {
    title: "Backend & Platform",
    items: ["Firebase Authentication", "Cloud Firestore", "Google Maps", "MongoDB", "Node.js", "Express.js", "Git", "GitHub"]
  },
  {
    title: "AI & Emerging Tech",
    items: ["Machine Learning", "Artificial Intelligence", "LLMs", "Generative AI", "AI Automation", "MCP"]
  }
];

function Icon({ name, size = 18 }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true
  };

  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.8 19.8 0 0 1 3.1 5.18 2 2 0 0 1 5.1 3h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L9 10.73a16 16 0 0 0 4.27 4.27l1.28-1.28a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z"/></>,
    external: <><path d="M14 3h7v7"/><path d="M10 14 21 3"/><path d="M21 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5"/></>,
    menu: <><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></>,
    close: <><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    code: <><path d="m8 9-4 3 4 3"/><path d="m16 9 4 3-4 3"/><path d="m14 5-4 14"/></>,
    briefcase: <><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M3 12h18"/><path d="M10 12v2h4v-2"/></>,
    graduation: <><path d="m2 10 10-5 10 5-10 5-10-5Z"/><path d="M6 12v5c2 2 10 2 12 0v-5"/><path d="M22 10v6"/></>,
    location: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    check: <path d="m5 12 4 4L19 6"/>
  };

  return <svg {...common}>{paths[name]}</svg>;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <div className="noise" aria-hidden="true" />

      <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <a className="brand" href="#top" onClick={closeMenu}>
          <span className="brand-mark">AV</span>
          <span>Abhishek Verma</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#education" onClick={closeMenu}>Education</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact <Icon name="arrow" size={15} /></a>
        </nav>

        <button
          className="menu-button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(v => !v)}
        >
          <Icon name={menuOpen ? "close" : "menu"} />
        </button>
      </header>

      <main id="top">
        <section className="hero section-pad">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> SOFTWARE ENGINEERING · FLUTTER · FULL-STACK</div>
            <h1>
              Building digital
              <span> products with purpose.</span>
            </h1>
            <p className="hero-lead">
              I’m Abhishek Verma, a CS undergraduate focused on software engineering,
              Flutter & mobile development, full-stack applications, and AI/ML systems.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#projects">Explore my work <Icon name="arrow" size={16} /></a>
              <a className="button button-ghost" href="mailto:100abhisheksarraf@gmail.com">Get in touch <Icon name="mail" size={16} /></a>
            </div>
            <div className="hero-meta">
              <span><Icon name="location" size={15} /> Gorakhpur, Uttar Pradesh</span>
              <span><i /> Available for software engineering opportunities</span>
            </div>
          </div>

          <div className="hero-console" aria-label="Technology focus">
            <div className="console-top">
              <span className="window-dots"><i /><i /><i /></span>
              <span>developer.profile</span>
              <span>01</span>
            </div>
            <div className="console-body">
              <div className="code-line"><b>01</b><span><em>const</em> profile = &#123;</span></div>
              <div className="code-line indent"><b>02</b><span>focus: <strong>"Software Engineering"</strong>,</span></div>
              <div className="code-line indent"><b>03</b><span>mobile: <strong>"Flutter"</strong>,</span></div>
              <div className="code-line indent"><b>04</b><span>stack: <strong>"MERN"</strong>,</span></div>
              <div className="code-line indent"><b>05</b><span>interests: [</span></div>
              <div className="code-line double-indent"><b>06</b><span><strong>"AI"</strong>, <strong>"GenAI"</strong>, <strong>"Automation"</strong></span></div>
              <div className="code-line indent"><b>07</b><span>],</span></div>
              <div className="code-line"><b>08</b><span>&#125;;</span></div>
              <div className="console-cursor">_</div>
            </div>
          </div>
        </section>

        <section id="about" className="section-pad section-border">
          <div className="section-heading">
            <span className="section-index">01 / ABOUT</span>
            <h2>Engineering with a<br /><span>product mindset.</span></h2>
          </div>
          <div className="about-layout">
            <div className="about-copy">
              <p className="large-copy">
                I’m a Computer Science undergraduate at ABES Engineering College (AKTU),
                graduating in 2027, with hands-on experience across mobile, full-stack,
                and AI-focused development.
              </p>
              <p>
                My work spans production Flutter application features, responsive UI,
                authentication flows, REST API integrations, backend services, cloud
                data, maps, and AI-enabled experiences.
              </p>
            </div>
            <div className="about-facts">
              <div className="fact"><span>01</span><strong>Mobile</strong><small>Flutter & Android</small></div>
              <div className="fact"><span>02</span><strong>Full-Stack</strong><small>MERN & REST APIs</small></div>
              <div className="fact"><span>03</span><strong>AI / ML</strong><small>LLMs & GenAI</small></div>
              <div className="fact"><span>04</span><strong>Engineering</strong><small>DSA & System Design</small></div>
            </div>
          </div>
        </section>

        <section id="experience" className="section-pad section-border">
          <div className="section-heading compact">
            <span className="section-index">02 / EXPERIENCE</span>
            <h2>Where I’m <span>building.</span></h2>
          </div>
          <article className="experience-card">
            <div className="experience-date">JUNE 2026 — PRESENT</div>
            <div className="experience-main">
              <div className="experience-title-row">
                <div>
                  <h3>Software Trainee <span>(Engineering Intern)</span></h3>
                  <p>Anvya AI Pvt. Ltd. · Dadri, Uttar Pradesh</p>
                </div>
                <span className="current-pill">CURRENT</span>
              </div>
              <div className="experience-grid">
                <div><span>01</span><p>Developing production Flutter application features, responsive UI components, authentication flows, and REST API integrations.</p></div>
                <div><span>02</span><p>Testing and improving application functionality while addressing functional and performance issues.</p></div>
                <div><span>03</span><p>Collaborating with engineering workflows using coding standards, Git, version control, and scalable architecture.</p></div>
              </div>
            </div>
          </article>
        </section>

        <section id="projects" className="section-pad section-border">
          <div className="section-heading">
            <span className="section-index">03 / SELECTED WORK</span>
            <h2>Projects that turn<br /><span>ideas into software.</span></h2>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-top">
                  <span className="project-number">{project.number}</span>
                  <span className="project-period">{project.period}</span>
                </div>
                <div className="project-icon"><Icon name="code" size={21} /></div>
                <h3>{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>
                <div className="tag-list">
                  {project.tags.map(tag => <span key={tag}>{tag}</span>)}
                </div>
                <button className="text-button" onClick={() => setActiveProject(project)}>
                  View project details <Icon name="arrow" size={15} />
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section-pad section-border">
          <div className="section-heading compact">
            <span className="section-index">04 / TOOLKIT</span>
            <h2>Technologies I <span>work with.</span></h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map(group => (
              <div className="skill-group" key={group.title}>
                <h3>{group.title}</h3>
                <div className="skill-items">
                  {group.items.map(item => <span key={item}>{item}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="section-pad section-border">
          <div className="section-heading compact">
            <span className="section-index">05 / EDUCATION</span>
            <h2>Building the <span>foundation.</span></h2>
          </div>
          <div className="education-card">
            <div className="edu-icon"><Icon name="graduation" size={25} /></div>
            <div className="edu-content">
              <span className="edu-period">OCTOBER 2023 — PRESENT</span>
              <h3>B.Tech — Computer Science & Engineering</h3>
              <p>ABES Engineering College · AKTU · Ghaziabad, Uttar Pradesh</p>
              <div className="coursework">
                <span>DSA</span><span>OOP</span><span>DBMS</span><span>OS</span><span>Computer Networks</span>
                <span>AI</span><span>ML</span><span>Cloud Computing</span><span>System Design</span>
              </div>
            </div>
            <div className="edu-year">2027</div>
          </div>
        </section>

        <section id="contact" className="contact-section section-pad">
          <div className="contact-glow" aria-hidden="true" />
          <div className="contact-content">
            <span className="section-index">06 / CONTACT</span>
            <h2>Let’s build something<br /><span>worth shipping.</span></h2>
            <p>
              Interested in software engineering, mobile development, full-stack systems,
              or AI-enabled products? Get in touch.
            </p>
            <div className="contact-actions">
              <a className="button button-primary large" href="mailto:100abhisheksarraf@gmail.com">
                <Icon name="mail" size={17} /> 100abhisheksarraf@gmail.com
              </a>
              <a className="button button-ghost large" href="tel:+919559576338">
                <Icon name="phone" size={17} /> +91 95595 76338
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          <a className="brand" href="#top"><span className="brand-mark">AV</span><span>Abhishek Verma</span></a>
          <p>Software Engineering · Flutter · Full-Stack</p>
        </div>
        <div className="footer-links">
          <span>Gorakhpur, Uttar Pradesh</span>
          <a href="mailto:100abhisheksarraf@gmail.com">Email</a>
          <button type="button" className="placeholder-link" title="Add your real LinkedIn URL before deployment">LinkedIn ↗</button>
          <button type="button" className="placeholder-link" title="Add your real GitHub URL before deployment">GitHub ↗</button>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Abhishek Verma</span>
          <span>Built with React + Vite</span>
        </div>
      </footer>

      {activeProject && (
        <div className="modal-backdrop" role="presentation" onMouseDown={() => setActiveProject(null)}>
          <div className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onMouseDown={e => e.stopPropagation()}>
            <button className="modal-close" aria-label="Close project details" onClick={() => setActiveProject(null)}><Icon name="close" /></button>
            <span className="section-index">{activeProject.number} / PROJECT</span>
            <h2 id="modal-title">{activeProject.title}</h2>
            <p className="modal-subtitle">{activeProject.subtitle}</p>
            <p>{activeProject.description}</p>
            <div className="modal-details">
              {activeProject.details.map(detail => <div key={detail}><Icon name="check" size={17} /><span>{detail}</span></div>)}
            </div>
            <div className="tag-list">{activeProject.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      )}
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode><App /></React.StrictMode>
);
