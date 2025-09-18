"use client";

import { useState, useCallback } from "react";
import { Blog } from "@/payload-types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "motion/react";
import { BlogGridItem } from "./BlogGridItem";
import { BlogListItem } from "./BlogListItem";

interface BannerBlogsProps {
  bannerBlogs: Blog[];
  layout: "grid" | "list";
  hoverId: number | null;
  handleMouseEnter: (id: number) => void;
  handleMouseLeave: () => void;
  setItemRef: (id: number, element: HTMLDivElement | null) => void;
}

export function BannerBlogs({
  bannerBlogs,
  layout,
  hoverId,
  handleMouseEnter,
  handleMouseLeave,
  setItemRef,
}: BannerBlogsProps) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const handlePrevBanner = useCallback(() => {
    setDirection("prev");
    setCurrentBannerIndex((prev) =>
      prev === 0 ? bannerBlogs.length - 1 : prev - 1
    );
  }, [bannerBlogs.length]);

  const handleNextBanner = useCallback(() => {
    setDirection("next");
    setCurrentBannerIndex((prev) =>
      prev === bannerBlogs.length - 1 ? 0 : prev + 1
    );
  }, [bannerBlogs.length]);

  if (bannerBlogs.length === 0) {
    return null;
  }

  const variants = {
    enter: (direction: "next" | "prev") => {
      if (direction === "next") {
        return { x: "100%", zIndex: 1, scale: 1, opacity: 1 };
      }
      return { scale: 0.9, opacity: 1, zIndex: 0 };
    },
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 1,
    },
    exit: (direction: "next" | "prev") => {
      if (direction === "next") {
        return { scale: 0.9, zIndex: 1, opacity: 1 };
      }
      return { x: "100%", zIndex: 2, scale: 1, opacity: 1 };
    },
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentBannerIndex ? "next" : "prev");
    setCurrentBannerIndex(index);
  };

  return (
    <div className="mb-4">
      {layout === "grid" ? (
        <div className="relative overflow-hidden">
          <div className="container mx-auto relative h-[400px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentBannerIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    duration: 0.7,
                  },
                  scale: { duration: 0.3 },
                }}
                className="absolute w-full h-full"
              >
                <BlogGridItem
                  post={bannerBlogs[currentBannerIndex]}
                  isHovered={hoverId === bannerBlogs[currentBannerIndex].id}
                  onMouseEnter={() =>
                    handleMouseEnter(bannerBlogs[currentBannerIndex].id)
                  }
                  onMouseLeave={handleMouseLeave}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {bannerBlogs.length > 1 && (
            <>
              <button
                onClick={handlePrevBanner}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-background transition-colors"
              >
                <Icon icon="mdi:chevron-left" className="w-6 h-6" />
              </button>
              <button
                onClick={handleNextBanner}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-background/80 backdrop-blur-sm rounded-full shadow-lg hover:bg-background transition-colors"
              >
                <Icon icon="mdi:chevron-right" className="w-6 h-6" />
              </button>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {bannerBlogs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={cn(
                      "w-2 h-2 rounded-full transition-colors",
                      index === currentBannerIndex
                        ? "bg-primary"
                        : "bg-muted-foreground/30"
                    )}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground container mx-auto px-0">
            <Icon
              icon="material-symbols:push-pin-outline"
              className="w-4 h-4 text-primary"
            />
            <span>精选文章</span>
          </div>
          <div className="flex flex-row gap-4 container mx-auto px-0">
            {bannerBlogs.map((blog) => (
              <div key={blog.id} className="flex-1">
                <BlogListItem
                  post={blog}
                  isHovered={hoverId === -blog.id}
                  onMouseEnter={() => handleMouseEnter(-blog.id)}
                  onMouseLeave={handleMouseLeave}
                  ref={(el: HTMLDivElement | null) => setItemRef(-blog.id, el)}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
