"use client";

import type { FC } from "react";
import { useState, useEffect } from "react";

interface MemberCardProps {
  name: string;
  role: string;
  title: string;
  description: string;
  avatarUrl?: string;
}

const InfoDisplay: FC<MemberCardProps> = ({
  name,
  role,
  title,
  description,
  avatarUrl,
}) => {
  // Always declare all hooks at the top level, never conditionally
  const [isVisible, setIsVisible] = useState(false);
  
  // Fixed the useEffect hook
  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures it only runs once on mount

  return (
    <div 
      className={`relative h-64 w-full overflow-hidden rounded-xl bg-gray-100 p-6 shadow-lg transition-all duration-700 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Curved design element - similar to the image */}
      <div className="absolute -left-16 top-0 h-full w-64">
        <div className="absolute h-full w-full">
          <svg viewBox="0 0 200 400" className="h-full w-full" preserveAspectRatio="none">
            <path
              d="M200,0 C100,100 100,300 200,400"
              fill="none"
              stroke="#333"
              strokeWidth="1"
              opacity="0.3"
            />
            <path
              d="M180,0 C80,100 80,300 180,400"
              fill="none"
              stroke="#333"
              strokeWidth="1"
              opacity="0.2"
            />
          </svg>
        </div>
      </div>

      {/* Card content with layout similar to the image */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="flex flex-col items-end text-right">
          <h1 className="text-3xl font-bold text-gray-800 mb-1">
            {name}
          </h1>
          <h2 className="text-xl font-medium text-gray-700 mb-4">
            {title}
          </h2>
        </div>

        {/* Role designation like "ADMIN" in the image */}
        <div className="absolute left-6 top-6">
          <span className="text-lg font-bold text-gray-600">{role}</span>
        </div>

        {/* Avatar area - empty circle in the image */}
        <div className="absolute left-6 top-16">
          <div className={`h-20 w-20 rounded-full border-2 border-gray-400 bg-white transition-all duration-1000 ease-in-out ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}>
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={`${name}'s profile`}
                className="h-full w-full rounded-full object-cover"
              />
            ) : null}
          </div>
        </div>

        {/* Description text - right-aligned like in the image */}
        <div className="mt-auto ml-auto max-w-md text-right">
          <p className={`text-sm leading-relaxed text-gray-600 transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InfoDisplay;