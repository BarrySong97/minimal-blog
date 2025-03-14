"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Loading() {
  // 花瓣数量
  const petalCount = 5;
  // 花瓣角度计算
  const getRotation = (index: number) => (360 / petalCount) * index;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-30 w-30">
          {/* 花朵中心 */}
          <motion.div
            className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.5,
              ease: "easeOut",
            }}
          />

          {/* 花瓣 */}
          {Array.from({ length: petalCount }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                rotate: `${getRotation(index)}deg`,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: index * 0.15,
                duration: 0.3,
              }}
            >
              {/* 樱花花瓣 - 使用自定义形状 */}
              <motion.div
                className="absolute"
                style={{
                  width: "18px",
                  height: "36px",
                  top: "-42px",
                  left: "-9px",
                  background:
                    "linear-gradient(to bottom, #fcd5ce 0%, #ffb7c5 100%)",
                  borderRadius: "100% 100% 45% 45% / 75% 75% 25% 25%",
                  boxShadow: "0 0 10px rgba(252, 213, 206, 0.4)",
                  transformOrigin: "center bottom",
                  // 樱花花瓣顶部的微凹
                  clipPath:
                    "polygon(0% 0%, 50% 12%, 100% 0%, 100% 100%, 0% 100%)",
                }}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: index * 0.15,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                }}
                whileInView={{
                  rotate: [0, 2, 0, -2, 0],
                  transition: {
                    delay: 0.8 + index * 0.1,
                    duration: 1.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatDelay: 0.2,
                  },
                }}
              />
            </motion.div>
          ))}

          {/* 花蕊装饰 */}
          {Array.from({ length: 5 }).map((_, index) => (
            <motion.div
              key={`stamen-${index}`}
              className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-400"
              style={{
                x: Math.cos((index * Math.PI * 2) / 5) * 4,
                y: Math.sin((index * Math.PI * 2) / 5) * 4,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.9 + index * 0.05,
                duration: 0.3,
              }}
            />
          ))}
        </div>

        <motion.p
          className="text-sm font-medium"
          style={{ color: "#ffb7c5" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          加载中...
        </motion.p>
      </div>
    </div>
  );
}
