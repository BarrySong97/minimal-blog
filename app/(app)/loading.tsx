"use client";
import React from "react";

export default function Loading() {
  // 花瓣数量
  const petalCount = 5;
  // 花瓣角度计算
  const getRotation = (index: number) => (360 / petalCount) * index;
  // 花瓣延迟计算
  const getDelay = (index: number) => `${index * 0.15}s`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-6">
        <div className="relative h-30 w-30">
          {/* 花朵中心 */}
          <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200 opacity-0 animate-[fadeIn_0.5s_0.8s_ease-out_forwards]" />

          {/* 花瓣 */}
          {Array.from({ length: petalCount }).map((_, index) => (
            <div
              key={index}
              className="absolute left-1/2 top-1/2 origin-bottom"
              style={{
                rotate: `${getRotation(index)}deg`,
              }}
            >
              <div
                className="absolute opacity-0 animate-[petalAppear_0.5s_ease-out_forwards] [transform-origin:center_bottom]"
                style={{
                  width: "18px",
                  height: "36px",
                  top: "-42px",
                  left: "-9px",
                  background:
                    "linear-gradient(to bottom, #fcd5ce 0%, #ffb7c5 100%)",
                  borderRadius: "100% 100% 45% 45% / 75% 75% 25% 25%",
                  boxShadow: "0 0 10px rgba(252, 213, 206, 0.4)",
                  clipPath:
                    "polygon(0% 0%, 50% 12%, 100% 0%, 100% 100%, 0% 100%)",
                  animationDelay: getDelay(index),
                  animation: `petalAppear 0.5s ${getDelay(
                    index
                  )} ease-out forwards, sway 2s ${
                    0.8 + index * 0.1
                  }s ease-in-out infinite`,
                }}
              />
            </div>
          ))}
        </div>

        <p className="text-sm font-medium mt-8 text-[#ffb7c5] opacity-0 animate-[fadeIn_0.5s_1s_ease-out_forwards]">
          加载中...
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes petalAppear {
          0% {
            opacity: 0;
            transform: scale(0);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes sway {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(2deg);
          }
          75% {
            transform: rotate(-2deg);
          }
        }
      `}</style>
    </div>
  );
}
