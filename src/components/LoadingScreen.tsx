"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { assets } from "@/assets/assets";

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [isText1Visible, setIsText1Visible] = useState(false);
  const [isText2Visible, setIsText2Visible] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const timer1 = setTimeout(() => setIsText1Visible(true), 1000); // Show first text after 1s
    const timer2 = setTimeout(() => setIsText2Visible(true), 3000); // Show second text after 3s

    const totalDuration = 6000; 
    const timer3 = setTimeout(() => onLoadingComplete(), totalDuration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white">
      {/* Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={assets.loadingVideo} type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* First Fade-in Text */}
      {isText1Visible && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-4xl md:text-6xl font-bold text-center font-sans"
        >
          Welcome to ACM Nagpur
        </motion.h1>
      )}

      {/* Second Fade-in Text */}
      {isText2Visible && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-lg md:text-2xl font-semibold text-center mt-4 font-mono"
        >
          Welcome to Association of Computing Machinery, Nagpur Chapter
        </motion.h2>
      )}
    </div>
  );
}
