"use client";
import { Icon } from "@iconify/react";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface LayoutToggleProps {
  className?: string;
}

export function LayoutToggle({ className }: LayoutToggleProps) {
  const [layout, setLayout] = useQueryState("layout", {
    defaultValue: "grid",
    parse: (value): "grid" | "list" => (value === "list" ? "list" : "grid"),
  });

  return (
    <div className={cn("flex items-center gap-2 relative", className)}>
      <button
        onClick={() => setLayout("list")}
        className={cn(
          "p-2 rounded-md transition-colors relative",
          layout === "list" ? "text-primary-foreground" : "hover:bg-muted"
        )}
        aria-label="List layout"
      >
        {layout === "list" && (
          <motion.div
            layoutId="active-layout"
            className="absolute inset-0 bg-primary rounded-md -z-10"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <Icon icon="carbon:list" className="w-5 h-5" />
      </button>
      <button
        onClick={() => setLayout("grid")}
        className={cn(
          "p-2 rounded-md transition-colors relative",
          layout === "grid" ? "text-primary-foreground" : "hover:bg-muted"
        )}
        aria-label="Grid layout"
      >
        {layout === "grid" && (
          <motion.div
            layoutId="active-layout"
            className="absolute inset-0 bg-primary rounded-md -z-10"
            initial={false}
            transition={{ type: "spring", duration: 0.5 }}
          />
        )}
        <Icon icon="carbon:grid" className="w-5 h-5" />
      </button>
    </div>
  );
}
