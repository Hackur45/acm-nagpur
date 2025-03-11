"use client";

import React, { use, useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import Image from "next/image";

// Allowed chapters
const allowedChapters = ["rcoem", "vnit", "ycce", "raisoni"];

const chapterEvents: Record<string, Array<{ id: number; name: string; description: string; tags: string[]; hostedBy: string }>> = {
  rcoem: [
    { id: 1, name: "AI/ML Bootcamp", description: "A beginner-friendly workshop on Machine Learning.", tags: ["AI/ML", "Workshop"], hostedBy: "ACM RCOEM" },
    { id: 2, name: "Web Dev Hackathon", description: "Compete in a full-stack hackathon.", tags: ["Web Dev", "Hackathon"], hostedBy: "ACM RCOEM" },
    { id: 3, name: "Blockchain Basics", description: "Learn the fundamentals of blockchain technology.", tags: ["Blockchain", "Tech Talk"], hostedBy: "ACM RCOEM" },
    { id: 4, name: "Competitive Programming Contest", description: "Sharpen your problem-solving skills.", tags: ["Coding", "Contest"], hostedBy: "ACM RCOEM" },
  ],
  vnit: [
    { id: 1, name: "Data Science Symposium", description: "A conference on AI and Data Science.", tags: ["AI", "Data Science"], hostedBy: "ACM VNIT" },
    { id: 2, name: "Cybersecurity Workshop", description: "Learn about ethical hacking.", tags: ["Security", "Workshop"], hostedBy: "ACM VNIT" },
    { id: 3, name: "IOT & Smart Systems", description: "A workshop on IoT and smart devices.", tags: ["IoT", "Workshop"], hostedBy: "ACM VNIT" },
  ],
  ycce: [
    { id: 1, name: "Cloud Computing Basics", description: "An introductory workshop on AWS and GCP.", tags: ["Cloud", "Workshop"], hostedBy: "ACM YCCE" },
    { id: 2, name: "Robotics Seminar", description: "A session on robotics and automation.", tags: ["Robotics", "Tech Talk"], hostedBy: "ACM YCCE" },
  ],
  raisoni: [
    { id: 1, name: "Game Development Jam", description: "Create a game in 24 hours!", tags: ["Game Dev", "Hackathon"], hostedBy: "ACM Raisoni" },
    { id: 2, name: "Python for AI", description: "A workshop on AI using Python.", tags: ["Python", "AI"], hostedBy: "ACM Raisoni" },
    { id: 3, name: "UI/UX Design Sprint", description: "A hands-on workshop on UI/UX fundamentals.", tags: ["Design", "Workshop"], hostedBy: "ACM Raisoni" },
    { id: 4, name: "AR/VR Innovations", description: "A session on AR/VR technologies.", tags: ["AR/VR", "Tech Talk"], hostedBy: "ACM Raisoni" },
    { id: 5, name: "Entrepreneurship in Tech", description: "A panel discussion on startups and innovation.", tags: ["Business", "Panel"], hostedBy: "ACM Raisoni" },
  ],
};


const NumberTicker = ({ value }: { value: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const interval = setInterval(() => {
        start += 1;
        setCount(start);
        if (start >= value) clearInterval(interval);
      }, 20);
    }
  }, [inView, value]);

  return (
    <motion.span ref={ref} className="text-5xl font-bold text-blue-700">
      {count}+
    </motion.span>
  );
};

export default function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const resolvedParams = use(params);
  const chapterSlug = decodeURIComponent(resolvedParams.chapter).toLowerCase();

  // Validate chapter
  if (!allowedChapters.includes(chapterSlug)) {
    return (
      <main className="w-full min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600">Chapter not found!</h1>
      </main>
    );
  }

  const chapterName = chapterSlug.toUpperCase();
  const events = chapterEvents[chapterSlug] || [];

  return (
    <main className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] md:h-[500px]">
        <Image src="/chapter.webp" alt="Chapter Image" layout="fill" objectFit="cover" className="rounded-b-3xl" />
      </section>

      {/* Chapter Name & Description */}
      <section id="about" className="max-w-5xl mx-auto text-center mt-8 px-6 md:px-12">
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-blue-900 capitalize"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {chapterName} Chapter
        </motion.h1>

        <div  className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
          <motion.p
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to the {chapterName} chapter of ACM Nagpur. We are committed to fostering a dynamic learning environment by organizing workshops, hackathons, and events to engage students in the latest technologies.
          </motion.p>
          <motion.p
            className="text-lg text-gray-700 leading-relaxed"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our chapter collaborates with industry professionals and researchers to provide hands-on experience and networking opportunities, ensuring that students stay ahead in the ever-evolving tech world.
          </motion.p>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden p-8">
        <InteractiveGridPattern className="absolute inset-0 h-full w-full" width={20} height={20} squares={[80, 80]} />

        <motion.h2
          className="relative z-10 mb-6 text-3xl font-bold text-center text-blue-600 md:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🚀 Explore Events at {chapterName}!
        </motion.h2>

        {/* Events Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
          {events.map((event) => (
            <motion.div
              key={event.id}
              className="bg-white p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer border border-gray-200"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
              <p className="text-gray-600 text-sm">{event.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {event.tags.map((tag, idx) => (
                  <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 text-sm mt-2">Hosted by: {event.hostedBy}</p>
            </motion.div>
          ))}
        </div>

        {/* See More Events Button */}
        <motion.div className="relative z-10 mt-8 flex justify-center">
          <Button className="px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
            See More Events →
          </Button>
        </motion.div>
      </section>

      {/* Number Ticker Section */}
      <section className="flex flex-col items-center justify-center bg-gray-100 py-12">
        <h3 className="text-3xl font-semibold text-gray-900">Total Events Hosted</h3>
        <NumberTicker value={events.length * 20} />
      </section>
    </main>
  );
}
