/**
 * PROJECT REPOSITORY & CASE STUDIES
 * 
 * HOW TO ADD YOUR IMAGES:
 * 1. Place your project image file inside `public/projects/`.
 * 2. Set the `image` field below to `"/projects/your-image-name.png"`.
 */

export const projects = [
  {
    id: "mind-sense",
    number: "01",
    year: "2024",
    category: "AI & Machine Learning",
    featured: true,
    name: "MindSense",
    tagline: "Intelligent mental health detection & prediction platform",
    image: "/projects/mind-sense.png",
    imageAlt: "MindSense mental health detection application interface",
    problem: "Mental health screening is frequently slow to access, intimidating, and rarely available before a clinical crisis point. Most individuals never receive a structured initial assessment.",
    build: "A cross-platform Flutter application pairing mood analytics and standardized psychological assessments with an NLP-powered conversational assistant. User inputs feed trained XGBoost classification models that detect potential ADHD, depression, anxiety, and bipolar indicators with calibrated risk metrics.",
    architecture: "Flutter Client → Firebase Authentication & Cloud Firestore → Python ML Inference Service (FastAPI / XGBoost) → Automated retraining pipeline on anonymized datasets.",
    tech: ["Flutter", "Python", "XGBoost", "NLP", "Firebase", "Machine Learning"],
    whatBroke: {
      problem: "Balancing model recall against false positives — in mental health risk screening, a false negative is substantially more critical than a cautious alert.",
      response: "Conducted precision threshold tuning and rewritten clinical assessment dialogs to maintain high predictive sensitivity without generating alarm.",
    },
    links: { demo: null, github: null },
  },
  {
    id: "clinic-saas",
    number: "02",
    year: "2025",
    category: "Enterprise SaaS",
    featured: true,
    name: "ClinicOS",
    tagline: "Multi-tenant medical clinic management platform",
    image: "/projects/clinic-saas.png",
    imageAlt: "ClinicOS multi-tenant clinical dashboard",
    problem: "Independent healthcare practices require enterprise-level clinical scheduling, patient records, and billing without costly infrastructure, demanding absolute tenant data isolation.",
    build: "An end-to-end .NET and React platform enforcing strict tenant boundary isolation at the database layer. Features real-time appointment dispatching, patient charts, and staff synchronization powered by SignalR.",
    architecture: "React SPA → ASP.NET Core REST API with Multi-Tenant Middleware → SQL Server (Row-Level Security & Schema Isolation) → SignalR Hub for real-time live events.",
    tech: [".NET", "React", "SQL Server", "SignalR", "C#", "REST API"],
    whatBroke: {
      problem: "Preventing cross-tenant data leakage across cache layers, real-time message streams, and background jobs with zero tolerance for session bleeding.",
      response: "Engineered tenant-scoped middleware interceptors, dynamic EF Core query filters, and tenant-keyed SignalR connection channels.",
    },
    links: { demo: null, github: null },
  },
  {
    id: "ayounk",
    number: "03",
    year: "2024",
    category: "Architecture & Construction",
    featured: true,
    name: "Ayonk Designs",
    tagline: "Corporate platform for interior design, finishing works & construction",
    image: "/projects/ayounk.png",
    imageAlt: "Ayonk Designs architecture, finishing and construction company website",
    problem: "Ayonk required a modern, bilingual (English & Arabic) digital corporate presence to showcase luxury interior design, finishing works, facade engineering, and construction services with dynamic quote requests.",
    build: "A high-performance responsive web platform presenting comprehensive service lines (Finishing Works, Interior Design, Construction, Facades, Project Management), project case studies, client testimonials, and consultation inquiry workflows with seamless RTL support.",
    architecture: "React SPA → REST API with structured service endpoints, bilingual localization system (EN/AR), and optimized image delivery pipelines.",
    tech: ["React", "JavaScript", "Tailwind CSS", "REST API", "Bilingual / RTL"],
    whatBroke: {
      problem: "Delivering dynamic bilingual layout switching (Arabic RTL and English LTR) while preserving exact grid alignments and typography hierarchy across complex service cards.",
      response: "Architected complete CSS logical properties layout and modular direction-aware components that seamlessly adapt without layout reflows.",
    },
    links: {
      demo: "https://ayonkdesigns.com/",
      github: "https://github.com/AbdelrahmanHussin1/Ayonk-Website",
    },
  },
  {
    id: "restaurant-os",
    number: "04",
    year: "2023",
    category: "Hospitality & POS",
    featured: false,
    name: "Restaurant OS",
    tagline: "High-speed restaurant management & kitchen ordering system",
    image: "/projects/restaurant-os.png",
    imageAlt: "Restaurant OS point-of-sale interface",
    problem: "Hospitality venues needed an agile point-of-sale and kitchen order system with native Arabic RTL support and hardware receipt printing without high monthly SaaS costs.",
    build: "A responsive React interface coupled with a high-concurrency Node.js backend. Manages dynamic menus, table layouts, live kitchen order tickets, and hardware thermal receipt printing.",
    architecture: "React Frontend → Node.js / Express API → Relational Database Engine with local Hardware ESC/POS Print Bridge.",
    tech: ["React", "Node.js", "Express", "Tailwind CSS", "ESC/POS"],
    whatBroke: {
      problem: "Bi-directional RTL/LTR text mixed with physical thermal printer drivers caused character corruption and alignment failure on paper receipts.",
      response: "Implemented CSS logical formatting throughout the UI and developed a custom UTF-8 text encoder and rasterizer for thermal printing hardware.",
    },
    links: {
      demo: null,
      github: "https://github.com/AbdelrahmanHussin1/Restaurant-Management-System",
    },
  },
  {
    id: "sysora",
    number: "05",
    year: "2024",
    category: "Web Engineering",
    featured: true,
    name: "Sysora Platform",
    tagline: "Modern production-grade corporate & product platform",
    image: "/projects/sysora.png",
    imageAlt: "Sysora digital platform homepage preview",
    problem: "The brand required a digital presence that combined refined editorial aesthetics and fluid motion without sacrificing mobile performance or SEO benchmarks.",
    build: "A performance-tuned React and Vite web platform utilizing Tailwind CSS and GSAP animations, optimized for 60fps transitions and sub-second load times.",
    architecture: "React + Vite Client → Tailwind CSS Token System → GSAP & ScrollTrigger Animation Engine → Static Edge CDN.",
    tech: ["React", "Tailwind CSS", "GSAP", "Vite", "Responsive Design"],
    whatBroke: {
      problem: "Complex scroll-triggered parallax effects caused GPU memory spikes and frame drops on mid-tier mobile browsers.",
      response: "Re-architected animations using composite-only properties (`transform`, `opacity`), isolated rendering layers, and added automatic low-power device fallbacks.",
    },
    links: { demo: "https://sysoraeg.com/", github: null },
  },
];

export const getProjectById = (id) => projects.find((p) => p.id === id);
