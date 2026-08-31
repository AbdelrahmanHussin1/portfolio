import { useEffect, useRef } from "react";
import { gsap } from "../utils/useLenis";
import Logo from "./Logo";

export default function Loader({ onComplete }) {
  const rootRef = useRef(null);
  const barRef = useRef(null);
  const countRef = useRef(null);
  const nameRef = useRef(null);
  const initialRef = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduced) {
      onComplete();
      return;
    }

    const counter = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
          onComplete,
        });
      },
    });

    tl.fromTo(
      initialRef.current,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" }
    )
      .to(initialRef.current, { opacity: 0, duration: 0.3, delay: 0.25 })
      .fromTo(
        nameRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" },
        "-=0.1"
      )
      .fromTo(
        barRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power2.inOut",
          transformOrigin: "left center",
        },
        "-=0.2"
      )
      .to(
        counter,
        {
          val: 100,
          duration: 1.1,
          ease: "power2.inOut",
          onUpdate: () => {
            if (countRef.current) {
              countRef.current.textContent = String(
                Math.round(counter.val)
              ).padStart(3, "0");
            }
          },
        },
        "<"
      )
      .to({}, { duration: 0.2 });

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[200] bg-[#09090b] flex flex-col items-center justify-center"
    >
      <div className="relative h-20 flex items-center justify-center overflow-hidden">
        <div
          ref={initialRef}
          className="absolute flex items-center justify-center opacity-0"
        >
          <Logo size="lg" />
        </div>
        <span
          ref={nameRef}
          className="absolute font-serif text-xl sm:text-2xl font-bold tracking-widest text-white opacity-0 whitespace-nowrap"
        >
          ABDELRAHMAN <span className="text-[#dc2626]">HUSSIN</span>
        </span>
      </div>

      <div className="mt-8 w-48 h-[2px] bg-white/[0.1] overflow-hidden rounded-full">
        <div
          ref={barRef}
          className="h-full w-full bg-gradient-to-r from-[#dc2626] to-[#e5a93c] scale-x-0"
        />
      </div>

      <div className="mt-4 font-mono text-xs text-[#e5a93c] tracking-widest">
        <span ref={countRef}>000</span>
        <span className="ml-1 text-zinc-400">%</span>
      </div>
    </div>
  );
}
