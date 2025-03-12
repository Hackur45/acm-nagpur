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
      <InfoDisplay
        {...menuItems[activeIndex]}
        linkedin="https://www.linkedin.com/in/ikshit04/"
      />
    </div>
  );
};

export default Developers;
