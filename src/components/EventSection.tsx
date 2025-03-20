"use client";

import { cn } from "@/lib/utils";
import { InteractiveGridPattern } from "@/components/magicui/interactive-grid-pattern";
import { Button } from "@/components/ui/button";
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
  {
    id: 1,
    name: "AI/ML Bootcamp",
    description: "A beginner-friendly workshop on Machine Learning.",
    tags: ["AI/ML", "Workshop"],
    hostedBy: "ACM Professional Chapter",
  },
  {
    id: 2,
    name: "Blockchain Hackathon",
    description: "Build decentralized applications in a 48-hour hackathon.",
    tags: ["Blockchain", "Hackathon"],
    hostedBy: "ACM RCOEM Student Chapter",
  },
  {
    id: 3,
    name: "Web Development Summit",
    description: "A hands-on workshop on full-stack web development.",
    tags: ["Web Dev", "Workshop"],
    hostedBy: "ACM Professional Chapter",
  },
  {
    id: 4,
    name: "Cybersecurity CTF",
    description: "A Capture the Flag event to test hacking skills.",
    tags: ["Cybersecurity", "CTF"],
    hostedBy: "ACM VNIT Student Chapter",
  },
  {
    id: 5,
    name: "Cloud Computing Symposium",
    description: "Learn about AWS, Azure, and cloud architectures.",
    tags: ["Cloud", "Conference"],
    hostedBy: "ACM Professional Chapter",
  },
  {
    id: 6,
    name: "Competitive Coding Contest",
    description: "Solve complex problems and compete with coders.",
    tags: ["Coding", "Contest"],
    hostedBy: "ACM YCCE Student Chapter",
  },
  {
    id: 7,
    name: "UI/UX Design Workshop",
    description: "A session on creating user-friendly web interfaces.",
    tags: ["UI/UX", "Workshop"],
    hostedBy: "ACM Symbiosis Student Chapter",
  },
  {
    id: 8,
    name: "Data Science Bootcamp",
    description: "An intensive bootcamp on data analytics & AI.",
    tags: ["Data Science", "Bootcamp"],
    hostedBy: "ACM Professional Chapter",
  },
  {
    id: 9,
    name: "Game Development Hackathon",
    description: "A game dev contest for indie game developers.",
    tags: ["Game Dev", "Hackathon"],
    hostedBy: "ACM VNIT Student Chapter",
  },
  {
    id: 10,
    name: "Quantum Computing Seminar",
    description: "Learn about the future of computing with Quantum mechanics.",
    tags: ["Quantum Computing", "Seminar"],
    hostedBy: "ACM Professional Chapter",
  },
];

export default function EventsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("Professional");

  // Filtered Events Based on Selection
  const filteredEvents = events.filter((event) =>
    selectedCategory === "Professional"
      ? event.hostedBy === "ACM Professional Chapter"
      : event.hostedBy.includes("Student Chapter")
  );

  return (
    <div
      id="events"
      className="relative min-h-screen w-full flex flex-col items-center justify-center p-8"
    >
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
      <div className="relative z-10 mb-6 flex gap-4 flex-col md:flex-row ">
        {["Professional", "Student"].map((category) => (
          <Button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "px-6 py-2 font-semibold rounded-lg transition-all duration-300",
              selectedCategory === category
                ? "bg-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
            )}
          >
            {category === "Professional"
              ? "ACM Professional Chapter"
              : "ACM Student Chapters"}
          </Button>
        ))}
      </div>

      {/* Events Grid */}
      <div className="relative columns-1 sm:columns-2 ">
        {filteredEvents.length > 0 ? (
          filteredEvents.slice(0, 4).map((event, index) => (
            <EventCard
              key={event.id}
              event={event}
              size={index % 3 === 0 ? "big" : "small"} // Diagonal effect
            />
          ))
        ) : (
          <p className="text-gray-600 text-center col-span-2">
            No events found for this category.
          </p>
        )}
      </div>
    </div>
  );
}

// Event Card Component
function EventCard({
  event,
  size,
  className,
}: {
  event: Event;
  size: "big" | "small";
  className?: string;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: size === "big" ? -50 : 50, // Big cards from left, small from right
      }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }} // Medium-fast & smooth
      className={cn(
        "relative bg-gray-300 p-6 m-5 rounded-md border border-gray-300 shadow-lg transition-all duration-300 cursor-pointer",
        "hover:scale-105 hover:shadow-2xl",
        className,
        size === "big" ? "h-64" : "h-32",
        "z-0 overflow-hidden"
      )}
      // whileHover={{ y: -5 }}
    >
      {/* Background Shadow Box - Always Behind */}
      <div className="absolute top-2 left-2 w-full h-full bg-white rounded-md -z-10 shadow-lg" />

      {/* Event Details */}
      <h3 className="text-lg font-bold text-gray-900">{event.name}</h3>
      <p className="text-gray-600 text-sm line-clamp-2">{event.description}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {event.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

