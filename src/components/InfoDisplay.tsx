"use client";

import { type FC, useState, useEffect } from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";

interface MemberCardProps {
  name: string;
  role: string;
  title: string;
  company: string;
  experience: string;
  description: string;
  image?: string;
  linkedin?: string;
}

const InfoDisplay: FC<MemberCardProps> = ({
  name,
  role,
  title,
  company,
  experience,
  description,
  image,
  linkedin,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const generateQRCode = (url: string) => {
    return `https://quickchart.io/qr?text=${encodeURIComponent(url)}&size=150`;
  };

  return (
    <div
      className={`relative w-full max-w-3xl mx-auto overflow-hidden rounded-3xl bg-white p-6 md:p-8 shadow-lg transition-all duration-700 ease-in-out hover:shadow-xl ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="flex flex-col">
        {/* Left Section: Avatar and Info */}
        <div className="flex flex-col md:flex-row items-center justify-around md:items-start text-center md:text-left">
          <div className="h-24 w-24 lg:h-36 lg:w-36 md:w-28 md:h-28 overflow-hidden rounded-2xl border-2 border-gray-100 bg-gray-50 shadow-sm">
            {image ? (
              <Image
                src={image || "/placeholder.svg"}
                alt={name}
                width={128}
                height={128}
                className="h-full w-full object-cover "
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-3xl md:text-4xl font-light text-gray-400">
                {name?.charAt(0) || "?"}
              </div>
            )}
          </div>
          <div className="space-y-2 md:space-y-3">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-2">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                {name}
              </h1>
              <p className="text-sm text-gray-600">{title}</p>
            </div>
            <p className="text-sm md:text-base text-gray-500">{company}</p>
            <span className="inline-block text-xs md:text-sm font-medium text-blue-600 bg-blue-50 px-2 md:px-3 py-1 rounded-full">
              {role}
            </span>
            <div className="flex items-center text-xs md:text-sm text-gray-500 mt-2">
              <CalendarDays className="h-4 w-4 mr-2" />
              <span>{experience}</span>
            </div>
          </div>
        </div>

        {/* Right Section: LinkedIn + Description */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-center text-center md:text-left">
          {/* Description below LinkedIn details */}
          <p className="text-sm md:text-lg leading-relaxed text-gray-700 px-2 md:px-4 max-w-md md:max-w-lg">
            {description}
          </p>
          {linkedin ? (
            <>
              <Image
                src={generateQRCode(linkedin)}
                alt="LinkedIn QR Code"
                width={120}
                height={120}
                className="rounded-lg shadow-md h-20 w-20 md:w-28 md:h-28"
              />
            </>
          ) : (
            <p className="text-gray-500 text-sm md:text-base">
              No LinkedIn profile available.
            </p>
          )}
        </div>
      </div>
      {/* Decorative Elements */}
      <div className="absolute -bottom-8 -right-8 h-16 w-16 md:h-20 md:w-20 rounded-full border bg-purple-200 opacity-50"></div>
      <div className="absolute -top-6 -left-6 h-16 w-16 md:h-24 md:w-24 rounded-full border bg-blue-200 opacity-30"></div>
    </div>
  );
};

export default InfoDisplay;
