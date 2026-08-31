import { useEffect, useRef } from "react";
import { GraduationCap, ShieldCheck, FileCheck, ArrowUpRight, Award } from "lucide-react";
import { revealOnScroll } from "../animations/scrollAnimations";
import { certificates, publications } from "../data/credentials";

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    revealOnScroll(".about-reveal", { stagger: 0.04, y: 15 });
  }, []);

  return (
    <section
      id="about"
      ref={rootRef}
      className="py-20 sm:py-24 md:py-36 bg-[#fafafa] text-[#0a0a0c] relative overflow-hidden"
      style={{ backgroundImage: 'radial-gradient(ellipse at 10% 0%, rgba(220,38,38,0.06) 0%, transparent 50%), radial-gradient(ellipse at 90% 100%, rgba(229,169,60,0.06) 0%, transparent 50%)' }}
    >
      {/* Top Brand Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#dc2626] via-[#e5a93c] to-[#dc2626]" />
      <div className="container-px max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="about-reveal flex items-center gap-2 mb-3">
          <span className="w-6 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c]" />
          <span className="text-xs uppercase tracking-widest text-[#dc2626] font-semibold">
            Background & Philosophy
          </span>
        </div>

        <h2 className="about-reveal font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-black tracking-tight mb-8 sm:mb-12">
          Engineering with Purpose <span className="relative">&amp; Precision
            <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c] rounded-full" />
          </span>
        </h2>

        {/* Narrative Grid */}
        <div className="about-reveal grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 mb-12 sm:mb-16">
          <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-zinc-700 font-light text-sm sm:text-base md:text-lg leading-relaxed">
            <p>
              I am a <strong className="text-[#dc2626] font-semibold">Full Stack Software Engineer</strong> who prioritizes
              system resilience, maintainable architecture, and production readiness above transient trends.
              My foundation spans modern <strong className="text-black font-semibold">React &amp; TypeScript</strong> on the front end,
              robust <strong className="text-black font-semibold">ASP.NET Core &amp; Node.js</strong> microservices on the backend,
              and applied <strong className="text-[#b45309] font-semibold">Machine Learning &amp; NLP</strong>.
            </p>
            <p>
              Throughout my engineering journey, I have delivered multi-tenant SaaS platforms requiring strict
              row-level data isolation, high-throughput real-time updates via SignalR, specialized healthcare medical record systems,
              and machine learning classifiers for psychological risk detection.
            </p>
            <p className="text-zinc-600 text-sm sm:text-base">
              I believe great software is built at the intersection of rigorous systems engineering, clean code boundaries,
              and thoughtful human interaction.
            </p>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-5 sm:p-7 rounded-2xl bg-white border border-zinc-200 hover:border-[#e5a93c]/60 transition-all shadow-md hover:shadow-[0_8px_32px_-8px_rgba(229,169,60,0.3)] relative overflow-hidden">
            {/* Top color accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c]" />
            <div>
              <span className="text-xs uppercase tracking-widest text-[#dc2626] font-semibold block mb-4">
                Core Competencies
              </span>
              <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-zinc-800">
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                  <span>Full Stack Application Architecture</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] shrink-0" />
                  <span>Multi-Tenant Cloud Data Isolation (.NET / SQL)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                  <span>Real-Time Event Dispatching (SignalR / WebSockets)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e5a93c] shrink-0" />
                  <span>Applied Machine Learning & NLP Pipelines</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626] shrink-0" />
                  <span>Responsive UI & Motion Engineering</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 sm:pt-6 mt-5 sm:mt-6 border-t border-zinc-200 flex items-center justify-between text-xs text-zinc-500">
              <span>Location</span>
              <span className="text-black font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#dc2626] shadow-[0_0_6px_#dc2626]" />
                Cairo, Egypt / Remote Worldwide
              </span>
            </div>
          </div>
        </div>

        {/* Credentials & Degrees Section */}
        <div className="about-reveal pt-8 sm:pt-10 border-t-2 border-gradient" style={{ borderImage: 'linear-gradient(90deg, #dc2626, #e5a93c) 1' }}>
          <div className="flex items-center gap-2 mb-6">
            <Award size={16} className="text-[#dc2626]" />
            <h3 className="text-xs uppercase tracking-widest text-zinc-600 font-semibold">
              Degrees, Accreditations & Research Participation
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {certificates.map((c) => (
              <a
                key={c.id}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#e5a93c]/60 hover:bg-zinc-100/80 transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_8px_32px_-8px_rgba(229,169,60,0.25)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-black text-[#e5a93c]">
                      {c.icon === "GraduationCap" ? (
                        <GraduationCap size={18} />
                      ) : (
                        <ShieldCheck size={18} />
                      )}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-zinc-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>

                  <h4 className="font-serif font-bold text-base sm:text-lg text-black group-hover:text-zinc-900 transition-colors">
                    {c.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-medium">
                    {c.issuer} • {c.location}
                  </p>
                  <p className="text-xs text-zinc-600 mt-2.5 sm:mt-3 leading-relaxed">
                    {c.subtitle || c.highlights?.[0]}
                  </p>
                </div>

                <div className="pt-3.5 sm:pt-4 mt-5 sm:mt-6 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-semibold text-zinc-900 px-2 py-0.5 rounded-full bg-zinc-200/70 border border-zinc-300">
                    {c.badge}
                  </span>
                  <span>{c.year}</span>
                </div>
              </a>
            ))}

            {/* NILES 2025 Research Card */}
            {publications.map((pub) => (
              <a
                key={pub.id}
                href={pub.href}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                className="p-5 sm:p-6 rounded-2xl bg-zinc-50 border border-zinc-200 hover:border-[#dc2626]/60 hover:bg-zinc-100/80 transition-all flex flex-col justify-between group shadow-sm hover:shadow-[0_8px_32px_-8px_rgba(220,38,38,0.25)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-black text-[#dc2626]">
                      <FileCheck size={18} />
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-zinc-400 group-hover:text-[#dc2626] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                    />
                  </div>

                  <h4 className="font-serif font-bold text-base sm:text-lg text-black group-hover:text-zinc-900 transition-colors">
                    NILES2025 Research
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 font-medium">
                    {pub.organizer} • {pub.year}
                  </p>
                  <p className="text-xs text-zinc-600 mt-2.5 sm:mt-3 leading-relaxed">
                    {pub.description}
                  </p>
                </div>

                <div className="pt-3.5 sm:pt-4 mt-5 sm:mt-6 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-500">
                  <span className="font-semibold text-[#dc2626] px-2 py-0.5 rounded-full bg-red-50 border border-red-200">
                    Certificate {pub.certificateId}
                  </span>
                  <span className="text-emerald-700 font-medium">Verified</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
