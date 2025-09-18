"use client";

import { FC, useRef, useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "motion/react";
import { PhotoCard } from "./PhotoCard";
import { Model } from "@/data/models";
import { Icon } from "@iconify/react";

interface ScrollablePhotoListProps {
  models: Model[];
}

export const ScrollablePhotoList: FC<ScrollablePhotoListProps> = ({
  models,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // 使用弹簧物理效果使移动更加平滑
  const x = useSpring(0, {
    stiffness: 100,
    damping: 30,
    mass: 1,
  });

  // 设置图片宽度和间距
  const imageWidth = 300; // 图片宽度
  const imageGap = 32; // 图片间距
  const singleImageOffset = imageWidth + imageGap; // 单张图片的总移动距离
  const maxOffset = -(models.length - 1) * singleImageOffset; // 最大可移动距离

  // 监听x的变化来检测是否到达末尾
  useEffect(() => {
    const unsubscribe = x.onChange((latest) => {
      setIsAtEnd(latest === maxOffset);
    });

    return () => unsubscribe();
  }, [x, maxOffset]);

  // 处理滚动事件
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let accumulatedDelta = 0;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      // 累积滚动距离
      accumulatedDelta += e.deltaY;

      // 当累积滚动超过阈值时，移动一张图片的距离
      if (Math.abs(accumulatedDelta) > 100) {
        // 阈值可以调整
        if (accumulatedDelta > 0) {
          // 向下/右滚动，移动到下一张
          x.set(Math.max(x.get() - singleImageOffset, maxOffset));
        } else {
          // 向上/左滚动，移动到上一张
          x.set(Math.min(x.get() + singleImageOffset, 0));
        }

        // 重置累积滚动
        accumulatedDelta = 0;
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [models.length, x, singleImageOffset, maxOffset]);

  return (
    <>
      <AnimatePresence>
        {models.length > 1 && x.get() > maxOffset && (
          <motion.div
            className=""
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <span>Scroll to see more</span>
            <Icon
              icon="tabler:mouse-scroll"
              className="h-5 w-5 animate-bounce"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative w-full h-[60vh]">
        <div
          className="h-full"
          ref={containerRef}
          style={{
            overflow: "hidden",
          }}
        >
          {/* 内容区 */}
          <div className="w-full h-full flex items-center ">
            <div className="w-full overflow-hidden">
              <motion.div className="flex space-x-8" style={{ x }}>
                {models.map((model) => (
                  <div
                    key={model.name}
                    className="flex-shrink-0"
                    style={{
                      willChange: "transform",
                      width: `${imageWidth}px`,
                    }}
                  >
                    <PhotoCard
                      name={model.name}
                      region={model.region}
                      imageSrc={model.imageSrc}
                    />
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
      </div>
    </>
  );
};
