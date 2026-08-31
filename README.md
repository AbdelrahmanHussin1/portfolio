# Abdelrahman — Developer Portfolio

A premium, animation-driven developer portfolio built with React, Vite, Tailwind CSS and GSAP.

## Stack

- **React 19 + Vite** — app shell and build tooling
- **Tailwind CSS v4** — design tokens and utility styling
- **GSAP + ScrollTrigger** — all animation (load-in sequences, scroll reveals, marquee, magnetic buttons, custom cursor)
- **Lenis** — smooth scrolling, synced to GSAP's ticker
- **React Router** — home page + full-screen project detail routes
- **Lucide React** — icons

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Project structure

```
src/
  components/     UI components (Hero, Navbar, Projects, CustomCursor, ...)
  animations/     Reusable GSAP animation utilities, kept out of components
  data/           Project, skills and experience content (edit here, not in JSX)
  pages/          Home and ProjectDetails route components
  utils/          Lenis setup + a lightweight text-splitting helper
```

## Notes

- Project visuals are generative CSS/SVG compositions (no stock imagery), one per project, keyed by accent color.
- The custom cursor and magnetic/hover interactions are disabled on touch devices and narrow viewports.
- All animation respects `prefers-reduced-motion: reduce` — GSAP timelines short-circuit to instant `set()` calls when it's on.
- Update your real project links, email and social URLs in `src/data/projects.js`, `src/components/Hero.jsx`, `src/components/Contact.jsx` and `src/components/Footer.jsx` before shipping.
