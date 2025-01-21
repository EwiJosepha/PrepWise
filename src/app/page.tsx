import Contact from "@/components/Contact";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/hero-section/hero";
import Testimonials from "@/components/Testimonials";
import Video from "@/components/Video";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features/>
      <Video />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
}
