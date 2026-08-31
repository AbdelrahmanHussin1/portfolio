import { useEffect, useRef, useState } from "react";
import {
  createCursorInterpolators,
  growCursor,
  resetCursor,
} from "../animations/cursorAnimations";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [label, setLabel] = useState("");
  const [enabled] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(pointer: fine)").matches && window.innerWidth >= 1024;
  });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-active");

    const { dotX, dotY, ringX, ringY } = createCursorInterpolators(
      dotRef.current,
      ringRef.current
    );

    const move = (e) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    };

    const handleOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        growCursor(ringRef.current, target.dataset.cursorScale || 2.2);
        setLabel(target.dataset.cursor === "text" ? "" : target.dataset.cursor);
        if (target.dataset.cursorText) setLabel(target.dataset.cursorText);
      }
    };
    const handleOut = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        resetCursor(ringRef.current);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", handleOver);
    document.addEventListener("mouseout", handleOut);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", handleOver);
      document.removeEventListener("mouseout", handleOut);
      document.documentElement.classList.remove("cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-white pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-10 h-10 rounded-full border border-white/40 pointer-events-none z-[100] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center backdrop-blur-[0.5px]"
      >
        {label && (
          <span className="text-[9px] tracking-widest uppercase text-white font-medium whitespace-nowrap">
            {label}
          </span>
        )}
      </div>
    </>
  );
}
