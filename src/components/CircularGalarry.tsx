"use client";
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
  
  const angles = useRef(menuItems.map((_, index) => (360 / menuItems.length) * index)).current;

  useEffect(() => {
    onItemClick(currentIndex);
  }, [currentIndex, onItemClick]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const startAutoRotate = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % menuItems.length);
      }, 3000);
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
      setCurrentIndex(prevIndex => (prevIndex + 1) % menuItems.length);
    }, 2000);
  };

  if (!isClient) return null;

  return (
    <div className="relative w-full h-[100dvh] flex items-center justify-start">
      <div
        className="relative rounded-full p-2 transition-transform duration-1000 ease-in-out"
        style={{ transform: `rotate(${circleRotation}deg)` }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Arrow */}
        <div
          className="absolute w-32 h-32 rounded-full flex items-center justify-center text-white text-2xl uppercase transition-transform duration-1000 ease-in-out bg-[#222]"
          style={{ transform: `translate(-50%, -50%) rotate(${arrowRotation}deg)` }}
        >
          <span className="absolute cursor-pointer text-[7rem] -top-1/2">&uarr;</span>
        </div>

        {/* Menu Items with Images */}
        {menuItems.map((item, index) => {
          const radian = (angles[index] * Math.PI) / 180;
          const x = radius * Math.cos(radian);
          const y = radius * Math.sin(radian);
          const isActive = index === currentIndex;

          return (
            <button
              key={item.image}
              onClick={() => handleItemClick(index)}
              className={`absolute w-20 h-20 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300
                ${
                  isActive
                    ? "scale-125 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    : "opacity-90 hover:scale-110"
                }
              `}
              style={{
                top: `calc(50% + ${y}px - 40px)`,
                left: `calc(50% + ${x}px - 40px)`,
                background: `linear-gradient(145deg, ${item.color}, #111)`,
                transform: `rotate(${-circleRotation}deg)`,
                border: `2px solid ${item.color}`,
                boxShadow: isActive ? `0px 0px 15px ${item.color}` : "none",
              }}
            >
              <img
                src={item.image}
                alt="menu-item"
                className="w-full h-full object-cover rounded-full"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CircularMenu;
