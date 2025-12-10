"use client";

import { Blog, Media } from "@/payload-types";
import React, { FC, useEffect, useState } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "motion/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
export interface HeaderProps {
  blog: Blog;
  className?: string;
}

const Header: FC<HeaderProps> = ({ blog, className }) => {
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsLargeScreen(window.innerWidth >= 1512);
    const body = document.body;
    body.classList.remove("overflow-hidden");

    return () => {
      // 如果上面的方法不起作用，可以尝试延迟执行
      setTimeout(() => {
        window.scroll({ top: -1, left: 0, behavior: "smooth" });
      }, 10);

      body.classList.add("overflow-hidden");
    };
  }, []);
  const { scrollY } = useScroll();

  // Check if screen width is at least 1512px

  // Transform values based on scroll position (only when screen is large enough)
  const titleSize = useTransform(scrollY, [0, 100], [1, 0.6]);
  const infoOpacity = useTransform(scrollY, [0, 60], [1, 0]);
  const infoHeight = useTransform(scrollY, [0, 60], ["1.5rem", "0rem"]);
  const infoMargin = useTransform(scrollY, [0, 60], ["0.25rem", "0rem"]);
  const itemsAlignment = useTransform(scrollY, [0, 60], ["flex-end", "center"]);
  const maxWidth = useTransform(scrollY, [0, 60], ["600px", "800px"]);

  return (
    <div
      className={cn(
        "w-full mb-12 bg-white",
        className,
        isLargeScreen ? "sticky top-0 z-[100]" : ""
      )}
    >
      <div className="mx-auto container ">
        {isLargeScreen ? (
          <motion.div
            className="flex h-14 bg-transparent justify-between "
            style={{
              alignItems: itemsAlignment,
            }}
          >
            <div className="flex flex-col justify-center">
              <motion.div
                className={cn("text-3xl font-semibold bg-transparent ")}
                // layoutId={`blog-title-${blog.id}`}
                style={{
                  scale: titleSize,
                  transformOrigin: "left center",
                  maxWidth: maxWidth,
                }}
              >
                {blog.title}
              </motion.div>

              <motion.div
                className="text-xs text-foreground/60 font-medium overflow-hidden"
                style={{
                  opacity: infoOpacity,
                  height: infoHeight,
                  marginTop: infoMargin,
                  transformOrigin: "left top",
                }}
              >
                {format(new Date(blog.date), "yyyy-MM-dd")} · {blog.readingTime}{" "}
                分钟阅读
              </motion.div>
            </div>

            <Link
              href={`/blogs`}
              className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 py-1.5 px-3 rounded-md hover:bg-foreground/5"
            >
              <Icon icon="lucide:arrow-left" className="w-4 h-4" />
              <span>回到列表</span>
            </Link>
          </motion.div>
        ) : (
          <div className="flex justify-between sm:items-end sm:flex-row flex-col-reverse gap-4 sm:gap-0 items-start">
            <div className="flex flex-col justify-center">
              <div
                className="text-3xl font-semibold bg-transparent mb-1"
                style={{
                  maxWidth: "600px",
                }}
              >
                {blog.title}
              </div>

              <div
                className="text-xs text-foreground/60 font-medium overflow-hidden"
                style={{
                  height: "1.5rem",
                  marginTop: "0.25rem",
                  transformOrigin: "left top",
                }}
              >
                {format(new Date(blog.date), "yyyy-MM-dd")} · {blog.readingTime}{" "}
                reading time
              </div>
            </div>

            <Link
              href={`/blogs`}
              className="flex items-center gap-1 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors duration-200 py-1.5 px-3 rounded-md hover:bg-foreground/5"
            >
              <Icon icon="lucide:arrow-left" className="w-4 h-4" />
              <span>回到列表</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
