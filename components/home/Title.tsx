"use client";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TitleProps {
  className?: string;
  title?: string;
}

const Title: FC<TitleProps> = ({ className, title = "" }) => {
  // 将标题拆分为单个字符
  const characters = title.split("");

  // 字符动画变体
  const characterVariants = {
    hidden: {
      opacity: 0,
      filter: "blur(8px)",
      // 初始状态完全透明
      backgroundColor: "rgba(255, 255, 255, 0)",
    },
    visible: (i: number) => ({
      opacity: 1,
      filter: "blur(0px)",
      // 最终状态也保持透明
      backgroundColor: "rgba(255, 255, 255, 0)",
      transition: {
        delay: i * 0.1, // 每个字符延迟显示
        duration: 0.3,
        ease: "easeInOut",
      },
    }),
  };

  return (
    <motion.h2
      className={cn(
        className,
        "flex flex-wrap justify-center mix-blend-difference"
      )}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          custom={index}
          variants={characterVariants}
          className={cn(
            "whitespace-pre relative",
            char === " " ? "w-[0.25em]" : "mx-[0.01em]"
          )}
        >
          {char}
        </motion.span>
      ))}
    </motion.h2>
  );
};

export default Title;
