import { useState } from "react";
import { Layers, Image as ImageIcon, Sparkles, Activity, Stethoscope, Utensils, Globe } from "lucide-react";

const PROJECT_ICONS = {
  "mind-sense": Activity,
  "clinic-saas": Stethoscope,
  ayounk: Layers,
  "restaurant-os": Utensils,
  sysora: Globe,
};

export default function ProjectVisual({
  project,
  id,
  image,
  name,
  category,
  className = "",
  aspectRatio = "aspect-[16/10]",
  accentFrom = "#dc2626",
  accentTo = "#e5a93c",
}) {
  const [imgError, setImgError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const projectId = project?.id || id || "project";
  const projectImg = project?.image || image;
  const projectName = project?.name || name || "Project";
  const projectCat = project?.category || category || "Case Study";
  const IconComponent = PROJECT_ICONS[projectId] || Sparkles;

  const showRealImage = projectImg && !imgError;

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0c0c10] group ${aspectRatio} ${className}`}
    >
      {/* Ambient diagonal gradient background */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${accentFrom}18 0%, transparent 50%, ${accentTo}12 100%)`,
        }}
      />

      {/* Subtle dot-grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(${accentFrom}60 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {showRealImage ? (
        <>
          <img
            src={projectImg}
            alt={projectName}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full h-full object-cover object-top transition-all duration-700 ease-out group-hover:scale-105 ${
              loaded ? "opacity-100 filter grayscale contrast-110 hover:filter-none" : "opacity-0"
            }`}
          />
          {/* Gradient vignette on image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />
        </>
      ) : null}

      {/* Fallback Template — colorful brand design */}
      {(!showRealImage || !loaded) && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: accentFrom, boxShadow: `0 0 8px ${accentFrom}` }} />
              <span className="w-2.5 h-2.5 rounded-full opacity-60" style={{ background: accentTo }} />
              <span className="w-2.5 h-2.5 rounded-full opacity-30 bg-white" />
              <span className="ml-2 text-[11px] uppercase tracking-widest text-zinc-300 font-semibold">
                {projectCat}
              </span>
            </div>
            <div
              className="p-2 rounded-lg border text-zinc-300"
              style={{
                background: `${accentFrom}15`,
                borderColor: `${accentFrom}40`,
              }}
            >
              <IconComponent size={16} />
            </div>
          </div>

          {/* Center icon + title */}
          <div className="my-auto flex flex-col items-center justify-center text-center py-4">
            {/* Icon with brand glow */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110"
              style={{
                background: `linear-gradient(135deg, ${accentFrom}25, ${accentTo}20)`,
                border: `1px solid ${accentFrom}50`,
                boxShadow: `0 0 24px ${accentFrom}30`,
              }}
            >
              <IconComponent size={28} style={{ color: accentTo }} />
            </div>
            <h4 className="font-serif text-xl md:text-2xl font-bold text-white tracking-wide">
              {projectName}
            </h4>
            <p className="text-xs text-zinc-400 mt-1.5 max-w-[220px] font-light">
              System Architecture & UI Preview
            </p>

            {/* Decorative line */}
            <div
              className="mt-4 h-[1px] w-24 rounded-full opacity-50"
              style={{ background: `linear-gradient(90deg, ${accentFrom}, ${accentTo})` }}
            />
          </div>

          {/* Bottom bar */}
          <div
            className="flex items-center justify-between pt-3 text-[11px] text-zinc-400"
            style={{ borderTop: `1px solid ${accentFrom}20` }}
          >
            <span className="flex items-center gap-1.5">
              <ImageIcon size={12} />
              Project Preview
            </span>
            <span
              className="font-mono font-bold text-[10px]"
              style={{ color: accentTo }}
            >
              16:9 FRAME
            </span>
          </div>
        </div>
      )}

      {/* Frame border with brand color on hover */}
      <div
        className="absolute inset-0 rounded-none pointer-events-none transition-all duration-500"
        style={{ border: `1px solid transparent` }}
      />
    </div>
  );
}
