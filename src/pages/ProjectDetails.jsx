import { useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github, CheckCircle2, AlertCircle, Layers } from "lucide-react";
import { getProjectById, projects } from "../data/projects";
import ProjectVisual from "../components/ProjectVisual";
import { gsap } from "../utils/useLenis";
import { revealOnScroll } from "../animations/scrollAnimations";
import MagneticButton from "../components/MagneticButton";

const FIELDS = [
  { key: "problem", label: "The Problem & Context", icon: AlertCircle },
  { key: "build", label: "Engineering Solution & Implementation", icon: CheckCircle2 },
  { key: "architecture", label: "System Architecture & Data Flow", icon: Layers },
];

export default function ProjectDetails() {
  const { id } = useParams();
  const project = getProjectById(id);
  const rootRef = useRef(null);
  const heroImgWrapRef = useRef(null);
  const titleRef = useRef(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    if (!project) return;
    window.scrollTo(0, 0);

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([rootRef.current, heroImgWrapRef.current, titleRef.current], {
          opacity: 1,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(rootRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.7 }
        )
        .fromTo(
          heroImgWrapRef.current,
          { opacity: 0, scale: 0.98 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "power3.out" },
          "-=0.4"
        );

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        revealOnScroll(el, { delay: i * 0.05 });
      });
    }, rootRef);

    return () => ctx.revert();
  }, [project, id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 font-serif pt-28">
        <h1 className="text-3xl font-bold text-white">Project Not Found</h1>
        <p className="text-zinc-400">The project you are looking for does not exist.</p>
        <Link to="/#projects" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm">
          <ArrowLeft size={16} /> Return to Projects
        </Link>
      </div>
    );
  }

  const currentIndex = projects.findIndex((p) => p.id === id);
  const next = projects[(currentIndex + 1) % projects.length];

  return (
    <div ref={rootRef} className="pt-24 sm:pt-32 pb-16 sm:pb-24">
      <div className="container-px max-w-5xl mx-auto">
        {/* Navigation Breadcrumb */}
        <Link
          to="/#projects"
          data-cursor="text"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-[#e5a93c] transition-colors mb-6 sm:mb-10 group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Selected Works
        </Link>

        {/* Project Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#e5a93c] font-medium">
                {project.number} / {project.category}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="text-[11px] sm:text-xs text-zinc-400 font-medium">
                {project.year}
              </span>
            </div>
            <h1
              ref={titleRef}
              className="font-serif font-bold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight leading-tight break-words"
            >
              {project.name}
            </h1>
            <p className="text-zinc-300 mt-3 sm:mt-4 text-base sm:text-lg md:text-xl font-light leading-relaxed">
              {project.tagline}
            </p>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 shrink-0">
            {project.links.demo && (
              <MagneticButton
                as="a"
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-[#dc2626] to-[#e5a93c] text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-all shadow-md shadow-[#dc2626]/20 cursor-pointer"
              >
                Live Preview <ExternalLink size={14} />
              </MagneticButton>
            )}
            {project.links.github && (
              <MagneticButton
                as="a"
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="text"
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border border-white/20 text-zinc-300 hover:text-white hover:border-white/50 bg-white/[0.03] text-xs sm:text-sm font-medium transition-all cursor-pointer"
              >
                <Github size={15} /> Source Code
              </MagneticButton>
            )}
          </div>
        </div>

        {/* Large Project Image Hero Frame (Dedicated Template) */}
        <div
          ref={heroImgWrapRef}
          className="w-full mb-10 sm:mb-16 rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl shadow-black/80"
        >
          <ProjectVisual
            project={project}
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
            className="w-full h-full min-h-[220px] sm:min-h-[300px] md:min-h-[440px]"
          />
        </div>

        {/* Case Study Content Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12 lg:gap-16">
          {/* Main Case Study Columns */}
          <div className="lg:col-span-2 flex flex-col gap-8 sm:gap-12">
            {FIELDS.map((field, i) => {
              const Icon = field.icon;
              return (
                <div
                  key={field.key}
                  ref={(el) => (sectionRefs.current[i] = el)}
                  className="pb-8 sm:pb-10 border-b border-white/[0.06] last:border-b-0"
                >
                  <div className="flex items-center gap-2.5 mb-3 sm:mb-4">
                    <Icon size={18} className="text-[#e5a93c]" />
                    <h3 className="text-xs uppercase tracking-widest text-zinc-300 font-semibold">
                      {field.label}
                    </h3>
                  </div>
                  <p className="text-zinc-300 leading-relaxed text-sm sm:text-base md:text-lg font-light">
                    {project[field.key]}
                  </p>
                </div>
              );
            })}

            {/* Technical Learnings & Breakthroughs */}
            {project.whatBroke && (
              <div
                ref={(el) => (sectionRefs.current[FIELDS.length] = el)}
                className="rounded-2xl p-5 sm:p-7 md:p-8 bg-white/[0.02] border border-white/[0.08]"
              >
                <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-4 sm:mb-6">
                  Technical Obstacle & Architecture Solution
                </h3>

                <div className="space-y-4 sm:space-y-6">
                  <div className="p-3.5 sm:p-4 rounded-xl bg-black/40 border border-white/[0.04]">
                    <span className="text-xs uppercase tracking-wider text-zinc-400 font-semibold block mb-1">
                      Critical Challenge
                    </span>
                    <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed">
                      {project.whatBroke.problem}
                    </p>
                  </div>

                  <div className="p-3.5 sm:p-4 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                    <span className="text-xs uppercase tracking-wider text-white font-semibold block mb-1">
                      Engineered Solution
                    </span>
                    <p className="text-zinc-200 text-xs sm:text-sm md:text-base leading-relaxed">
                      {project.whatBroke.response}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Project Details Sidebar */}
          <aside
            ref={(el) => (sectionRefs.current[FIELDS.length + 1] = el)}
            className="h-fit lg:sticky lg:top-28 rounded-2xl p-5 sm:p-7 bg-white/[0.02] border border-white/[0.08] flex flex-col gap-6 sm:gap-8"
          >
            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-3 sm:mb-4">
                Technology Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:border-[#e5a93c]/40 hover:text-[#e5a93c] text-zinc-300 font-medium transition-colors"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">
                Domain / Category
              </p>
              <p className="text-sm font-serif font-bold text-white">{project.category}</p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">
                Timeline / Release
              </p>
              <p className="text-sm text-zinc-300">{project.year}</p>
            </div>
          </aside>
        </div>

        {/* Next Project Navigator */}
        <div className="mt-16 sm:mt-24 pt-8 sm:pt-12 border-t border-white/[0.08]">
          <div className="flex items-center justify-between">
            <Link
              to={`/projects/${next.id}`}
              data-cursor="view"
              className="group block"
            >
              <span className="text-xs uppercase tracking-widest text-[#e5a93c] block mb-1">
                Next Project Case Study
              </span>
              <span className="font-serif font-bold text-xl sm:text-3xl md:text-4xl text-white group-hover:text-zinc-300 transition-colors flex items-center gap-2 sm:gap-3">
                {next.name}
                <ArrowUpRight size={22} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
