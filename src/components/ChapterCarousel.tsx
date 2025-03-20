"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Chapter {
  id: number;
  name: string;
  description: string;
}

const chapters: Chapter[] = [
  { id: 1, name: "ACM RCOEM Student Chapter", description: "Empowering students with technical workshops and hackathons." },
  { id: 2, name: "ACM VNIT Student Chapter", description: "Advancing technology with coding contests and industry talks." },
  { id: 3, name: "ACM YCCE Student Chapter", description: "Bridging students with professionals in software development." },
  { id: 4, name: "ACM Symbiosis Student Chapter", description: "Fostering AI, ML, and cybersecurity enthusiasts." },
  { id: 5, name: "ACM IIT Bombay Student Chapter", description: "Promoting research and innovation in computing disciplines." },
  { id: 6, name: "ACM IIIT Hyderabad Student Chapter", description: "Encouraging open-source contributions and tech talks." },
  { id: 7, name: "ACM NIT Trichy Student Chapter", description: "Providing hands-on experience with competitive programming." },
  { id: 8, name: "ACM VIT Student Chapter", description: "Organizing hackathons, coding challenges, and industry collaborations." },
  { id: 9, name: "ACM PESIT Student Chapter", description: "Connecting students with industry leaders and mentors." },
  { id: 10, name: "ACM BITS Pilani Student Chapter", description: "Exploring emerging technologies through research and projects." },
  { id: 11, name: "ACM SRM Student Chapter", description: "Encouraging innovation in software engineering and web development." },
  { id: 12, name: "ACM Manipal Student Chapter", description: "Hosting cybersecurity and ethical hacking workshops." },
  { id: 13, name: "ACM DAIICT Student Chapter", description: "Building a strong developer community through collaboration." },
  { id: 14, name: "ACM MIT Pune Student Chapter", description: "Nurturing tech enthusiasts with hands-on development projects." },
];

export default function ChapterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      
      // Initial check
      checkMobile();
      
      // Add event listener for resize
      window.addEventListener("resize", checkMobile);
      
      // Clean up
      return () => window.removeEventListener("resize", checkMobile);
    }
  }, []);

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % chapters.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + chapters.length) % chapters.length);

  const navigateToDetails = (chapter: Chapter) => {
    const slug = chapter.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/chapters/${slug}`);
  };

  const getCardPosition = (index: number) => {
    const total = chapters.length;
    const diff = (index - activeIndex + total) % total;
    
    // On mobile, only show 3 cards (the active one and one on each side)
    if (isMobile && diff > 1 && diff < total - 1) {
      return { zIndex: -1, rotation: 0, scale: 0, opacity: 0, x: 0 };
    }
  
    if (diff === 0) return { 
      zIndex: 20, 
      rotation: 0, 
      scale: isMobile ? 1.05 : 1.25, 
      opacity: 1, 
      x: 0 
    };
  
    const isRight = diff <= total / 2;
    const distanceFromCenter = isRight ? diff : total - diff;
  
    // Adjust positioning for mobile
    const x = isMobile 
      ? (isRight ? 80 : -80) 
      : (isRight ? 150 + (distanceFromCenter - 1) * 30 : -150 - (distanceFromCenter - 1) * 30);
    
    const rotation = isMobile
      ? (isRight ? 3 : -3)
      : (isRight ? 6 + (distanceFromCenter - 1) * 3 : -6 - (distanceFromCenter - 1) * 3);
    
    const scale = isMobile
      ? (distanceFromCenter === 1 ? 0.7 : 0)
      : Math.max(0.8 - (distanceFromCenter - 1) * 0.1, 0.5);
    
    const opacity = isMobile
      ? (distanceFromCenter === 1 ? 0.6 : 0)
      : Math.max(0.6 - (distanceFromCenter - 1) * 0.1, 0.2);
    
    const zIndex = 10 - distanceFromCenter;
  
    return { zIndex, rotation, scale, opacity, x };
  };
  
  // Truncate chapter name for mobile
  const formatChapterName = (name: string) => {
    if (!isMobile) return name;
    
    // For mobile, keep just the institution name
    return name.replace("ACM ", "").replace(" Student Chapter", "");
  };
  
  // Truncate description for mobile
  const formatDescription = (desc: string) => {
    if (!isMobile) return desc;
    
    // For mobile, truncate to first 30 characters + ellipsis
    return desc.length > 30 ? `${desc.substring(0, 30)}...` : desc;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-4 md:py-12 px-2 md:px-4">
      <h2 className="text-xl md:text-3xl font-bold text-center text-gray-800 mb-4 md:mb-6">ACM Student Chapters</h2>

      <div className="relative flex items-center justify-center overflow-hidden h-60 md:h-96">
        {chapters.map((chapter, i) => {
          const { zIndex, rotation, scale, opacity, x } = getCardPosition(i);
          return (
            <motion.div
              key={chapter.id}
              className="absolute w-64 md:w-80 h-48 md:h-64 bg-white shadow-xl rounded-xl md:rounded-2xl flex flex-col items-center justify-center p-3 md:p-6 text-center cursor-pointer transition-all duration-300"
              style={{ 
                zIndex, 
                transform: `translateX(${x}px) rotate(${rotation}deg) scale(${scale})`, 
                opacity 
              }}
              onClick={() => (i !== activeIndex ? setActiveIndex(i) : null)}
            >
              <h3 className="text-base md:text-xl font-bold text-blue-700">
                {formatChapterName(chapter.name)}
              </h3>
              <motion.p className="text-gray-600 text-xs md:text-md mt-2 md:mt-3">
                {formatDescription(chapter.description)}
              </motion.p>
              {i === activeIndex && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToDetails(chapter);
                  }}
                  className="mt-3 md:mt-5 bg-blue-600 text-white hover:bg-blue-700 px-4 md:px-6 py-1 md:py-2 rounded-md md:rounded-lg text-xs md:text-sm"
                >
                  View Details
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-3 md:gap-6 mt-4 md:mt-8">
        <Button onClick={prevSlide} className="px-3 md:px-5 py-2 md:py-3 bg-gray-300 hover:bg-gray-400 rounded-md md:rounded-lg text-sm md:text-base">←</Button>
        <Button onClick={nextSlide} className="px-3 md:px-5 py-2 md:py-3 bg-gray-300 hover:bg-gray-400 rounded-md md:rounded-lg text-sm md:text-base">→</Button>
      </div>
    </div>
  );
}