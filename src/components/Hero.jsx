import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, FileText } from "lucide-react";
import { gsap } from "../utils/useLenis";
import MagneticButton from "./MagneticButton";
import { openResumeModal } from "../utils/resumeModal";

const STATS = [
  { value: "5+", label: "Production Systems", detail: "Shipped end-to-end" },
  { value: ".NET & React", label: "Core Expertise", detail: "Enterprise SaaS & APIs" },
  { value: "ML & NLP", label: "Applied AI", detail: "Predictive classification" },
  { value: "100%", label: "Production Ready", detail: "Resilient architectures" },
];

export default function Hero() {
  const rootRef = useRef(null);
  const bgImgRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;

    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        bgImgRef.current,
        { scale: 1.18, opacity: 0 },
        { scale: 1.05, opacity: 0.38, duration: 1.6, ease: "power2.out" }
      ).fromTo(
        ".hero-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=1.0"
      );

      // Continuous subtle breathing motion
      gsap.to(bgImgRef.current, {
        scale: 1.12,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // High-performance quickTo mouse parallax (only for fine pointers)
      if (isFinePointer && bgImgRef.current) {
        const xTo = gsap.quickTo(bgImgRef.current, "x", { duration: 0.8, ease: "power2.out" });
        const yTo = gsap.quickTo(bgImgRef.current, "y", { duration: 0.8, ease: "power2.out" });

        const handleMouseMove = (e) => {
          const xPos = (e.clientX / window.innerWidth - 0.5) * 26;
          const yPos = (e.clientY / window.innerHeight - 0.5) * 26;
          xTo(xPos);
          yTo(yPos);
        };

        window.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative min-h-[92vh] sm:min-h-[96vh] flex flex-col items-center justify-center pt-28 pb-20 sm:pt-36 sm:pb-24 md:pt-44 md:pb-32 bg-[#09090b] text-[#f4f4f6] overflow-hidden"
    >
      {/* Dynamic Background Image with Motion & Parallax */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          ref={bgImgRef}
          className="absolute -inset-10 bg-cover bg-center transition-transform will-change-transform filter grayscale contrast-125 brightness-90"
          style={{
            backgroundImage: `url('/hero-bg.jpg')`,
          }}
        />
        {/* Layered Luxury Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#09090b]/85 via-[#09090b]/60 to-[#09090b] pointer-events-none" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#09090b]/40 to-[#09090b] pointer-events-none" />
      </div>

      {/* Decorative Watermark Typography */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] whitespace-nowrap z-0 overflow-hidden max-w-full">
        <span className="font-serif text-[18vw] font-bold uppercase tracking-tighter text-white">
          ENGINEER
        </span>
      </div>

      {/* Main Content */}
      <div ref={contentRef} className="container-px max-w-5xl mx-auto flex flex-col items-center text-center relative z-10 w-full">
        {/* Status Pill */}
        <div className="hero-fade inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-black/80 border border-white/15 text-[11px] sm:text-xs font-medium text-zinc-300 mb-6 sm:mb-8 backdrop-blur-md shadow-2xl max-w-[95%]">
          <span className="w-2 h-2 rounded-full bg-[#e5a93c] animate-pulse shadow-[0_0_8px_#e5a93c] shrink-0" />
          <span className="truncate">Available for Full-time Roles & Systems Engineering</span>
        </div>

        {/* Main Name & Title */}
        <h1 className="hero-fade font-serif text-[2.5rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight text-white leading-[1.08] drop-shadow-2xl max-w-full break-words">
          Abdelrahman <span className="text-gradient-brand">Hussin</span>
        </h1>

        <p className="hero-fade font-serif italic text-lg sm:text-2xl md:text-3xl text-zinc-300 mt-4 sm:mt-5 tracking-wide font-normal max-w-3xl">
          Full Stack Software Engineer <span className="text-[#e5a93c] font-sans not-italic text-sm sm:text-lg mx-1 sm:mx-1.5">•</span> Systems Architect
        </p>

        {/* Narrative Description */}
        <p className="hero-fade text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mt-4 sm:mt-6 leading-relaxed font-light">
          Engineering production-grade web applications, multi-tenant cloud backends,
          and applied machine learning systems. Built with precision, resilient architecture, and refined design.
        </p>

        {/* CTA Actions */}
        <div className="hero-fade flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-8 sm:mt-10 w-full sm:w-auto">
          <MagneticButton
            as="button"
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            data-cursor="view"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-2 px-7 sm:px-8 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-[#f4f4f6] transition-all shadow-xl shadow-black/50 cursor-pointer overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Selected Works
              <ArrowRight size={16} className="group-hover:translate-x-1 text-[#dc2626] transition-transform" />
            </span>
          </MagneticButton>

          <MagneticButton
            as="button"
            onClick={openResumeModal}
            data-cursor="text"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 rounded-full border border-white/20 hover:border-[#e5a93c]/60 text-zinc-200 hover:text-white bg-black/50 hover:bg-white/[0.08] text-xs sm:text-sm font-medium transition-all cursor-pointer backdrop-blur-md"
          >
            <FileText size={15} className="text-[#e5a93c]" />
            View Resume
          </MagneticButton>
        </div>

        {/* Stats Bar */}
        <div className="hero-fade w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-12 sm:mt-16 pt-8 sm:pt-12 border-t border-white/10">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="group relative p-3.5 sm:p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-[#e5a93c]/40 text-left transition-all backdrop-blur-md overflow-hidden"
            >
              {/* Subtle top indicator bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-tight group-hover:text-gradient-brand transition-colors">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs font-semibold text-zinc-300 uppercase tracking-wider mt-1">
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-[11px] text-zinc-400 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Down Indicator */}
      <button
        onClick={() =>
          document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll down to about section"
        className="hero-fade relative z-10 mt-10 sm:mt-14 text-zinc-400 hover:text-white transition-colors flex flex-col items-center gap-1.5 sm:gap-2 cursor-pointer"
      >
        <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-zinc-400">Discover More</span>
        <ArrowDown size={15} className="animate-bounce text-zinc-400" />
      </button>
    </section>
  );
}
