import InterviewSuggestionBox from "@/components/interview-suggestion";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Hero from "@/components/hero-section/hero";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/action-call";

export default function Home() {
  return (
    <div className="bg-secondary">
      <Hero />
      <InterviewSuggestionBox />
      <Features/>
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
