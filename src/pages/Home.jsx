import Hero from "../components/Hero";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Contact from "../components/Contact";

export default function Home() {
  return (
    <div className="w-full min-h-screen">
      {/* 1. Hero: Black Section with Dynamic Motion Background */}
      <Hero />

      {/* 2. About: Pure White Section with Classic Typography & Cards */}
      <About />

      {/* 3. Projects: Deep Black Section with 16:10 Image Showcase Templates */}
      <Projects />

      {/* 4. Skills: Pure White Section with Clean Toolkit Cards */}
      <Skills />

      {/* 5. Experience: Deep Black Section with Glowing Timeline */}
      <Experience />

      {/* 6. Contact: Pure White Section with Direct Contact Card */}
      <Contact />
    </div>
  );
}
