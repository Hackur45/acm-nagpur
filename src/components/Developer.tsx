"use client";
import CircularMenu from "./CircularGalarry";
import InfoDisplay from "./InfoDisplay";
import { useState } from "react";

interface MenuItem {
  label: string;
  color: string;
  name: string;
  role: string;
  title: string;
  description: string;
  avatarUrl?: string;
}

const Developers = () => {
  const menuItems: MenuItem[] = [
    {
      label: "Teri",
      color: "#89c759",
      name: "John Doe",
      role: "Developer",
      title: "Frontend Engineer",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quas iusto magni dolores assumenda. Voluptatem quas atque libero beatae saepe!",
      avatarUrl: "/avatars/john.jpg",
    },
    {
      label: "Maa",
      color: "#3bb4e5",
      name: "Jane Smith",
      role: "Designer",
      title: "UI/UX Expert",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quas iusto magni dolores assumenda. Voluptatem quas atque libero beatae saepe!",
      avatarUrl: "/avatars/jane.jpg",
    },
    {
      label: "Ko",
      color: "#823d97",
      name: "Alice Johnson",
      role: "Product Manager",
      title: "Team Lead",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quas iusto magni dolores assumenda. Voluptatem quas atque libero beatae saepe!",
      avatarUrl: "/avatars/alice.jpg",
    },
    {
      label: "Mera",
      color: "#eb1777",
      name: "Bob Brown",
      role: "Backend Engineer",
      title: "API Specialist",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quas iusto magni dolores assumenda. Voluptatem quas atque libero beatae saepe!",
      avatarUrl: "/avatars/bob.jpg",
    },
    {
      label: "Salam",
      color: "#f39c12",
      name: "Charlie Green",
      role: "QA Tester",
      title: "Quality Assurance",
      description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. In quas iusto magni dolores assumenda. Voluptatem quas atque libero beatae saepe!",
      avatarUrl: "/avatars/charlie.jpg",
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
        name={menuItems[activeIndex].name}
        role={menuItems[activeIndex].role}
        title={menuItems[activeIndex].title}
        description={menuItems[activeIndex].description}
        avatarUrl={menuItems[activeIndex].avatarUrl}
      />
    </div>
  );
};

export default Developers;
