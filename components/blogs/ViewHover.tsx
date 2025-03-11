"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Icon } from "@iconify/react";
import { useRef, useState } from "react";
import { useMouse } from "ahooks";

interface ViewHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
  trackMouse?: boolean;
  isHover?: boolean;
}

export function ViewHover({
  className,
  text = "Read More",
  children,
  trackMouse,
  isHover,
  ...props
}: ViewHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useMouse(containerRef.current);
  return (
    <AnimatePresence mode="wait">
      {isHover && (
        <motion.div
          ref={containerRef}
          className="absolute inset-0 z-[200] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="absolute bg-black/50 rounded-full pointer-events-none"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 150,
              damping: 15,
              mass: 0.1,
            }}
            style={{
              width: "120px",
              height: "120px",
              left:
                (isNaN(mouse.elementX ?? 0) ? 0 : (mouse.elementX ?? 0)) - 60,
              top:
                (isNaN(mouse.elementY ?? 0) ? 0 : (mouse.elementY ?? 0)) - 60,
            }}
          >
            <div className="flex h-full w-full items-center justify-center">
              <Icon
                icon="solar:arrow-right-broken"
                className="h-6 w-6 text-white"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
