"use client";
import CircularMenu from "./CircularGalarry";
import InfoDisplay from "./InfoDisplay";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface MenuItem {
  color: string;
  name: string;
  role: string;
  title: string;
  description: string;
  company: string;
  experience: string;
  image: string;
}

const Developers = () => {
  const developers: MenuItem[] = [
    {
      color: "#89c259",
      name: "John Does",
      role: "Developer",
      title: "Frontend Engineer",
      company: "TechCorps",
      experience: "5 years",
      image:
        "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.webp?s=2048x2048&w=is&k=20&c=uEaEqFvI74GpTWzcRCiDMR3qWqS2qVzKQREVBgmcxao=",
      description: "Expert in React, Tailwind, and modern UI frameworks.",
    },
    {
      color: "#3bb4e5",
      name: "Jane Smiths",
      role: "Designers",
      title: "UI/UX Expert",
      company: "Creative Designs Incs.",
      experience: "7 years",
      image:
        "https://media.istockphoto.com/id/2029984278/photo/business-woman-portrait-and-smile-with-arms-crossed-in-an-office-for-confidence-and-career.webp?s=2048x2048&w=is&k=20&c=VG74YXd1toTyaSEhcvd4QkwxPizo8XS7crKJeI5JW1k=",
      description: "Passionate about user experience and visual storytelling.",
    },
    {
      color: "#823d97",
      name: "Alice Johnson",
      role: "Product Manager",
      title: "Team Lead",
      company: "InnovateX",
      experience: "10 years",
      image:
        "https://media.istockphoto.com/id/2058319417/photo/face-business-and-woman-with-arms-crossed-smile-and-career-with-teamwork-meeting-or-planning.webp?s=2048x2048&w=is&k=20&c=RfkkNLZn_QffK9TBY7gqA48n_n4awRmsuL-cfw-nPuE=",
      description: "Bridging the gap between technology and business.",
    },
  ];

  const professionals: MenuItem[] = [
    {
      color: "#89c759",
      name: "John Doe",
      role: "Developer",
      title: "Frontend Engineer",
      company: "TechCorp",
      experience: "5 years",
      image:
        "https://media.istockphoto.com/id/1364917563/photo/businessman-smiling-with-arms-crossed-on-white-background.webp?s=2048x2048&w=is&k=20&c=uEaEqFvI74GpTWzcRCiDMR3qWqS2qVzKQREVBgmcxao=",
      description: "Expert in React, Tailwind, and modern UI frameworks.",
    },
    {
      color: "#3bb4e5",
      name: "Jane Smith",
      role: "Designer",
      title: "UI/UX Expert",
      company: "Creative Designs Inc.",
      experience: "7 years",
      image:
        "https://media.istockphoto.com/id/2029984278/photo/business-woman-portrait-and-smile-with-arms-crossed-in-an-office-for-confidence-and-career.webp?s=2048x2048&w=is&k=20&c=VG74YXd1toTyaSEhcvd4QkwxPizo8XS7crKJeI5JW1k=",
      description: "Passionate about user experience and visual storytelling.",
    },
    {
      color: "#823d97",
      name: "Alice Johnson",
      role: "Product Manager",
      title: "Team Lead",
      company: "InnovateX",
      experience: "10 years",
      image:
        "https://media.istockphoto.com/id/2058319417/photo/face-business-and-woman-with-arms-crossed-smile-and-career-with-teamwork-meeting-or-planning.webp?s=2048x2048&w=is&k=20&c=RfkkNLZn_QffK9TBY7gqA48n_n4awRmsuL-cfw-nPuE=",
      description: "Bridging the gap between technology and business.",
    },
    {
      color: "#eb1777",
      name: "Bob Brown",
      role: "Backend Engineer",
      title: "API Specialist",
      company: "Cloud Solutions",
      experience: "6 years",
      image:
        "https://media.gettyimages.com/id/2135840737/photo/fed-chair-powell-and-google-ceo-sundar-pichai-speak-at-stanford-university.webp?s=2048x2048&w=gi&k=20&c=P8NieByn_w0auuKzsgmqF0S9ZeAT2oWSuKP4j51_Fug=",
      description:
        "Scaling robust backend infrastructures with Go and Node.js.",
    },
    {
      color: "#f39c12",
      name: "Charlie Green",
      role: "QA Tester",
      title: "Quality Assurance",
      company: "TestIt",
      experience: "4 years",
      image:
        "https://media.gettyimages.com/id/2135822410/photo/fed-chair-powell-and-google-ceo-sundar-pichai-speak-at-stanford-university.webp?s=2048x2048&w=gi&k=20&c=hsNpCP0cAlOD16ACh2oPA0iMkT_WtSiuTFKUxLVaDAQ=",
      description: "Ensuring software reliability through automated testing.",
    },
  ];

  const [selectedCategory, setSelectedCategory] =
    useState<string>("Professional");
  const activeMenuItems =
    selectedCategory === "Professional" ? professionals : developers;
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [circleRotation, setCircleRotation] = useState<number>(0);
  const [arrowRotation, setArrowRotation] = useState<number>(0);

  const handleMenuItemClick = (index: number) => {
    const angle = (360 / activeMenuItems.length) * index;
    setArrowRotation(angle + 90);
    setTimeout(() => {
      setCircleRotation(-angle);
      setActiveIndex(index);
    }, 1000);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-between px-10 py-10 bg-black overflow-hidden">
      <h2 className="text-3xl font-bold text-white pt-2.5 border-b-4 mb-4 border-blue-500">
        Developers Section
      </h2>

      <div className="relative z-10 mb-6 flex gap-4 flex-col sm:flex-row">
        {["Professional", "Student"].map((category) => (
          <Button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setActiveIndex(0);
              setCircleRotation(0);
              setArrowRotation(0);
            }}
            className={cn(
              "px-6 py-2 font-semibold rounded-lg transition-all duration-300 cursor-pointer",
              selectedCategory === category
                ? "bg-blue-700 text-white shadow-lg shadow-blue-500/50 scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-blue-600 hover:text-white"
            )}
          >
            {category === "Professional"
              ? "Professional Chapter"
              : "Developer Student"}
          </Button>
        ))}
      </div>

      <div className="w-full min-h-[100dvh] sm:min-h-[80dvh] flex sm:flex-row flex-col items-center justify-between sm:px-10 bg-black">
        <InfoDisplay
          {...activeMenuItems[activeIndex]}
          linkedin="https://www.linkedin.com/in/ikshit04/"
        />
        <CircularMenu
          key={selectedCategory}
          menuItems={activeMenuItems}
          circleRotation={circleRotation}
          arrowRotation={arrowRotation}
          onItemClick={handleMenuItemClick}
        />
      </div>
    </div>
  );
};

export default Developers;
