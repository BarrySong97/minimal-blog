"use client";
import React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AnimatedMenuProps {
  className?: string;
}

const menuItems = [
  { id: "home", label: "Home", href: "/" },
  { id: "blogs", label: "Blogs", href: "/blogs" },
  { id: "photos", label: "Photos", href: "/photos" },
  { id: "projects", label: "Projects", href: "/projects" },
  { id: "about", label: "About", href: "/about" },
];

const AnimatedMenu: React.FC<AnimatedMenuProps> = () => {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blogs");

  return (
    <div className="fixed bottom-8  flex justify-center bg-[#f4f6f8]/90 backdrop-blur-sm rounded-full p-1 z-[100]">
      {menuItems.map((item) => (
        <Link
          key={item.id}
          href={item.href}
          className={cn(
            "relative px-6 py-2 text-sm font-medium transition-colors duration-200 rounded-full z-10",
            pathname === item.href || (isBlog && item.id === "blogs")
              ? "text-white"
              : "text-gray-700 hover:text-gray-900"
          )}
        >
          {pathname === item.href || (isBlog && item.id === "blogs") ? (
            <motion.div
              layoutId="activeBackground"
              className="absolute inset-0 bg-black rounded-full"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 30,
              }}
            />
          ) : null}
          <span className="relative z-10">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default AnimatedMenu;
