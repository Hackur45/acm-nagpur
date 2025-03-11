'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { FlickeringGrid } from "@/components/magicui/flickering-grid";

const words = ["Welcome to ACM Nagpur", "Empowering Developers", "Innovating the Future"];

export default function HeroSection() {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const handleTyping = () => {
      if (!isDeleting && charIndex < words[wordIndex].length) {
        setText((prev) => prev + words[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else if (isDeleting && charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else if (!isDeleting && charIndex === words[wordIndex].length) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    };

    const typingInterval = setTimeout(handleTyping, isDeleting ? 50 : 100);
    return () => clearTimeout(typingInterval);
  }, [charIndex, isDeleting, wordIndex]);

  return (
    <div id="top" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Flickering Grid Background */}
      <FlickeringGrid
        className="absolute inset-0 z-0 opacity-40 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
        squareSize={4}
        gridGap={6}
        color="#3B82F6"
        maxOpacity={0.7} // Increased for better visibility
        flickerChance={0.1}
        height={800}
        width={800}
      />

      {/* Hero Content */}
      <section className="relative z-10 w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20">
        {/* Left Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="md:w-1/2 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-[#0A2A43]">
            {text}
            <span className="text-[#3B82F6]">|</span> {/* Blue accent */}
          </h1>
          <p className="mt-4 text-lg text-[#374151]">
            ACM Nagpur is a vibrant community of tech enthusiasts, fostering innovation and collaboration.
            Join us to explore new opportunities, engage in events, and grow with like-minded individuals.
          </p>
          <button className="mt-6 px-6 py-3 bg-[#0A2A43] text-white rounded-lg shadow-lg hover:bg-[#0C3A5D] transition">
            Learn More
          </button>
        </motion.div>
        
        {/* Right Section - Image */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center mt-10 md:mt-0"
        >
          <Image 
            src={assets.heroImage} 
            alt="ACM Nagpur Banner"
            width={500}
            height={500}
            className="rounded-lg shadow-lg"
          />
        </motion.div>
      </section>
    </div>
  );
}
