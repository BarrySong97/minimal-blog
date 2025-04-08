"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const images = [
  "/gallery/image-0.jpg",
  "/gallery/image-1.jpg",
  "/gallery/image-2.jpg",
  "/gallery/image-3.jpg",
  "/gallery/image-4.jpg",
];

export default function VerticalCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextIndex, setNextIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        {/* Current/Exiting Image */}
        <motion.div
          key={`exit-${currentIndex}`}
          className="absolute inset-0 z-20"
          initial={{ clipPath: "inset(0 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: {
              duration: 1.5,
              ease: [0.4, 0, 0.2, 1],
            },
          }}
          onAnimationStart={() => setIsTransitioning(true)}
          onAnimationComplete={() => {
            setIsTransitioning(false);
            setNextIndex(null);
          }}
        >
          <Image
            src={images[currentIndex]}
            alt={`Slide ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Next Image (Hidden until transition completes) */}
      </AnimatePresence>
      <div className="absolute inset-0 z-10">
        <Image
          src={images[nextIndex ?? (currentIndex + 1) % images.length]}
          alt={`Next Slide ${((currentIndex + 1) % images.length) + 1}`}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Navigation dots */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning) {
                setCurrentIndex(index);
                setNextIndex(index);
                setIsAutoPlaying(false);
              }
            }}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              currentIndex === index
                ? "bg-white scale-150"
                : "bg-white/50 hover:bg-white/80"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
