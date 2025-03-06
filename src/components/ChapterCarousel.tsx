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
  const [index, setIndex] = useState(0);
  const router = useRouter();

  const nextSlide = () => setIndex((prev) => (prev + 1) % chapters.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + chapters.length) % chapters.length);

  const navigateToDetails = (chapter: Chapter) => {
    const slug = chapter.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/chapters/${slug}`);
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto py-12">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">ACM Student Chapters</h2>

      <div className="relative flex items-center justify-center overflow-hidden h-72">
        {chapters.map((chapter, i) => {
          let position = "hidden";
          if (i === index) position = "center";
          else if (i === (index - 1 + chapters.length) % chapters.length) position = "left";
          else if (i === (index + 1) % chapters.length) position = "right";

          return (
            <motion.div
              key={chapter.id}
              className={`absolute w-72 h-56 bg-white shadow-lg rounded-xl flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-transform duration-300 
                ${position === "center" ? "scale-110 z-20" : "scale-90 opacity-60"} 
                ${position === "left" ? "-translate-x-36 -rotate-6 z-10" : ""} 
                ${position === "right" ? "translate-x-36 rotate-6 z-10" : ""}`}
              whileHover={{ scale: 1.15 }}
            >
              <h3 className="text-lg font-bold text-blue-700">{chapter.name}</h3>
              <motion.p className="text-gray-600 text-sm mt-2">{chapter.description}</motion.p>
              <Button 
                onClick={() => navigateToDetails(chapter)}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                View Details
              </Button>
            </motion.div>
          );
        })}
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button onClick={prevSlide} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">←</Button>
        <Button onClick={nextSlide} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">→</Button>
      </div>
    </div>
  );
}
