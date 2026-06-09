import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="bg-cream relative">
      <Navbar />
      <Hero />
      <About />
      <Work />
      <Projects />
      <Stack />
      <Education />
      <Achievements />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
