'use client';

import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { assets } from "@/assets/assets"; // Importing assets
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({ subsets: ["latin"], weight: "700" });

export default function AboutUs() {
  return (
    <section
      id="about"
      className="relative w-full min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={assets.backgroundVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 max-w-5xl">
        {/* Glitch Effect Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className={`text-6xl md:text-8xl ${orbitron.className} glitch`}
        >
          ABOUT ACM NAGPUR
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="mt-4 text-2xl md:text-3xl text-purple-300 tracking-widest neon-text"
        >
          Empowering Innovators, Connecting Minds.
        </motion.h2>

        {/* Description with Floating Animation */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          ACM Nagpur is at the forefront of technological advancements, bringing together passionate 
          developers, researchers, and enthusiasts to shape the future of computing.  
          From hackathons to tech summits, we provide a platform for learning, networking, and innovation.  
        </motion.p>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="mt-4 text-lg md:text-xl text-gray-300 leading-relaxed"
        >
          Be part of a global community dedicated to excellence in technology. Join us in redefining possibilities.
        </motion.p>

        {/* Buttons with Hover Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap gap-6 justify-center"
        >
          <Link href="/events">
            <Button className="bg-purple-600 hover:bg-purple-800 text-lg px-8 py-3 transition-all duration-300">
              Explore Events
            </Button>
          </Link>
          <Link href="/join">
            <Button variant="outline" className="text-lg border-purple-400 hover:border-purple-600 px-8 py-3">
              Join Us
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Glitch & Neon Effects (CSS) */}
      <style jsx>{`
        .glitch {
          position: relative;
          color: #fff;
          text-shadow: 0 0 5px #9400d3, 0 0 10px #9400d3, 0 0 20px #9400d3;
          animation: glitch 1.5s infinite alternate;
        }

        @keyframes glitch {
          0% { text-shadow: 2px 2px 0px #ff00ff, -2px -2px 0px #00ffff; }
          50% { text-shadow: -2px -2px 0px #ff00ff, 2px 2px 0px #00ffff; }
          100% { text-shadow: 2px -2px 0px #ff00ff, -2px 2px 0px #00ffff; }
        }

        .neon-text {
          text-shadow: 0 0 5px #e900ff, 0 0 10px #e900ff, 0 0 20px #e900ff;
          animation: neonGlow 1.5s infinite alternate;
        }

        @keyframes neonGlow {
          0% { text-shadow: 0 0 5px #e900ff, 0 0 10px #e900ff; }
          50% { text-shadow: 0 0 8px #e900ff, 0 0 15px #ff00ff; }
          100% { text-shadow: 0 0 5px #e900ff, 0 0 10px #e900ff; }
        }
      `}</style>
    </section>
  );
}
