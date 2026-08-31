import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, Award, Code2, Calendar } from "lucide-react";
import { revealOnScroll, drawLineOnScroll } from "../animations/scrollAnimations";
import { experience } from "../data/experience";

const ICONS = {
  work: Briefcase,
  education: GraduationCap,
  research: Award,
  project: Code2,
};

export default function Experience() {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    revealOnScroll(".exp-item", { stagger: 0.04, y: 15 });
    drawLineOnScroll(lineRef.current, containerRef.current);
  }, []);

  return (
    <section id="experience" ref={rootRef} className="py-20 sm:py-24 md:py-36 bg-[#09090b] text-[#f4f4f6] relative overflow-hidden">
      <div className="container-px max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-3">
          <span className="w-6 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c]" />
          <span className="text-xs uppercase tracking-widest text-[#e5a93c] font-semibold">
            Career Timeline & Milestones
          </span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-3 sm:mb-4">
          Experience & Education
        </h2>
        <p className="text-zinc-400 max-w-xl text-sm sm:text-base font-light mb-12 sm:mb-16">
          A track record of engineering delivery across enterprise data management,
          SaaS platforms, independent software, and university research.
        </p>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative pl-5 sm:pl-8 md:pl-10">
          {/* Vertical Progress Line */}
          <div className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-px bg-white/[0.1]" />
          <div
            ref={lineRef}
            className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-[#dc2626] to-[#e5a93c] origin-top scale-y-0"
          />

          <div className="space-y-8 sm:space-y-12">
            {experience.map((item, idx) => {
              const Icon = ICONS[item.type] || Code2;
              return (
                <div key={idx} className="exp-item relative group">
                  {/* Timeline Dot */}
                  <span className="absolute -left-5 sm:-left-8 md:-left-10 top-1.5 w-3.5 h-3.5 md:w-5 md:h-5 rounded-full bg-[#09090b] border-2 border-white/40 group-hover:border-[#e5a93c] group-hover:shadow-[0_0_12px_#e5a93c] transition-all flex items-center justify-center -translate-x-1/2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-[#dc2626] transition-all" />
                  </span>

                  <div className="classic-card p-5 sm:p-6 md:p-7 bg-[#121216]">
                    <div className="flex flex-wrap items-center justify-between gap-2.5 sm:gap-3 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 sm:py-1 rounded-full bg-[#dc2626]/10 border border-[#dc2626]/30 text-[#f87171]">
                        <Icon size={12} className="text-[#e5a93c]" />
                        {item.type.toUpperCase()}
                      </span>
                      <span className="text-xs text-zinc-400 font-mono flex items-center gap-1">
                        <Calendar size={12} />
                        {item.year}
                      </span>
                    </div>

                    <h3 className="font-serif font-bold text-lg sm:text-xl md:text-2xl text-white mt-2 group-hover:text-zinc-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-zinc-400 mt-0.5">
                      {item.org}
                    </p>

                    <p className="text-xs sm:text-sm text-zinc-300 mt-2.5 sm:mt-3 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
