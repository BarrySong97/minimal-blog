"use client";
import React, { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedMenuProps {
  className?: string;
}

const menuItems = [
  { id: "home", label: "Home" },
  { id: "blogs", label: "Blogs" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
];

const AnimatedMenu: React.FC<AnimatedMenuProps> = ({ className = "" }) => {
  const [activeItem, setActiveItem] = useState("blogs");

  return (
    <div className="relative bg-[#eeeeee] rounded-full p-1 flex">
      {menuItems.map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          className={cn(
            "relative px-6 py-2 text-sm font-medium transition-colors duration-200 rounded-full z-10",
            activeItem === item.id
              ? "text-white"
              : "text-gray-700 hover:text-gray-900"
          )}
        >
          {activeItem === item.id && (
            <motion.div
              layoutId="activeBackground"
              className="absolute inset-0 bg-black rounded-full"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          )}
          <span className="relative z-10">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AnimatedMenu;
