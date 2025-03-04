'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
    <section className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 bg-gray-100">
      {/* Left Content */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        className="md:w-1/2 text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-blue-900">{text}<span className="text-blue-900">|</span></h1>
        <p className="mt-4 text-lg text-gray-700">
          ACM Nagpur is a vibrant community of tech enthusiasts, fostering innovation and collaboration.
          Join us to explore new opportunities, engage in events, and grow with like-minded individuals.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-800 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
          Learn More
        </button>
      </motion.div>
      
      {/* Right Placeholder */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}
        className="md:w-1/2 flex justify-center mt-10 md:mt-0"
      >
        <div className="w-[500px] h-[500px] bg-gray-300 rounded-lg shadow-lg flex items-center justify-center text-gray-700 text-lg font-semibold">
          Image Placeholder
        </div>
      </motion.div>
    </section>
  );
}