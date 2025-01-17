import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/hero-section/hero";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features/>
      <Testimonials />
      <Footer />
    </div>
  );
}
