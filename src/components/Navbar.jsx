import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { gsap } from "../utils/useLenis";
import { openResumeModal } from "../utils/resumeModal";
import Logo from "./Logo";

const SECTIONS = [
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const barRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("about");
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    gsap.fromTo(
      barRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const sections = SECTIONS.map((s) => document.getElementById(s.id)).filter(
      Boolean
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const goTo = (id) => {
    setOpen(false);
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 py-3 sm:py-4 pointer-events-none"
    >
      <nav className="container-px max-w-6xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Floating Capsule Bar */}
        <div className="w-full flex items-center justify-between px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full bg-[#09090b]/90 backdrop-blur-2xl border border-white/15 hover:border-white/25 shadow-2xl shadow-black/60 text-white transition-colors">
          {/* Monogram / Brand Logo */}
          <button
            onClick={() => (isHome ? goTo("home") : navigate("/"))}
            data-cursor="text"
            className="flex items-center gap-2 sm:gap-3 group text-left cursor-pointer shrink-0"
          >
            <Logo size="sm" withText={true} />
          </button>

          {/* Desktop Nav Items */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-7">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <button
                  data-cursor="text"
                  onClick={() => goTo(s.id)}
                  className={`relative text-xs tracking-wide transition-all cursor-pointer py-1 font-medium ${
                    active === s.id
                      ? "text-white font-semibold"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {s.label}
                  {active === s.id && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#dc2626] to-[#e5a93c] rounded-full transition-all" />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={openResumeModal}
              data-cursor="text"
              className="inline-flex items-center gap-1.5 text-xs font-medium px-4 py-1.5 rounded-full border border-white/20 hover:border-[#e5a93c]/50 text-zinc-200 hover:text-white bg-white/5 hover:bg-gradient-to-r hover:from-[#dc2626]/20 hover:to-[#e5a93c]/20 transition-all duration-300 shadow-sm cursor-pointer"
            >
              <FileText size={12} className="text-[#e5a93c]" />
              View Resume
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white p-2 -mr-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer & Backdrop */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            className="md:hidden fixed inset-0 bg-black/70 backdrop-blur-sm pointer-events-auto z-40 transition-opacity duration-200"
            onClick={() => setOpen(false)}
          />
          {/* Drawer Menu */}
          <div className="md:hidden fixed inset-x-3 sm:inset-x-4 top-[68px] sm:top-[74px] bg-[#09090b]/95 backdrop-blur-2xl border border-white/15 rounded-3xl shadow-2xl p-5 sm:p-6 pointer-events-auto z-50 max-h-[calc(100vh-85px)] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            <ul className="flex flex-col gap-4 sm:gap-5">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <button
                    onClick={() => goTo(s.id)}
                    className={`font-serif text-lg tracking-wide cursor-pointer w-full text-left flex items-center justify-between py-1 ${
                      active === s.id ? "text-white font-bold" : "text-zinc-400"
                    }`}
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight size={16} className={active === s.id ? "text-[#e5a93c]" : "opacity-40"} />
                  </button>
                </li>
              ))}
              <li className="pt-3 border-t border-white/10">
                <button
                  onClick={() => {
                    setOpen(false);
                    openResumeModal();
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#dc2626] to-[#e5a93c] text-white font-semibold text-sm cursor-pointer hover:opacity-90 transition-all shadow-lg shadow-[#dc2626]/20"
                >
                  <FileText size={15} />
                  View Resume
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
    </header>
  );
}
