"use client";
import { useScroll, MotionValue } from "framer-motion";
import React, { useRef } from "react";
import { StickyPanel } from "@/components/demos/scroll-sticky/sticky-panel";

interface PanelData {
  bgColor: string;
  textColor: string;
  text: string;
}

const panelData: PanelData[] = [
  {
    bgColor: "bg-violet-100",
    textColor: "text-violet-900",
    text: "Panel 1",
  },
  {
    bgColor: "bg-indigo-200",
    textColor: "text-indigo-900",
    text: "Panel 2",
  },
  {
    bgColor: "bg-indigo-300",
    textColor: "text-indigo-900",
    text: "Panel 3",
  },
];

export default function ScrollStickyDemo() {
  const numPanels = panelData.length;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    // Adjust height based on number of panels
    <div
      ref={containerRef}
      className={`relative h-[${numPanels * 100}vh] bg-gray-100 `}
    >
      {/* Sticky container */}
      <div className="sticky top-10 md:top-20  h-screen overflow-hidden ">
        {panelData.map((panel, index) => (
          <StickyPanel
            key={index}
            index={index}
            numPanels={numPanels}
            scrollYProgress={scrollYProgress}
            panel={panel}
          />
        ))}
      </div>
    </div>
  );
}
