"use client";

import { useState } from "react";
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
  const router = useRouter();

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % chapters.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + chapters.length) % chapters.length);

  const navigateToDetails = (chapter: Chapter) => {
    const slug = chapter.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/chapters/${slug}`);
  };

  const getCardPosition = (index: number) => {
    const total = chapters.length;
    const diff = (index - activeIndex + total) % total;
  
    if (diff === 0) return { zIndex: 20, rotation: 0, scale: 1.25, opacity: 1, x: 0 };
  
    const isRight = diff <= total / 2;
    const distanceFromCenter = isRight ? diff : total - diff;
  
    const x = isRight ? 150 + (distanceFromCenter - 1) * 30 : -150 - (distanceFromCenter - 1) * 30;
    const rotation = isRight ? 6 + (distanceFromCenter - 1) * 3 : -6 - (distanceFromCenter - 1) * 3;
    const scale = Math.max(0.8 - (distanceFromCenter - 1) * 0.1, 0.5);
    const opacity = Math.max(0.6 - (distanceFromCenter - 1) * 0.1, 0.2);
    const zIndex = 10 - distanceFromCenter;
  
    return { zIndex, rotation, scale, opacity, x };
  };
  

  return (
    <div className="relative w-full max-w-6xl mx-auto py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">ACM Student Chapters</h2>

      <div className="relative flex items-center justify-center overflow-hidden h-96">
        {chapters.map((chapter, i) => {
          const { zIndex, rotation, scale, opacity, x } = getCardPosition(i);
          return (
            <motion.div
              key={chapter.id}
              className="absolute w-80 h-64 bg-white shadow-xl rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300"
              style={{ zIndex, transform: `translateX(${x}px) rotate(${rotation}deg) scale(${scale})`, opacity }}
              onClick={() => (i !== activeIndex ? setActiveIndex(i) : null)}
            >
              <h3 className="text-xl font-bold text-blue-700">{chapter.name}</h3>
              <motion.p className="text-gray-600 text-md mt-3">{chapter.description}</motion.p>
              {i === activeIndex && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateToDetails(chapter);
                  }}
                  className="mt-5 bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 rounded-lg"
                >
                  View Details
                </Button>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-6 mt-8">
        <Button onClick={prevSlide} className="px-5 py-3 bg-gray-300 hover:bg-gray-400 rounded-lg">←</Button>
        <Button onClick={nextSlide} className="px-5 py-3 bg-gray-300 hover:bg-gray-400 rounded-lg">→</Button>
      </div>
    </div>
  );
}
