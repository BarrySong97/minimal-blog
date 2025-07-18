"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media } from "@/payload-types";

export interface RewatchItem {
  id: string;
  title: string;
  description?: string;
  cover?: string | Media | null;
  link: string;
  type: "book" | "movie" | "tv";
}

interface RewatchScrollViewProps {
  items: RewatchItem[];
  className?: string;
}

const typeLabels = {
  book: "书籍",
  movie: "电影",
  tv: "电视剧",
};

const typeColors = {
  book: "bg-blue-100 text-blue-800",
  movie: "bg-green-100 text-green-800",
  tv: "bg-purple-100 text-purple-800",
};

export function RewatchScrollView({ items, className }: RewatchScrollViewProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.top + containerRect.height / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      itemRefs.current.forEach((item, index) => {
        if (!item) return;

        const itemRect = item.getBoundingClientRect();
        const itemCenter = itemRect.top + itemRect.height / 2;
        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);
    // Initial call to set the active index
    handleScroll();

    return () => container.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleItemClick = (link: string) => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-medium mb-2">暂无内容</p>
          <p className="text-sm">还没有添加想要再看的内容</p>
        </div>
      </div>
    );
  }

  const activeItem = items[activeIndex];

  return (
    <>
      {/* Fixed Link - Outside left side */}
      <div className="fixed bottom-8 left-8 z-10">
        <AnimatePresence mode="wait">
          {activeItem && (
            <motion.a
              key={activeItem.id}
              href={activeItem.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
              className="text-xs text-black no-underline hover:opacity-70 transition-opacity"
            >
              {activeItem.link}
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      <div className={cn("flex items-end", className)} style={{ height: "calc(100vh - 56px)" }}>
        {/* Left Side - Scrollable Covers */}
        <div className="w-1/2 h-full relative">
          <div
            ref={scrollContainerRef}
            className="h-full overflow-y-scroll space-y-4 pr-4"
            style={{
              scrollSnapType: "y mandatory",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            {/* Top spacer to center first item */}
            <div style={{ height: "calc(50vh - 28px)" }}></div>

            {items.map((item, index) => {
              const isActive = index === activeIndex;

              return (
                <motion.div
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className="relative group cursor-pointer flex-shrink-0"
                  style={{
                    scrollSnapAlign: "center",
                  }}
                  onClick={() => handleItemClick(item.link)}
                  initial={{ scale: 0.95, opacity: 0.6 }}
                  animate={{
                    scale: isActive ? 1.05 : 0.95,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  whileHover={{
                    opacity: 1,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  {/* Cover Image */}
                  <div className="overflow-hidden shadow-lg max-w-md" style={{ height: "calc(100vh - 56px)" }}>
                    <ImageWithFallback
                      image={item.cover as Media}
                      alt={item.title}
                      width={800}
                      height={1200}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  {/* Type Badge */}
                  {/* <motion.div 
                  className="absolute top-2 left-2"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    typeColors[item.type]
                  )}>
                    {typeLabels[item.type]}
                  </span>
                </motion.div> */}

                </motion.div>
              );
            })}

            {/* Bottom spacer to center last item */}
            <div style={{ height: "calc(50vh - 28px)" }}></div>
          </div>
        </div>

        {/* Right Side - Active Item Details */}
        <div className="w-1/2 h-full flex flex-col justify-start items-end p-8">
          <AnimatePresence mode="wait">
            {activeItem && (
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="space-y-4 text-right max-w-md"
              >
                {/* Type Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6, ease: "easeInOut" }}
                  className="flex justify-end"
                >
                  <span className={cn(
                    "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium",
                    typeColors[activeItem.type]
                  )}>
                    {typeLabels[activeItem.type]}
                  </span>
                </motion.div>

                {/* Title */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7, ease: "easeInOut" }}
                  className="text-4xl font-bold text-gray-900 leading-tight"
                >
                  {activeItem.title}
                </motion.h2>

                {/* Description */}
                {activeItem.description && (
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
                    className="text-lg text-gray-600 leading-relaxed"
                  >
                    {activeItem.description}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      </div>
    </>
  );
}