import { gsap } from "../utils/useLenis";

/**
 * Creates quickTo-based interpolators for the dot (fast) and ring (laggy)
 * cursor elements. The ring intentionally trails the dot for the
 * "smooth follow with lag" feel requested in the brief.
 */
export function createCursorInterpolators(dotEl, ringEl) {
  const dotX = gsap.quickTo(dotEl, "x", { duration: 0.12, ease: "power3" });
  const dotY = gsap.quickTo(dotEl, "y", { duration: 0.12, ease: "power3" });
  const ringX = gsap.quickTo(ringEl, "x", { duration: 0.45, ease: "power3" });
  const ringY = gsap.quickTo(ringEl, "y", { duration: 0.45, ease: "power3" });

  return { dotX, dotY, ringX, ringY };
}

export function growCursor(ringEl, scale = 2.6) {
  if (!ringEl) return;
  gsap.to(ringEl, { scale, duration: 0.35, ease: "power3.out" });
}

export function resetCursor(ringEl) {
  if (!ringEl) return;
  gsap.to(ringEl, { scale: 1, duration: 0.35, ease: "power3.out" });
}
