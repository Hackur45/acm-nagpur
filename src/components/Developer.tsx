"use client";
import CircularMenu from "./CircularGalarry";
import InfoDisplay from "./InfoDisplay";
import { useState } from "react";

interface MenuItem {
  color: string;
  name: string;
  role: string;
  title: string;
  description: string;
  company: string;
  experience: string;
  avatarUrl: string;
  image: string;
}

const Developers = () => {
  const menuItems: MenuItem[] = [
    {
      color: "#89c759",
      name: "John Doe",
      role: "Developer",
      title: "Frontend Engineer",
      company: "TechCorp",
      experience: "5 years",
      avatarUrl: "/avatars/john.jpg",
      image: "/images/john.jpg",
      description: "Expert in React, Tailwind, and modern UI frameworks.",
    },
    {
      color: "#3bb4e5",
      name: "Jane Smith",
      role: "Designer",
      title: "UI/UX Expert",
      company: "Creative Designs Inc.",
      experience: "7 years",
      avatarUrl: "/avatars/jane.jpg",
      image: "/images/jane.jpg",
      description: "Passionate about user experience and visual storytelling.",
    },
    {
      color: "#823d97",
      name: "Alice Johnson",
      role: "Product Manager",
      title: "Team Lead",
      company: "InnovateX",
      experience: "10 years",
      avatarUrl: "/avatars/alice.jpg",
      image: "/images/alice.jpg",
      description: "Bridging the gap between technology and business.",
    },
    {
      color: "#eb1777",
      name: "Bob Brown",
      role: "Backend Engineer",
      title: "API Specialist",
      company: "Cloud Solutions",
      experience: "6 years",
      avatarUrl: "/avatars/bob.jpg",
      image: "/images/bob.jpg",
      description: "Scaling robust backend infrastructures with Go and Node.js.",
    },
    {
      color: "#f39c12",
      name: "Charlie Green",
      role: "QA Tester",
      title: "Quality Assurance",
      company: "TestIt",
      experience: "4 years",
      avatarUrl: "/avatars/charlie.jpg",
      image: "/images/charlie.jpg",
      description: "Ensuring software reliability through automated testing.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [circleRotation, setCircleRotation] = useState<number>(0);
  const [arrowRotation, setArrowRotation] = useState<number>(0);

  const handleMenuItemClick = (index: number) => {
    const angle = (360 / menuItems.length) * index;
    setArrowRotation(angle + 90); // Point the arrow
    setTimeout(() => {
      setCircleRotation(-angle); // Rotate circle after 1s
      setActiveIndex(index);
    }, 1000);
  };

  return (
    <div className="flex w-full min-h-screen items-center justify-between px-10 bg-black">
      {/* Left side: Circular Menu */}
      <CircularMenu
        menuItems={menuItems}
        circleRotation={circleRotation}
        arrowRotation={arrowRotation}
        onItemClick={handleMenuItemClick}
      />

      {/* Right side: Info Display */}
      <InfoDisplay {...menuItems[activeIndex]} linkedin="https://www.linkedin.com/in/ikshit04/" />
    </div>
  );
};

export default Developers;
