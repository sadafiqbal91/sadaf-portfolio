import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import Hero from './components/Hero';
import Projects from './components/Projects';
import FeaturedProject from './components/FeaturedProject';
import About from './components/About';
import Journey from './components/Journey';
import Skills from './components/Skills';
import Credentials from './components/Credentials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <FeaturedProject />
        <About />
        <Journey />
        <Skills />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
