"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image"; // Import Next.js Image
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

const chapters = [
  { name: "RCOEM", image: "/images/acm-logo.png" },
  { name: "VNIT", image: "/images/acm-logo.png" },
  { name: "YCCE", image: "/images/acm-logo.png" },
  { name: "Raisoni", image: "/images/acm-logo.png" },
  { name: "KDK", image: "/images/acm-logo.png" },
  { name: "Guru Nanak", image: "/images/acm-logo.png" },
];

interface CircleProps {
  className?: string;
  children?: React.ReactNode;
}

const Circle = forwardRef<HTMLDivElement, CircleProps>(({ className, children }, ref) => {
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "z-10 flex size-16 items-center justify-center rounded-full border-2 bg-white p-3 shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

export default function ChaptersPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  
  // ✅ Create an array of refs using `useRef` and initialize them in `useEffect`
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div className="flex flex-col items-center justify-center w-full px-6 py-10">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-center mb-4">ACM Nagpur Chapters</h1>
      <p className="text-lg text-center max-w-2xl mb-10">
        Connecting local ACM student chapters with ACM Nagpur Professional Chapter to foster collaboration and growth.
      </p>

      {/* Animated Component Section */}
      <div className="relative flex items-center justify-center w-full max-w-4xl h-[350px]">
        <div className="absolute inset-0 flex flex-col items-center justify-between w-full h-full">
          {chapters.map((chapter, index) => (
            <div key={chapter.name} className="flex flex-col items-center">
              <Circle ref={(el) => { chapterRefs.current[index] = el; }}>
                <Image
                  src={chapter.image}
                  alt={chapter.name}
                  width={48} // Using fixed dimensions for optimization
                  height={48}
                  className="object-contain"
                />
              </Circle>
              <p className="text-sm font-medium mt-2">{chapter.name}</p>
            </div>
          ))}
        </div>
        <Circle ref={centerRef} className="size-20 bg-blue-500 text-white font-bold text-lg">
          ACM Nagpur
        </Circle>
      </div>

      {chapters.map((_, index) => (
        <AnimatedBeam key={index} containerRef={containerRef} fromRef={{ current: chapterRefs.current[index] }} toRef={centerRef} />
      ))}

      {/* Information Section */}
      <div className="mt-12 max-w-3xl text-center">
        <h2 className="text-3xl font-semibold mb-4">About ACM Nagpur</h2>
        <p className="text-lg text-gray-700">
          ACM Nagpur is a professional chapter dedicated to fostering a collaborative environment for students and professionals
          in computing. It connects multiple ACM student chapters across various colleges, providing opportunities for learning,
          networking, and innovation.
        </p>
      </div>
    </div>
  );
}

