"use client";

import { Blog } from "@/payload-types";
import { useTranslation } from "@/app/(app)/i18n/client";
import React, { FC } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

export interface HeaderProps {
  blog: Blog;
  lng: string;
  className?: string;
}

const Header: FC<HeaderProps> = ({ blog, lng, className }) => {
  const { t } = useTranslation(lng);
  const { scrollY } = useScroll();

  // Transform values based on scroll position
  const titleSize = useTransform(scrollY, [0, 100], [1, 0.6]);
  const infoOpacity = useTransform(scrollY, [0, 60], [1, 0]); // Gradually fade out
  const infoHeight = useTransform(scrollY, [0, 60], ["1.5rem", "0rem"]); // Shrink height as it fades
  const infoMargin = useTransform(scrollY, [0, 60], ["0.25rem", "0rem"]); // Remove margin as it fades

  return (
    <div className={cn("sticky top-0  z-[100] w-full", className)}>
      <div className="mx-auto container px-5 sm:px-0">
        <div className="flex h-14 items-center bg-transparent">
          <div className="flex flex-col justify-center">
            <motion.div
              className="text-3xl font-semibold bg-transparent"
              style={{
                scale: titleSize,
                transformOrigin: "left center",
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
              {t("common.blog.readingTime")}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
