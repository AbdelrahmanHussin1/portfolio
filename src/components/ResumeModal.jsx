import { useEffect, useState } from "react";
import { X, Download, ExternalLink } from "lucide-react";
import { getLenis } from "../utils/useLenis";
import Logo from "./Logo";

export default function ResumeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener("open-resume-modal", handleOpen);
    return () => window.removeEventListener("open-resume-modal", handleOpen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      getLenis()?.stop();
    } else {
      document.body.style.overflow = "";
      getLenis()?.start();
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      getLenis()?.start();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 md:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl h-[92vh] max-h-[950px] bg-[#0d0d11] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10 bg-black/60 backdrop-blur-md gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <Logo size="sm" />
            <div className="min-w-0">
              <h2
                id="resume-modal-title"
                className="font-serif text-xs sm:text-base md:text-lg font-bold text-white tracking-wide truncate"
              >
                Abdelrahman Hussin <span className="text-gradient-brand hidden sm:inline">— Curriculum Vitae</span>
              </h2>
              <p className="text-[10px] sm:text-xs text-zinc-400 font-light hidden sm:block">
                Full Stack Software Engineer & Systems Architect
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <a
              href="/ABDELRAHMAN HUSSIN ALSAID_CV.pdf"
              target="_blank"
              rel="noreferrer"
              title="Open in new tab"
              className="p-2 sm:px-3.5 sm:py-2 rounded-full border border-white/20 hover:border-[#e5a93c]/50 text-zinc-200 hover:text-white bg-white/5 hover:bg-white/10 text-xs font-medium flex items-center gap-1.5 transition-all"
            >
              <ExternalLink size={14} className="text-[#e5a93c]" />
              <span className="hidden sm:inline">Open in Tab</span>
            </a>

            <a
              href="/ABDELRAHMAN HUSSIN ALSAID_CV.pdf"
              download="ABDELRAHMAN HUSSIN ALSAID_CV.pdf"
              className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-[#dc2626] to-[#e5a93c] text-white font-semibold text-xs sm:text-sm hover:opacity-90 transition-all flex items-center gap-1.5 shadow-lg shadow-[#dc2626]/20"
            >
              <Download size={13} />
              <span className="hidden xs:inline">Download</span>
            </a>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
              className="p-1.5 sm:p-2 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors ml-0.5 sm:ml-1 cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* PDF Viewer Body */}
        <div className="relative flex-1 w-full h-full bg-[#18181b] overflow-hidden">
          <iframe
            src="/ABDELRAHMAN HUSSIN ALSAID_CV.pdf#toolbar=1&navpanes=0"
            title="Curriculum Vitae Document Preview"
            className="w-full h-full border-0"
          />

          {/* Fallback Notice for Mobile or Non-supported PDF Frames */}
          <div className="sm:hidden absolute bottom-3 left-3 right-3 p-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/20 flex items-center justify-between text-xs">
            <span className="text-zinc-300">Viewing on mobile?</span>
            <a
              href="/ABDELRAHMAN HUSSIN ALSAID_CV.pdf"
              download="ABDELRAHMAN HUSSIN ALSAID_CV.pdf"
              className="font-semibold text-white underline underline-offset-2 flex items-center gap-1"
            >
              <Download size={13} /> Direct Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
