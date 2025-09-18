"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

interface PageLoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number;
  duration?: number;
}

export function PageLoading({
  height = 3,
  duration = 800,
  className,
  ...props
}: PageLoadingProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const durationRef = useRef(duration);

  // 更新 ref 值，但不触发重新渲染
  useEffect(() => {
    durationRef.current = duration;
  }, [duration]);

  useEffect(() => {
    // 当路由变化时，显示加载条
    setIsLoading(true);
    setProgress(0);

    // 模拟进度增长 - 使用更自然的进度曲线
    const timer1 = setTimeout(() => setProgress(20), 100);
    const timer2 = setTimeout(() => setProgress(40), 200);
    const timer3 = setTimeout(() => setProgress(60), 400);
    const timer4 = setTimeout(() => setProgress(80), 600);

    // 路由加载完成后，快速完成进度条并隐藏
    const timer5 = setTimeout(() => {
      setProgress(100);
      const hideTimer = setTimeout(() => setIsLoading(false), 400);
      return () => clearTimeout(hideTimer);
    }, durationRef.current);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
    };
  }, [pathname, searchParams]); // 移除 duration 依赖，使用 ref 代替

  return (
    <div
      className={cn("fixed top-0 left-0 right-0 z-[9999]", className)}
      style={{ height: `${height}px` }}
      {...props}
    >
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ width: "0%", opacity: 0.8 }}
            animate={{
              width: `${progress}%`,
              opacity: progress < 100 ? 0.8 : 0,
            }}
            exit={{
              width: "100%",
              opacity: 0,
              transition: { duration: 0.3, ease: "easeOut" },
            }}
            className="h-full bg-black shadow-[0_0_8px_rgba(var(--primary)/0.4)] rounded-r-sm"
            transition={{
              width: {
                duration: 0.3,
                ease: "easeInOut",
              },
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
