"use client";
import { Icon } from "@iconify/react";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface LayoutToggleProps {
  className?: string;
}

export function LayoutToggle({ className }: LayoutToggleProps) {
  const [layout, setLayout] = useQueryState("layout", {
    defaultValue: "grid",
    parse: (value): "grid" | "list" => (value === "list" ? "list" : "grid"),
  });

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <button
        onClick={() => setLayout("list")}
        className={cn(
          "p-2 rounded-md transition-all duration-200 ease-in-out",
          layout === "list"
            ? "bg-primary text-primary-foreground ring-2 ring-primary/20"
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
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
          "p-2 rounded-md transition-all duration-200 ease-in-out",
          layout === "grid"
            ? "bg-primary text-primary-foreground "
            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
        )}
        aria-label="Grid layout"
      >
        {layout === "list" && (
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
