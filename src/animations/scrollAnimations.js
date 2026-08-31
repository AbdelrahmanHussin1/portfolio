import { gsap, ScrollTrigger } from "../utils/useLenis";
import { splitWords } from "../utils/splitText";

const isReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Fades + lifts an element in as it enters the viewport.
 */
export function revealOnScroll(el, opts = {}) {
  if (!el) return;
  const reduced = isReduced();
  const { y = 18, delay = 0, start = "top 95%", once = true, stagger = 0.05 } = opts;

  if (reduced) {
    gsap.set(el, { opacity: 1, y: 0 });
    return;
  }

  gsap.fromTo(
    el,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      delay,
      ease: "power2.out",
      stagger,
      scrollTrigger: {
        trigger: el,
        start,
        fastScrollEnd: true,
        toggleActions: once ? "play none none none" : "play none none reverse",
      },
    }
  );
}

/**
 * Word-by-word reveal for headings as they scroll into view.
 */
export function revealHeadingOnScroll(el, opts = {}) {
  if (!el) return;
  const reduced = isReduced();
  if (reduced) {
    gsap.set(el, { opacity: 1 });
    return;
  }
  const words = splitWords(el);
  gsap.set(el, { opacity: 1 });
  gsap.fromTo(
    words,
    { yPercent: 100, opacity: 0 },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.03,
      ease: "power4.out",
      scrollTrigger: {
        trigger: el,
        start: opts.start || "top 88%",
      },
    }
  );
}

/**
 * Clip-path image reveal — the signature "image uncovers itself" treatment
 * used across project and about imagery.
 */
export function revealImage(wrapperEl, imgEl, opts = {}) {
  if (!wrapperEl || !imgEl) return;
  const reduced = isReduced();
  if (reduced) {
    gsap.set(imgEl, { scale: 1, opacity: 1 });
    return;
  }
  gsap.fromTo(
    wrapperEl,
    { clipPath: "inset(0 0 100% 0)" },
    {
      clipPath: "inset(0 0 0% 0)",
      duration: 1.1,
      ease: "power4.inOut",
      scrollTrigger: { trigger: wrapperEl, start: opts.start || "top 85%" },
    }
  );
  gsap.fromTo(
    imgEl,
    { scale: 1.15, opacity: 0.6 },
    {
      scale: 1,
      opacity: 1,
      duration: 1.3,
      ease: "power3.out",
      scrollTrigger: { trigger: wrapperEl, start: opts.start || "top 85%" },
    }
  );
}

/**
 * A vertical progress line that draws itself from top to bottom of a
 * container as the user scrolls through it (used by Experience timeline).
 */
export function drawLineOnScroll(lineEl, containerEl) {
  if (!lineEl || !containerEl) return;
  const reduced = isReduced();
  if (reduced) {
    gsap.set(lineEl, { scaleY: 1 });
    return;
  }
  gsap.fromTo(
    lineEl,
    { scaleY: 0 },
    {
      scaleY: 1,
      ease: "none",
      transformOrigin: "top center",
      scrollTrigger: {
        trigger: containerEl,
        start: "top 60%",
        end: "bottom 40%",
        scrub: 0.6,
      },
    }
  );
}

/**
 * Animates a numeric counter up when it enters the viewport.
 */
export function animateCount(el, target, opts = {}) {
  if (!el) return;
  const reduced = isReduced();
  if (reduced) {
    el.textContent = `${opts.prefix || ""}${target}${opts.suffix || ""}`;
    return;
  }
  const obj = { val: 0 };
  gsap.to(obj, {
    val: target,
    duration: 1.6,
    ease: "power2.out",
    scrollTrigger: { trigger: el, start: "top 90%" },
    onUpdate: () => {
      el.textContent = `${opts.prefix || ""}${Math.round(obj.val)}${
        opts.suffix || ""
      }`;
    },
  });
}

export { gsap, ScrollTrigger, isReduced };
