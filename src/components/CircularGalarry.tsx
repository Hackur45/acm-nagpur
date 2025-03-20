"use client";
import Image from "next/image";
import { FC, useEffect, useState, useRef } from "react";

interface MenuItem {
  image: string; // URL for the image
  color: string;
}

interface CircularMenuProps {
  menuItems: MenuItem[];
  circleRotation: number;
  arrowRotation: number;
  onItemClick: (index: number) => void;
  radius?: number;
}

const CircularMenu: FC<CircularMenuProps> = ({
  menuItems,
  circleRotation,
  arrowRotation,
  onItemClick,
  radius = 200,
}) => {
  const [isClient, setIsClient] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [IsMobile, setIsMobile] = useState(false);

  const angles = useRef(
    menuItems.map((_, index) => (360 / menuItems.length) * index)
  ).current;

  useEffect(() => {
    setIsClient(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    onItemClick(currentIndex);
  }, [currentIndex, onItemClick]);

  useEffect(() => {
    if (!isClient) return;

    const startAutoRotate = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
      }, 3500);
    };

    startAutoRotate();

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isClient, menuItems.length]);

  const handleItemClick = (index: number) => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setCurrentIndex(index);
  };

  const handleMouseEnter = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleMouseLeave = () => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
    }, 3500);
  };

  if (!isClient) return null;

  const adjustedRadius = IsMobile ? radius * 0.6 : radius;
  const menuSize = IsMobile ? "w-16 h-16" : "w-20 h-20";
  const activeScale = IsMobile ? "scale-110" : "scale-125";
  const arrowSize = IsMobile ? 80 : 128;
  const arrowClass = IsMobile ? "w-10 h-10" : "w-14 h-14";
  const rotationFix = IsMobile ? circleRotation - 90 : circleRotation - 180;

  return (
    <div className={`relative w-full  flex items-center ${IsMobile ? 'justify-center' :'justify-end'}`}>
      <div
        className="relative rounded-full p-2 transition-transform duration-1000 ease-in-out"
        style={{ transform: `rotate(${rotationFix}deg)` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Arrow */}
        <div
          className="absolute rounded-full flex items-center justify-center text-white uppercase transition-transform duration-1000 ease-in-out bg-[#222]"
          style={{
            width: IsMobile ? "64px" : "128px",
            height: IsMobile ? "64px" : "128px",
            transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)`,
          }}
         >
          <div className={`${arrowClass} bg-black border border-white blur-sm rounded-full`}></div>
          <span className="absolute cursor-pointer -top-1/2 -z-10">
            <Image
              src="/arrow.png"
              alt="Arrow"
              width={arrowSize}
              height={arrowSize}
              className="object-contain rotate-90 invert"
            />
          </span>
        </div>

        {/* Menu Items */}
        {menuItems.map((item, index) => {
          const radian = (angles[index] * Math.PI) / 180;
          const x = adjustedRadius * Math.cos(radian);
          const y = (adjustedRadius * Math.sin(radian)) -10;
          const isActive = index === currentIndex;

          return (
            <button
              key={item.image}
              onClick={() => handleItemClick(index)}
              className={`absolute ${menuSize} rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
                ${isActive ? `${activeScale} shadow-[0_0_20px_rgba(255,255,255,0.5)]` : "opacity-90 hover:scale-110"}
              `}
              style={{
                top: `calc(50% + ${y}px - 20px)`,
                left: `calc(50% + ${x}px - 20px)`,
                background: `linear-gradient(145deg, ${item.color}, #111)`,
                transform: `rotate(${-circleRotation}deg)`,
                border: `1px solid ${item.color}`,
                boxShadow: isActive ? `0px 0px 10px ${item.color}` : "none",
              }}
            >
              <Image
                src={item.image}
                alt="menu-item"
                width={IsMobile ? 70 : 100}
                height={IsMobile ? 70 : 100}
                className={`w-full h-full object-cover rounded-full ${IsMobile ? "rotate-90" : "rotate-180"}`}
              />  
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CircularMenu;
