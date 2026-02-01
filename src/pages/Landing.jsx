import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Comparison from "../components/landing/Comparison";
import CTA from "../components/landing/CTA";
import Footer from "../components/landing/Footer";

const Landing = () => {
  return (
    <div className="bg-[#0b0f1a] text-white overflow-x-hidden">
      <Hero />
      <Features />
      <HowItWorks />
      <Comparison />
      <CTA />
      <Footer />
    </div>
  );
};

export default Landing;
