"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import React from "react"; // Import React

interface PanelData {
  bgColor: string;
  textColor: string;
  text: string;
}

interface StickyPanelProps {
  index: number;
  numPanels: number;
  scrollYProgress: MotionValue<number>;
  panel: PanelData;
}

// Ensure the component is exported
export function StickyPanel({
  index,
  numPanels,
  scrollYProgress,
  panel,
}: StickyPanelProps) {
  // Calculate the segment duration based on the number of transitions (numPanels - 1)
  // Avoid division by zero if there's only one panel
  const segmentDuration = numPanels > 1 ? 1 / (numPanels - 1) : 1;

  // --- Calculate Scale ---
  // Panel i scales down when panel i+1 scrolls in.
  const scaleStartProgress = index * segmentDuration;
  const scaleEndProgress = (index + 1) * segmentDuration;

  // Last panel (index === numPanels - 1) doesn't scale down.
  // Use clamped ranges to prevent issues at the very start/end.
  const scale = useTransform(
    scrollYProgress,
    index < numPanels - 1
      ? [scaleStartProgress, Math.min(scaleEndProgress, 1)]
      : [0, 1], // Input range for the last panel
    index < numPanels - 1 ? [1, 0.95] : [1, 1], // Output range for the last panel (stays at 1)
    { clamp: true }
  );

  // --- Calculate TranslateY ---
  // Panel i translates from 100% to 0% as it scrolls into view.
  // The scroll progress range for panel i's entrance is from the end of panel i-1's entrance
  // to the end of panel i's entrance.
  const translateStartProgress = Math.max(0, (index - 1) * segmentDuration); // Clamp start progress
  const translateEndProgress = index * segmentDuration;

  // First panel (index === 0) doesn't translate.
  const translateY = useTransform(
    scrollYProgress,
    index > 0
      ? [translateStartProgress, Math.min(translateEndProgress, 1)]
      : [0, 1], // Input range for the first panel
    index > 0 ? ["100%", "0%"] : ["0%", "0%"], // Output range for the first panel (stays at 0%)
    { clamp: true }
  );

  return (
    <motion.div
      // Keep h-full for responsiveness
      className={`absolute inset-0 flex h-full w-full items-center justify-center text-4xl font-bold ${panel.bgColor} ${panel.textColor}`}
      style={{
        scale: scale,
        translateY: translateY,
        zIndex: index + 1, // Ensure correct stacking order
      }}
    >
      {panel.text}
    </motion.div>
  );
}
