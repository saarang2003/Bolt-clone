
import { Navbar } from "../components/Navbar";
import { BackgroundElements } from "../components/BackgroundElements";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";
import { HeroSection } from "../components/heroSection";
import { FeaturesSection } from "../components/FeatureSection";
import HowitWork from "../components/Works";
import { Footer } from "../components/Footer";


export function Home() {
  const { prompt, setPrompt } = useAppContext();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return (
    <div className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 min-h-screen relative">
      <BackgroundElements />

      <Navbar scrollY={scrollY} />

      <HeroSection prompt={prompt} setPrompt={setPrompt} />

      <FeaturesSection />
      
      <HowitWork />


      <Footer />
    </div>
  );
}