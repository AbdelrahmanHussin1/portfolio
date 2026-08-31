export default function Logo({ size = "md", withText = false, className = "" }) {
  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const chosenSize = sizeClasses[size] || sizeClasses.md;

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Emblem SVG Icon */}
      <div className={`relative ${chosenSize} shrink-0 group`}>
        {/* Ambient Glow */}
        <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#dc2626]/30 via-[#e5a93c]/20 to-[#dc2626]/30 blur-sm opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Sharp SVG Monogram */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative w-full h-full drop-shadow-md transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Rounded Shield Frame */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            className="fill-[#0c0c10] stroke-white/15"
            strokeWidth="3"
          />
          {/* Subtle Accent Glow Ring */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="22"
            stroke="url(#emblem-border-grad)"
            strokeWidth="2"
            strokeOpacity="0.8"
          />

          {/* Letter 'A' Geometric Architectural Wing (Crimson Red) */}
          <path
            d="M24 72L44 26H53L35 72H24Z"
            fill="url(#crimson-grad)"
          />
          <path
            d="M34 54H62L59 61H31L34 54Z"
            fill="url(#crimson-grad)"
          />

          {/* Letter 'H' Geometric Pillar & Crown (Imperial Gold) */}
          <path
            d="M58 26L74 26L56 72H40L58 26Z"
            fill="url(#gold-grad)"
            fillOpacity="0.95"
          />
          <path
            d="M66 26H77L61 72H50L66 26Z"
            fill="url(#gold-light-grad)"
          />

          {/* Precision Center Diamond Spark */}
          <circle cx="50" cy="50" r="3" fill="#ffffff" className="drop-shadow-[0_0_6px_#fff]" />

          {/* Gradients */}
          <defs>
            <linearGradient
              id="crimson-grad"
              x1="20"
              y1="24"
              x2="60"
              y2="76"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#ef4444" />
              <stop offset="0.6" stopColor="#dc2626" />
              <stop offset="1" stopColor="#991b1b" />
            </linearGradient>

            <linearGradient
              id="gold-grad"
              x1="40"
              y1="24"
              x2="78"
              y2="74"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fbbf24" />
              <stop offset="0.5" stopColor="#e5a93c" />
              <stop offset="1" stopColor="#b45309" />
            </linearGradient>

            <linearGradient
              id="gold-light-grad"
              x1="50"
              y1="26"
              x2="77"
              y2="72"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fef08a" />
              <stop offset="1" stopColor="#d97706" />
            </linearGradient>

            <linearGradient
              id="emblem-border-grad"
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#dc2626" />
              <stop offset="0.5" stopColor="rgba(255,255,255,0.2)" />
              <stop offset="1" stopColor="#e5a93c" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Optional Brand Typography */}
      {withText && (
        <div className="flex flex-col text-left">
          <span className="font-serif text-sm font-semibold tracking-wide text-white leading-none flex items-center gap-1.5">
            <span>Abdelrahman Hussin</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#dc2626]" />
          </span>
          <span className="text-[10px] text-zinc-400 tracking-wider font-light mt-0.5 flex items-center gap-1">
            <span>Software Engineer</span>
            <span className="text-[#e5a93c] font-medium">• Systems</span>
          </span>
        </div>
      )}
    </div>
  );
}
