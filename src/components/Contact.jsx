import { useEffect, useRef, useState } from "react";
import { Copy, Check, Github, Linkedin, Mail, ArrowUpRight, FileText } from "lucide-react";
import { revealOnScroll } from "../animations/scrollAnimations";
import MagneticButton from "./MagneticButton";
import { openResumeModal } from "../utils/resumeModal";

const EMAIL = "abdelrahmanhussein708@gmail.com";

export default function Contact() {
  const rootRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    revealOnScroll(".contact-reveal", { stagger: 0.04, y: 15 });
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  };

  return (
    <section id="contact" ref={rootRef} className="py-20 sm:py-24 md:py-36 bg-[#fafafa] text-[#0a0a0c] relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(ellipse at 50% 0%, rgba(220,38,38,0.06) 0%, transparent 55%), radial-gradient(ellipse at 80% 100%, rgba(229,169,60,0.06) 0%, transparent 50%)' }}>
      {/* Top Brand Accent Border */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#dc2626] via-[#e5a93c] to-[#dc2626]" />
      <div className="container-px max-w-4xl mx-auto text-center">
        {/* Section Tag */}
        <div className="contact-reveal inline-flex items-center gap-2 mb-3 sm:mb-4">
          <span className="w-6 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c]" />
          <span className="text-xs uppercase tracking-widest text-[#dc2626] font-semibold">
            Get In Touch
          </span>
          <span className="w-6 h-[2px] bg-gradient-to-r from-[#e5a93c] to-[#dc2626]" />
        </div>

        <h2 className="contact-reveal font-serif text-3xl sm:text-5xl md:text-6xl font-bold text-black tracking-tight mb-4 sm:mb-6">
          Let's Build Something Exceptional
        </h2>

        <p className="contact-reveal text-zinc-600 max-w-xl mx-auto text-sm sm:text-base md:text-lg font-light mb-8 sm:mb-12">
          Currently open to full-time software engineering roles, challenging technical opportunities,
          and select freelance systems architecture contracts.
        </p>

        {/* Main Contact Card */}
        <div className="contact-reveal p-5 sm:p-8 md:p-10 max-w-xl mx-auto text-left rounded-3xl bg-white border border-zinc-200 shadow-xl hover:shadow-[0_16px_48px_-12px_rgba(220,38,38,0.15)] transition-all relative overflow-hidden">
          {/* Card top accent */}
          <div className="absolute top-0 left-0 right-0 h-[4px] bg-gradient-to-r from-[#dc2626] via-[#e5a93c] to-[#dc2626]" />
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 sm:pb-6 mb-5 sm:mb-6 border-b border-zinc-200">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2.5 sm:p-3 rounded-full bg-black text-[#e5a93c] shadow-[0_0_16px_rgba(229,169,60,0.35)] shrink-0">
                <Mail size={18} />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider text-zinc-500 font-semibold block">
                  Primary Contact Email
                </span>
                <span className="text-xs sm:text-sm md:text-base font-semibold text-[#b45309] break-all sm:break-normal">
                  {EMAIL}
                </span>
              </div>
            </div>

            <button
              onClick={handleCopy}
              data-cursor="text"
              className="self-start sm:self-auto px-3.5 py-2 rounded-xl bg-white border border-zinc-300 hover:bg-[#dc2626] hover:text-white hover:border-[#dc2626] transition-all text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm shrink-0"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-600" /> Copied!
                </>
              ) : (
                <>
                  <Copy size={14} /> Copy
                </>
              )}
            </button>
          </div>

          {/* Direct Social Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 mb-6 sm:mb-8">
            <a
              href="https://www.linkedin.com/in/abdelrahman-hussin-871281266/"
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200 hover:border-[#e5a93c]/50 hover:bg-zinc-50 hover:shadow-[0_4px_20px_-4px_rgba(229,169,60,0.2)] transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin size={18} className="text-zinc-700 group-hover:text-black" />
                <span className="text-xs sm:text-sm font-medium text-zinc-900">LinkedIn Profile</span>
              </div>
              <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href="https://github.com/AbdelrahmanHussin1"
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              className="p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200 hover:border-[#dc2626]/40 hover:bg-zinc-50 hover:shadow-[0_4px_20px_-4px_rgba(220,38,38,0.15)] transition-all flex items-center justify-between group shadow-sm"
            >
              <div className="flex items-center gap-2.5">
                <Github size={18} className="text-zinc-700 group-hover:text-black" />
                <span className="text-xs sm:text-sm font-medium text-zinc-900">GitHub Profile</span>
              </div>
              <ArrowUpRight size={15} className="text-zinc-400 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Download Resume Action */}
          <div className="text-center pt-1">
            <MagneticButton
              as="button"
              onClick={openResumeModal}
              data-cursor="text"
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#dc2626] to-[#e5a93c] text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-all cursor-pointer shadow-lg shadow-[#dc2626]/20"
            >
              <FileText size={16} />
              View Resume
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
