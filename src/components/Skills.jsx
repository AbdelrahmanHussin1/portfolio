import { useState, useEffect, useRef } from "react";
import { Code2, Server, Database, Cpu, CheckCircle2, ArrowRight, Layers, Terminal } from "lucide-react";
import { revealOnScroll } from "../animations/scrollAnimations";
import { skillGroups } from "../data/skills";

// Extended metadata for live inspector context
const SKILL_PROJECT_MAP = {
  React: "ClinicOS, Ayonk Designs, Sysora, Restaurant OS",
  JavaScript: "Enterprise Web Applications & Interactive SPAs",
  HTML: "Accessible & Semantic Structure across all platforms",
  CSS: "Responsive Grid, Flexbox, and CSS Logical Properties",
  "Tailwind CSS": "Ayonk Designs, Sysora Platform, ClinicOS UI",
  GSAP: "Sysora Platform, Interactive Motion & ScrollTrigger",
  "Node.js": "Restaurant OS Backend & High-concurrency APIs",
  Express: "RESTful Routing, Middleware & Auth pipelines",
  ".NET": "ClinicOS Multi-Tenant Architecture & Data Layer",
  "C#": "Object-Oriented Enterprise Systems & EF Core",
  MongoDB: "Document Modeling & Scalable NoSQL Stores",
  PostgreSQL: "Relational Schemas, Constraints & Query Tuning",
  "SQL Server": "ClinicOS Row-Level Security & Tenant Isolation",
  Firebase: "MindSense Auth, Firestore & Cloud Sync",
  Git: "Branching workflows, trunk-based delivery & GitOps",
  GitHub: "CI/CD Actions, Code Review & Repository Architecture",
  "REST APIs": "Clean Contract Architecture, DTOs & Validation",
  SignalR: "ClinicOS Live Clinic Dispatch & Real-Time Events",
  Docker: "Containerized microservices & reproducible builds",
  "Machine Learning": "MindSense Gemini Flash AI, NLP & XGBoost Clinical Classification",
};

const CATEGORIES = [
  { id: "Frontend", label: "Frontend", icon: Code2, accent: "#dc2626" },
  { id: "Backend", label: "Backend", icon: Server, accent: "#e5a93c" },
  { id: "Databases", label: "Databases", icon: Database, accent: "#dc2626" },
  { id: "Other", label: "DevOps & AI", icon: Cpu, accent: "#e5a93c" },
];

export default function Skills() {
  const rootRef = useRef(null);
  const [activeTab, setActiveTab] = useState("Frontend");
  
  // Default selected skill for the inspector
  const [hoveredSkill, setHoveredSkill] = useState({
    name: "React",
    detail: "Component architecture, hooks, state management",
    category: "Frontend",
  });

  useEffect(() => {
    revealOnScroll(".skills-reveal", { stagger: 0.04, y: 15 });
  }, []);

  const currentGroup = skillGroups.find((g) => g.label === activeTab) || skillGroups[0];
  const activeCategoryConfig = CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    const firstSkill = skillGroups.find((g) => g.label === tabId)?.skills[0];
    if (firstSkill) {
      setHoveredSkill({ ...firstSkill, category: tabId });
    }
  };

  return (
    <section
      id="skills"
      ref={rootRef}
      className="py-20 sm:py-24 md:py-32 bg-[#fafafa] text-[#0a0a0c] relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(ellipse at 85% 10%, rgba(229,169,60,0.06) 0%, transparent 45%), radial-gradient(ellipse at 15% 90%, rgba(220,38,38,0.05) 0%, transparent 45%)",
      }}
    >
      {/* Top Accent Ribbon */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#dc2626] via-[#e5a93c] to-[#dc2626]" />

      <div className="container-px max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="skills-reveal flex flex-col md:flex-row md:items-end justify-between gap-5 sm:gap-6 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c]" />
              <span className="text-xs uppercase tracking-widest text-[#dc2626] font-semibold">
                Technical Stack & Expertise
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight">
              Interactive Stack Explorer
            </h2>
            <p className="text-zinc-600 mt-2.5 sm:mt-3 max-w-xl text-sm sm:text-base font-light">
              Tap or hover any technology below to inspect its role, architectural capabilities, and production implementations.
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white border border-zinc-200 text-xs font-semibold text-zinc-700 shadow-sm self-start md:self-end">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span>20+ Production Core Skills</span>
          </div>
        </div>

        {/* ── Category Pill Tabs (Horizontal swipeable on mobile) ── */}
        <div className="skills-reveal flex items-center justify-start sm:justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 overflow-x-auto no-scrollbar pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => handleSelectTab(cat.id)}
                className={`group inline-flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-sm shrink-0 whitespace-nowrap ${
                  isActive
                    ? "bg-black text-white shadow-md shadow-black/20 scale-[1.02]"
                    : "bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-black hover:bg-zinc-50"
                }`}
              >
                <div
                  className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-colors ${
                    isActive ? "text-black" : "text-zinc-600 group-hover:text-black"
                  }`}
                  style={{ background: isActive ? cat.accent : "rgba(0,0,0,0.06)" }}
                >
                  <Icon size={11} />
                </div>
                <span>{cat.label}</span>
                <span
                  className={`text-[9px] sm:text-[10px] font-mono px-1.5 sm:px-2 py-0.5 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {skillGroups.find((g) => g.label === cat.id)?.skills.length || 0}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Main Interactive Board (Grid: Floating Pills on Left, Live Inspector on Right) ── */}
        <div className="skills-reveal grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Left: Floating Capsule Badges Grid (7 cols) */}
          <div className="lg:col-span-7 p-5 sm:p-7 md:p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-zinc-100">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-zinc-400 font-semibold flex items-center gap-2">
                  <Layers size={14} className="text-[#dc2626]" />
                  <span>Available Technologies</span>
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-400 font-light">
                  Tap to inspect
                </span>
              </div>

              {/* Floating Pills Badges */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {currentGroup.skills.map((skill) => {
                  const isSelected = hoveredSkill.name === skill.name;

                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => setHoveredSkill({ ...skill, category: activeTab })}
                      onClick={() => setHoveredSkill({ ...skill, category: activeTab })}
                      className={`group/pill relative inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer text-left ${
                        isSelected
                          ? "bg-gradient-to-r from-black to-zinc-900 text-white shadow-xl shadow-black/20 -translate-y-0.5 scale-[1.03] border-transparent"
                          : "bg-zinc-50 text-zinc-800 border border-zinc-200/90 hover:border-[#dc2626]/50 hover:bg-white hover:shadow-md hover:-translate-y-0.5"
                      }`}
                    >
                      {/* Status indicator dot */}
                      <span
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isSelected
                            ? "bg-[#e5a93c] shadow-[0_0_8px_#e5a93c] scale-125"
                            : "bg-[#dc2626]/40 group-hover/pill:bg-[#dc2626] group-hover/pill:scale-110"
                        }`}
                      />
                      <span>{skill.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Helper Notice */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-zinc-100 flex items-center justify-between text-xs text-zinc-400 font-light">
              <span>Dynamic Architecture Stack</span>
              <span className="text-zinc-600 font-medium flex items-center gap-1">
                <span>Enterprise Ready</span>
                <CheckCircle2 size={13} className="text-emerald-500" />
              </span>
            </div>
          </div>

          {/* Right: Live Interactive Detail Inspector (5 cols) */}
          <div className="lg:col-span-5 p-5 sm:p-7 md:p-8 rounded-3xl bg-gradient-to-br from-[#121216] via-[#0e0e12] to-[#09090b] text-white border border-white/10 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div
              className="absolute -top-20 -right-20 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none transition-colors duration-500"
              style={{ background: activeCategoryConfig.accent }}
            />

            <div>
              {/* Header inside Inspector */}
              <div className="flex items-center justify-between pb-3 sm:pb-4 mb-4 sm:mb-6 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal size={14} className="text-[#e5a93c]" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400 font-semibold font-mono">
                    Live Inspector
                  </span>
                </div>
                <span
                  className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full"
                  style={{
                    background: `${activeCategoryConfig.accent}20`,
                    color: activeCategoryConfig.accent,
                    border: `1px solid ${activeCategoryConfig.accent}40`,
                  }}
                >
                  {hoveredSkill.category || activeTab}
                </span>
              </div>

              {/* Skill Title */}
              <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 flex items-center gap-3">
                <span>{hoveredSkill.name}</span>
              </h3>

              {/* Skill Role Description */}
              <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#e5a93c] block mb-1">
                  Architecture Role & Capabilities
                </span>
                <p className="text-xs sm:text-sm text-zinc-200 font-light leading-relaxed">
                  {hoveredSkill.detail}
                </p>
              </div>

              {/* Where Implemented / Production Footprint */}
              <div className="mt-3 sm:mt-4 p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#dc2626] block mb-1">
                  Production Implementations
                </span>
                <p className="text-xs text-zinc-300 font-medium leading-relaxed">
                  {SKILL_PROJECT_MAP[hoveredSkill.name] || "Production Core Layer in Abdelrahman's Systems"}
                </p>
              </div>
            </div>

            {/* Bottom Action inside Inspector */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-light">Verified in Case Studies</span>
              <button
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-[#e5a93c] hover:text-white font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
