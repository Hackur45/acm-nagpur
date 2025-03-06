"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";

// Define TypeScript Interface for Events
interface Event {
  id: number;
  name: string;
  description: string;
  tags: string[];
  hostedBy: string;
}

// Sample Events Array
const events: Event[] = [
  { id: 1, name: "AI/ML Bootcamp", description: "A beginner-friendly workshop on Machine Learning.", tags: ["AI/ML", "Workshop"], hostedBy: "ACM Professional Chapter" },
  { id: 2, name: "Blockchain Hackathon", description: "Build decentralized applications in a 48-hour hackathon.", tags: ["Blockchain", "Hackathon"], hostedBy: "ACM RCOEM Student Chapter" },
  { id: 3, name: "Web Development Summit", description: "A hands-on workshop on full-stack web development.", tags: ["Web Dev", "Workshop"], hostedBy: "ACM Professional Chapter" },
  { id: 4, name: "Cybersecurity CTF", description: "A Capture the Flag event to test hacking skills.", tags: ["Cybersecurity", "CTF"], hostedBy: "ACM VNIT Student Chapter" },
  { id: 5, name: "Cloud Computing Symposium", description: "Learn about AWS, Azure, and cloud architectures.", tags: ["Cloud", "Conference"], hostedBy: "ACM Professional Chapter" },
  { id: 6, name: "Competitive Coding Contest", description: "Solve complex problems and compete with coders.", tags: ["Coding", "Contest"], hostedBy: "ACM YCCE Student Chapter" },
  { id: 7, name: "UI/UX Design Workshop", description: "A session on creating user-friendly web interfaces.", tags: ["UI/UX", "Workshop"], hostedBy: "ACM Symbiosis Student Chapter" },
  { id: 8, name: "Data Science Bootcamp", description: "An intensive bootcamp on data analytics & AI.", tags: ["Data Science", "Bootcamp"], hostedBy: "ACM Professional Chapter" },
  { id: 9, name: "Game Development Hackathon", description: "A game dev contest for indie game developers.", tags: ["Game Dev", "Hackathon"], hostedBy: "ACM VNIT Student Chapter" },
  { id: 10, name: "Quantum Computing Seminar", description: "Learn about the future of computing with Quantum mechanics.", tags: ["Quantum Computing", "Seminar"], hostedBy: "ACM Professional Chapter" },
];

export default function EventsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const router = useRouter();

  // Filtered Events Based on Selection
  const filteredEvents =
    selectedCategory === "All"
      ? events
      : events.filter((event) =>
          selectedCategory === "Professional"
            ? event.hostedBy === "ACM Professional Chapter"
            : event.hostedBy.includes("Student Chapter")
        );

  // Animation (Smooth Fade-In from Bottom)
  const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <div id="events" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Background Pattern */}
      <InteractiveGridPattern
        className={cn(
          "absolute inset-0 h-full w-full [mask-image:radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
        width={20}
        height={20}
        squares={[80, 80]}
        squaresClassName="hover:fill-blue-500"
      />

      {/* Section Heading */}
      <h2 className="relative z-10 mb-6 text-3xl font-bold text-center text-blue-600 md:text-4xl">
        🚀 Explore the Latest Tech Events at ACM Nagpur!
      </h2>

      {/* Category Selection Buttons */}
      <div className="relative z-10 mb-6 flex gap-4">
        <Button
          onClick={() => setSelectedCategory("Professional")}
          className={`px-6 py-2 font-semibold rounded-lg transition-all duration-300 ${
            selectedCategory === "Professional"
              ? "bg-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          ACM Professional Chapter
        </Button>

        <Button
          onClick={() => setSelectedCategory("Student")}
          className={`px-6 py-2 font-semibold rounded-lg transition-all duration-300 ${
            selectedCategory === "Student"
              ? "bg-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105"
              : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
          }`}
        >
          ACM Student Chapters
        </Button>
      </div>

      {/* Event Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            className="bg-white p-5 rounded-2xl shadow-lg hover:scale-105 transition-transform cursor-pointer border border-gray-200"
            onClick={() => setSelectedEvent(event)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
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
            <p className="text-gray-500 text-sm mt-2">
              Hosted by: {event.hostedBy.includes("Student Chapter") ? `${event.hostedBy}` : "ACM Professional Chapter"}
            </p>
          </motion.div>
        ))}
      </div>

      {/* See More Events Button */}
      <div className="relative z-10 mt-8 flex justify-center">
        <Button
          onClick={() => router.push("/events")}
          className="px-6 py-3 text-lg font-semibold rounded-lg bg-gradient-to-b from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-500/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          See More Events →
        </Button>
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-20">
          <div className="bg-white p-6 rounded-xl max-w-lg w-full shadow-lg relative">
            <button className="absolute top-3 right-3 text-gray-500 hover:text-gray-700" onClick={() => setSelectedEvent(null)}>
              ✕
            </button>
            <h2 className="text-2xl font-bold text-gray-900">{selectedEvent.name}</h2>
            <p className="text-gray-700 mt-2">{selectedEvent.description}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedEvent.tags.map((tag, idx) => (
                <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-md">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-gray-500 text-sm mt-3">Hosted by: {selectedEvent.hostedBy}</p>
          </div>
        </div>
      )}
    </div>
  );
}
