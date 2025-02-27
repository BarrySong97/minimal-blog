"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function AnimatedBackground({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-0 overflow-hidden",
        "bg-white dark:bg-black",
        className
      )}
      {...props}
    >
      {/* Subtle moving dots pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "bg-[radial-gradient(#00000009_1px,transparent_1px)] dark:bg-[radial-gradient(#ffffff09_1px,transparent_1px)]",
          "bg-[size:20px_20px]",
          "animate-move-background"
        )}
      />

      {/* Subtle moving lines */}
      <div className="absolute inset-0">
        <div className="absolute h-[200%] w-[200%] -left-1/2 -top-1/2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute inset-0",
                "border-[0.5px] border-black/[0.03] dark:border-white/[0.03]",
                "rounded-[40%]",
                "animate-slow-spin",
                i === 0 && "animation-delay-0",
                i === 1 && "animation-delay-[2000ms] scale-[1.2]",
                i === 2 && "animation-delay-[4000ms] scale-[1.4]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
