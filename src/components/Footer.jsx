import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import Logo from "./Logo";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/[0.08] py-10 sm:py-14 bg-[#08080a]">
      <div className="container-px max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
        <div className="flex items-center gap-3">
          <Logo size="sm" withText={true} />
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="mailto:abdelrahmanhussein708@gmail.com"
            aria-label="Email"
            data-cursor="text"
            className="text-zinc-400 hover:text-[#dc2626] transition-colors p-2 rounded-full hover:bg-[#dc2626]/10"
          >
            <Mail size={18} />
          </a>
          <a
            href="https://github.com/AbdelrahmanHussin1"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            data-cursor="text"
            className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/[0.05]"
          >
            <Github size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/abdelrahman-hussin-871281266/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            data-cursor="text"
            className="text-zinc-400 hover:text-[#e5a93c] transition-colors p-2 rounded-full hover:bg-[#e5a93c]/10"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <div className="flex items-center gap-4 sm:gap-6 text-center">
          <p className="text-xs text-zinc-400 font-light">
            © {new Date().getFullYear()} Abdelrahman Hussin. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            aria-label="Scroll to top"
            className="p-2 rounded-full border border-white/[0.1] text-zinc-400 hover:text-white hover:border-[#e5a93c]/60 hover:bg-[#e5a93c]/10 transition-all cursor-pointer shrink-0"
          >
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
