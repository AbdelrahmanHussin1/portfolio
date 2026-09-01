import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Activity, Stethoscope, Layers, Utensils, Globe } from "lucide-react";
import { revealOnScroll } from "../animations/scrollAnimations";
import { gsap } from "../utils/useLenis";
import { projects } from "../data/projects";

const CATEGORIES = [
  "All Projects",
  "AI & Machine Learning",
  "Enterprise SaaS",
  "Architecture & Construction",
  "Web Engineering",
];

const PROJECT_ICONS = {
  "mind-sense": Activity,
  "clinic-saas": Stethoscope,
  ayonk: Layers,
  ayounk: Layers,
  "restaurant-os": Utensils,
  sysora: Globe,
};

export default function Projects() {
  const rootRef = useRef(null);
  const bgImgRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState("All Projects");

  useEffect(() => {
    revealOnScroll(".project-card", { stagger: 0.04, y: 15 });
  }, [selectedCategory]);

  // GSAP parallax for background
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bgImgRef.current,
        { scale: 1.12, opacity: 0 },
        { scale: 1.05, opacity: 0.28, duration: 1.6, ease: "power2.out" }
      );

      gsap.to(bgImgRef.current, {
        scale: 1.1,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (isFinePointer && bgImgRef.current) {
        const xTo = gsap.quickTo(bgImgRef.current, "x", { duration: 1.0, ease: "power2.out" });
        const yTo = gsap.quickTo(bgImgRef.current, "y", { duration: 1.0, ease: "power2.out" });

        const handleMouseMove = (e) => {
          const rect = rootRef.current?.getBoundingClientRect();
          if (!rect || e.clientY < rect.top || e.clientY > rect.bottom) return;
          const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
          const yPos = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
          xTo(xPos);
          yTo(yPos);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const filteredProjects =
    selectedCategory === "All Projects"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="projects"
      ref={rootRef}
      className="py-20 sm:py-24 md:py-36 bg-[#09090b] text-[#f4f4f6] relative overflow-hidden"
    >
      {/* ── Background Image Layer (Hero Treatment) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={bgImgRef}
          className="absolute -inset-10 bg-cover bg-center will-change-transform filter grayscale contrast-125 brightness-75"
          style={{ backgroundImage: `url('/hero-bg.jpg')`, opacity: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/90 via-[#09090b]/55 to-[#09090b]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#09090b]/60 via-transparent to-[#09090b]/60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(220,38,38,0.06)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_60%,rgba(229,169,60,0.05)_0%,transparent_50%)]" />

        <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-[0.03] overflow-hidden max-w-full">
          <span className="font-serif text-[20vw] font-black uppercase tracking-tighter text-white whitespace-nowrap">
            WORK
          </span>
        </div>
      </div>

      <div className="container-px max-w-7xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c]" />
              <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-semibold">
                Portfolio & Case Studies
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Selected{" "}
              <span className="relative">
                Engineering Works
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c] rounded-full" />
              </span>
            </h2>
            <p className="text-zinc-400 mt-3 sm:mt-4 max-w-xl text-sm sm:text-base font-light">
              Real-world systems engineered with end-to-end architecture, strict security boundaries,
              and resilient production performance.
            </p>
          </div>

          {/* Category Filter Tabs (Swipeable on mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 sm:flex-wrap shrink-0 -mx-4 px-4 sm:mx-0 sm:px-0 max-w-full">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3.5 sm:px-4 py-2 rounded-full border transition-all cursor-pointer font-medium whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#dc2626] to-[#e5a93c] text-white border-transparent shadow-lg shadow-[#dc2626]/30 font-semibold"
                    : "bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-white hover:border-[#e5a93c]/40 hover:bg-[#e5a93c]/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Project Cards Grid (Full-Image Background Style) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredProjects.map((p) => {
            const Icon = PROJECT_ICONS[p.id] || Sparkles;

            return (
              <div
                key={p.id}
                className="project-card group relative rounded-2xl overflow-hidden border border-white/10 bg-[#0d0d11] min-h-[400px] sm:min-h-[440px] flex flex-col justify-end shadow-2xl transition-all duration-500 hover:border-white/25 hover:shadow-[0_16px_50px_-10px_rgba(0,0,0,0.9)]"
              >
                {/* 1. Full Background Image */}
                <div className="absolute inset-0 overflow-hidden z-0 bg-[#121216]">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.name}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover object-top filter brightness-[0.75] contrast-110 transition-all duration-700 ease-out group-hover:scale-105 group-hover:brightness-[0.88]"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#1c1c24] to-[#09090b]" />
                  )}

                  {/* 2. Gradient Overlays for High-Contrast Readable Text */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/85 via-45% to-black/35 pointer-events-none" />
                  <div className="absolute inset-0 bg-black/25 pointer-events-none group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Top Corner Badge (Category / Featured) */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-black/80 text-[#e5a93c] border border-white/10 backdrop-blur-md">
                    {p.number}
                  </span>
                  {p.featured && (
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#dc2626] text-white shadow-sm">
                      Featured
                    </span>
                  )}
                </div>

                {/* 3. Card Content (Positioned over the image) */}
                <div className="relative z-10 flex flex-col p-5 sm:p-6 pt-10 sm:pt-12">
                  {/* Category Subtitle */}
                  <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-[#e5a93c] mb-1">
                    {p.category}
                  </span>

                  {/* Main Title */}
                  <Link to={`/projects/${p.id}`} data-cursor="view" className="block group/title">
                    <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wide text-white leading-tight mb-2 group-hover/title:text-zinc-200 transition-colors">
                      {p.name}
                    </h3>
                  </Link>

                  {/* Tagline / Description */}
                  <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed font-light mb-4 sm:mb-5">
                    {p.tagline}
                  </p>

                  {/* Red Square Bullet Points (Features / Tech Highlights) */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 sm:gap-y-2 mb-5 sm:mb-6 text-xs font-medium text-zinc-200">
                    {p.tech.slice(0, 4).map((t) => (
                      <div key={t} className="flex items-center gap-2 min-w-0">
                        <span className="w-1.5 h-1.5 bg-[#dc2626] shrink-0 inline-block shadow-[0_0_4px_#dc2626]" />
                        <span className="truncate text-[11px] text-zinc-200">{t}</span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom Action Row */}
                  <div className="flex items-end justify-between gap-2 pt-2 -mx-5 -mb-5 sm:-mx-6 sm:-mb-6">
                    {/* Left CTA Button */}
                    <Link
                      to={`/projects/${p.id}`}
                      data-cursor="view"
                      className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 ml-5 sm:ml-6 mb-5 sm:mb-6 bg-[#dc2626] hover:bg-[#b91c1c] text-white text-xs font-semibold tracking-wide transition-all duration-300 shadow-md hover:shadow-lg shadow-[#dc2626]/20 cursor-pointer group-hover:translate-x-0.5 rounded-none"
                    >
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      <span>View Case Study</span>
                    </Link>

                    {/* Right Corner Square Badge (Gold -> Red on Hover) */}
                    <div
                      className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#e5a93c] text-black group-hover:bg-[#dc2626] group-hover:text-white transition-all duration-300 shrink-0 shadow-lg cursor-pointer"
                      title={p.category}
                    >
                      <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* ── Card 6: CTA "LOOKING FOR CONSULTATION?" ── */}
          <div
            className="project-card group relative rounded-2xl overflow-hidden border border-white/10 min-h-[400px] sm:min-h-[440px] flex flex-col justify-between shadow-2xl transition-all duration-500 hover:border-white/30 cursor-pointer bg-[#09090b]"
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          >
            {/* 1. Real Background Image (Hero Shape Treatment) */}
            <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
              <img
                src="/hero-bg.jpg"
                alt="Architecture shape background"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center filter grayscale contrast-150 brightness-75 transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* 2. Red Tone Color Overlay (Multiplied over the architectural photo) */}
              <div className="absolute inset-0 bg-[#b91c1c]/80 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#7f1d1d]/90 via-[#dc2626]/70 to-[#991b1b]/80 pointer-events-none" />
              
              {/* 3. Grid Pattern Overlay */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
            </div>

            {/* Top / Center Content */}
            <div className="relative z-10 p-5 sm:p-6 pt-8 sm:pt-10 flex flex-col items-center text-center">
              {/* Thin Border Square Icon Box */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 border border-white/40 flex items-center justify-center mb-5 sm:mb-6 bg-white/[0.04] backdrop-blur-sm group-hover:border-white/80 group-hover:scale-105 transition-all duration-300">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>

              {/* Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2.5 drop-shadow-sm">
                LOOKING FOR<br />CONSULTATION?
              </h3>

              {/* Description */}
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-[270px] font-light">
                We are here to help you turn your vision into reality with the highest quality and professionalism
              </p>
            </div>

            {/* Bottom Row */}
            <div className="relative z-10 flex items-end justify-between gap-2">
              {/* CTA Button */}
              <button
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 ml-5 sm:ml-6 mb-5 sm:mb-6 bg-white hover:bg-zinc-100 text-[#881337] font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg group-hover:shadow-2xl cursor-pointer"
              >
                <span>LET'S WORK TOGETHER</span>
              </button>

              {/* Right Corner Square Badge */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#4c0519]/70 hover:bg-[#881337] text-white border-t border-l border-white/10 transition-all duration-300 shrink-0 shadow-lg">
                <Layers size={20} className="transition-transform duration-300 group-hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
