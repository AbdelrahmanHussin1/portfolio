import { Analytics } from "@vercel/analytics/react";
import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useLenis, getLenis, ScrollTrigger } from "./utils/useLenis";
import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ResumeModal from "./components/ResumeModal";
import Home from "./pages/Home";

const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));

// Scrolls to top on every route change, or to the matching #section id
// when arriving with a hash (e.g. nav link clicked from a sub-page).
function ScrollToTopOnRouteChange() {
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      const tryScroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };
      if (!tryScroll()) {
        const frame = requestAnimationFrame(tryScroll);
        return () => cancelAnimationFrame(frame);
      }
      return;
    }
    getLenis()?.scrollTo(0, { immediate: true });
    window.scrollTo(0, 0);
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [location.pathname, location.hash]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(true);
  useLenis();

  return (
    <div className="relative min-h-screen bg-[#09090b] text-[#f4f4f6]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[300] focus:px-4 focus:py-2 focus:rounded-full focus:bg-white focus:text-black focus:text-sm focus:font-semibold"
      >
        Skip to content
      </a>
      <div className="grain" />
      <ResumeModal />
      <Navbar />
      <ScrollToTopOnRouteChange />

      {loading && <Loader onComplete={() => setLoading(false)} />}

      <main id="main-content" className="w-full">
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
          </Routes>
        </Suspense>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}
