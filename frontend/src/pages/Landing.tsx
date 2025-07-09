/* eslint-disable @typescript-eslint/no-unused-vars */
import { BackgroundElements } from "@/components/BackgroundElements";
import { Navbar } from "@/components/Navbar";
import { VercelV0Chat } from "@/components/ui/animated-ai-chat";
import { useAppContext } from "@/context/AppContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Landing() {
  const { prompt, setPrompt } = useAppContext();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);

  return (
    <div className="  bg-gradient-to-br from-blue-950 via-gray-950 to-blue-950 min-h-screen relative">
      <BackgroundElements />

      <motion.div
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Navbar scrollY={scrollY} />
      </motion.div>

      <div className=" w-full h-screen flex justify-center items-center">
        <VercelV0Chat prompt={prompt} setPrompt={setPrompt} />
      </div>
    </div>
  );
}

export default Landing;
