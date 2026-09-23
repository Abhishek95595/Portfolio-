export const personalInfo = {
  name: "Abhishek Verma",
  role: "Software Engineer",
  tagline: "Software Engineering • Flutter • Full-Stack • AI",
  headline: "Software Engineer building modern mobile, web & AI-powered products.",
  bio: "Computer Science undergraduate with practical experience across mobile application development, full-stack web platforms, and AI integrations. Specializing in Flutter, React, MERN stack, REST APIs, and Cloud services.",
  location: "Gorakhpur, Uttar Pradesh, India",
  email: "100abhisheksarraf@gmail.com",
  phone: "+91 95595 76338",
  github: "https://github.com/Abhishek95595",
  linkedin: "https://www.linkedin.com/in/abhishek-verma-95595a/",
  availability: "Available for software engineering opportunities",
  education: {
    institution: "ABES Engineering College",
    affiliation: "AKTU",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2023 — 2027",
    location: "Ghaziabad, Uttar Pradesh"
  }
};

export const featuredProjects = [
  {
    id: "hasomi",
    number: "01",
    featured: true,
    title: "Hasomi / Smart Homez",
    subtitle: "IoT Smart Home Management Mobile Application",
    type: "Mobile App • IoT Platform",
    period: "July 2026 — Present",
    badge: "Primary Featured Project",
    summary: "Production-grade Flutter mobile application engineered to monitor and manage IoT smart home hardware, floor/room hierarchies, device states, energy consumption, and safety automation alerts.",
    description: "Hasomi is an intuitive mobile platform built for comprehensive smart home control. It abstracts complex device telemetries into a structured user interface, enabling real-time monitoring of power, water, climate control, and emergency safety triggers across custom property structures.",
    technologies: ["Flutter", "Dart", "IoT Protocol Integrations", "REST APIs", "Firebase Auth", "Real-Time Data Sync", "State Management"],
    architecture: [
      { layer: "Presentation", detail: "Custom responsive Flutter UI widgets, floor plan viewports, device control cards" },
      { layer: "State & Logic", detail: "Reactive state management handling real-time telemetry streams and device state transitions" },
      { layer: "Services", detail: "RESTful API client, Firebase Authentication, web-socket data observers" },
      { layer: "Hardware Integration", detail: "IoT payload parser handling fire/smoke alarm triggers, room telemetry, and device power toggles" }
    ],
    features: [
      "Multi-property hierarchy (Property -> Floor -> Room -> Device management)",
      "Real-time sensor monitoring (Fire, smoke, temperature, and emergency alerts)",
      "Role-based access control and secure Firebase authentication",
      "Modular, responsive Flutter component library built for Android deployment"
    ],
    github: "https://github.com/Abhishek95595",
    demo: null,
    previewVisual: "iot-dashboard"
  },
  {
    id: "ago-ridemate",
    number: "02",
    featured: false,
    title: "AGo / RideMate",
    subtitle: "Smart Ride Sharing & Carpooling Mobile Application",
    type: "Mobile App • Location Services",
    period: "June 2026 — August 2026",
    badge: "Mobile Application",
    summary: "Flutter mobile application for ride creation, discovery, seat booking, route rendering, and real-time location tracking via Google Maps.",
    description: "AGo facilitates intra-city and inter-city carpooling and bike rides. It integrates Google Maps SDK for precise path drawing, geocoding, and driver/passenger route visualization.",
    technologies: ["Flutter", "Google Maps SDK", "Firebase", "Cloud Firestore", "REST APIs", "Location Services"],
    architecture: [
      { layer: "Mapping", detail: "Google Maps SDK integration with dynamic route polyline rendering and live markers" },
      { layer: "Data Layer", detail: "Cloud Firestore real-time collections for ride offers, seat bookings, and status updates" },
      { layer: "Backend", detail: "Firebase Authentication and Node.js REST API endpoints for booking operations" }
    ],
    features: [
      "Car and bike ride offer creation and discovery",
      "Interactive map route visualization and location search",
      "Seat reservation management, ride history, and ride completion flows",
      "In-app communication triggers and notification handlers"
    ],
    github: "https://github.com/Abhishek95595",
    demo: null,
    previewVisual: "maps-navigation"
  },
  {
    id: "virtual-assistant",
    number: "03",
    featured: false,
    title: "MERN AI Voice Assistant",
    subtitle: "Full-Stack AI Voice Assistant & Automation Web Platform",
    type: "Full-Stack • Web AI",
    period: "Present",
    badge: "Full-Stack Web & AI",
    summary: "Full-stack web platform providing voice-controlled automation, real-time speech recognition, text-to-speech feedback, site navigation, and query history persistence.",
    description: "An intelligent web assistant combining web speech APIs with a MERN architecture. Users issue spoken commands to search the web, trigger automated browser tasks, and review historical queries.",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Web Speech API", "REST APIs"],
    architecture: [
      { layer: "Frontend", detail: "React SPA with speech recognition hooks, dynamic voice wave visualizer, and command logs" },
      { layer: "API Gateway", detail: "Express.js REST router handling command analysis and task dispatching" },
      { layer: "Database", detail: "MongoDB collections storing user sessions, interaction history, and command preferences" }
    ],
    features: [
      "Hands-free speech-to-text input and natural text-to-speech audio output",
      "Automated web search and browser task dispatching",
      "RESTful backend API built with Express and Node.js",
      "MongoDB query history logger with search and filter capabilities"
    ],
    github: "https://github.com/Abhishek95595",
    demo: null,
    previewVisual: "voice-terminal"
  }
];

export const experienceData = [
  {
    role: "Software Trainee (Engineering Intern)",
    company: "Anvya AI Pvt. Ltd.",
    location: "Dadri, Uttar Pradesh, India",
    period: "June 2026 — Present",
    status: "CURRENT ROLE",
    highlights: [
      "Developing production Flutter mobile application features, responsive UI layouts, and secure authentication flows.",
      "Integrating RESTful backend APIs and optimizing application performance across varied Android hardware.",
      "Participating in engineering code reviews, adopting modular software architecture, and maintaining version control via Git."
    ],
    technologies: ["Flutter", "Dart", "REST APIs", "Git", "Mobile UI", "Performance Optimization"]
  }
];

export const skillCategories = [
  {
    category: "Languages & Core CS",
    description: "Foundational computer science, algorithms, and core languages",
    skills: [
      { name: "Java", level: "Core" },
      { name: "Python", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "C / C++", level: "Core" },
      { name: "Data Structures & Algorithms", level: "Concept" },
      { name: "Object-Oriented Programming (OOP)", level: "Concept" },
      { name: "System Design Concepts", level: "Concept" }
    ]
  },
  {
    category: "Mobile & Frontend",
    description: "Cross-platform mobile apps and responsive web interfaces",
    skills: [
      { name: "Flutter", level: "Primary" },
      { name: "Dart", level: "Primary" },
      { name: "React.js", level: "Primary" },
      { name: "HTML5 / CSS3", level: "Primary" },
      { name: "Responsive Design System", level: "Primary" },
      { name: "State Management", level: "Primary" }
    ]
  },
  {
    category: "Backend & Databases",
    description: "Server architecture, APIs, and data storage solutions",
    skills: [
      { name: "Node.js", level: "Backend" },
      { name: "Express.js", level: "Backend" },
      { name: "Firebase Auth", level: "Backend" },
      { name: "Cloud Firestore", level: "Backend" },
      { name: "MongoDB", level: "Database" },
      { name: "RESTful API Design", level: "Architecture" },
      { name: "Google Maps SDK Integrations", level: "Services" }
    ]
  },
  {
    category: "AI & Emerging Technologies",
    description: "GenAI tooling, model context protocols, and smart systems",
    skills: [
      { name: "AI / Machine Learning Concepts", level: "AI" },
      { name: "Generative AI", level: "AI" },
      { name: "LLM Prompting", level: "AI" },
      { name: "Model Context Protocol (MCP)", level: "Tooling" },
      { name: "AI Task Automation", level: "Workflow" }
    ]
  },
  {
    category: "Tools & Environment",
    description: "Developer tooling, version control, and platforms",
    skills: [
      { name: "Git & GitHub", level: "Tool" },
      { name: "Android Studio", level: "IDE" },
      { name: "VS Code / Antigravity IDE", level: "IDE" },
      { name: "Postman", level: "Testing" },
      { name: "Docker (Basics)", level: "DevOps" }
    ]
  }
];

export const courseworkList = [
  "Data Structures & Algorithms",
  "Object-Oriented Programming",
  "Database Management Systems (DBMS)",
  "Operating Systems",
  "Computer Networks",
  "Software Engineering Principles",
  "Artificial Intelligence & ML",
  "System Design Concepts"
];
