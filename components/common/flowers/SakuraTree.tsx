"use client";

import { useEffect, useRef } from "react";
import { SakuraAnimation } from "./sakura";
import { cn } from "@/lib/utils";

interface SakuraTreeProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function SakuraTree({ className, ...props }: SakuraTreeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<SakuraAnimation | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 添加一个小延迟，以获得更好的用户体验
    const timer = setTimeout(() => {
      // 初始化动画
      animationRef.current = new SakuraAnimation(canvasRef.current!);
    }, 600);

    // 组件卸载时清理
    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        animationRef.current.destroy();
        animationRef.current = null;
      }
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-0 pointer-events-none overflow-hidden",
        className
      )}
      {...props}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: 0.95, // 更高的不透明度，使樱花更明显
          mixBlendMode: "normal", // 使用正常混合模式，保持颜色鲜艳
        }}
      />
    </div>
  );
}
