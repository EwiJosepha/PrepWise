import InterviewSuggestionBox from "@/core/landing/interview-suggestion";
import Features from "@/core/landing/Features";
import Footer from "@/components/Footer";
import Hero from "@/core/landing/hero-section/hero";
import Testimonials from "@/core/landing/Testimonials";
import CallToAction from "@/core/landing/action-call";
import WhyChooseUs from "@/core/landing/why-chose-us";
import WalkingAnimation from "@/core/landing/animate-page/animate";

export default function Home() {
  return (
    <div className="bg-secondary">
      <Hero />
      <WalkingAnimation />
      <InterviewSuggestionBox />
      <Features/>
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </div>
  );
}
