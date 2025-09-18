"use client";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect, ReactNode } from "react";

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  className?: string;
  triggerClassName?: string;
  offsetX?: number;
  offsetY?: number;
}

export function Popover({
  trigger,
  children,
  className = "",
  triggerClassName = "",
  offsetX = 0,
  offsetY = 4,
}: PopoverProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const updatePosition = () => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;

      setPosition({
        top: rect.bottom + scrollY + offsetY,
        left: rect.left + scrollX + offsetX,
      });
    }
  };

  useEffect(() => {
    updatePosition();
  }, [isOpen, offsetX, offsetY]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener("scroll", updatePosition);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`relative ${triggerClassName}`}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {trigger}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
            }}
            className={`z-50 rounded-xl bg-white shadow-lg ${className}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
