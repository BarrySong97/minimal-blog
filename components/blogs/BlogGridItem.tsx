"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";
import { MaterialSymbolsArrowForwardRounded } from "./icon";
import { ViewHover } from "../common/ViewHover";
import { Media, Blog } from "@/payload-types";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface BlogGridItemProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Blog;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export function BlogGridItem({
  post,
  isHovered,
  onMouseEnter,
  onMouseLeave,
  className,
  ...props
}: BlogGridItemProps) {
  const { t } = useTranslation("common");

  return (
    <div className={cn("group relative", className)} {...props}>
      <Link
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        href={`/blogs/${post.slug}`}
        className="group relative flex flex-col md:flex-row h-auto md:h-[400px] overflow-hidden border shadow-sm transition-all duration-300 hover:shadow-purple-200/20 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm"
      >
        <ViewHover isHover={isHovered} trackMouse />

        <div className=" aspect-[1/1] md:w-1/2 md:aspect-[4/3] overflow-hidden relative">
          <ImageWithFallback
            image={post.coverImage as Media}
            isThumbnail
            alt={post.title}
            width={800}
            height={800}
            className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
          />
          <div
            className={cn(
              "absolute bottom-0 right-0 bg-primary z-50 py-2 text-white text-sm px-4",
              "motion-scale-in-[0.5] motion-opacity-in-[0%]",
              "flex items-center gap-2",
              "hidden group-hover:flex"
            )}
          >
            <span>Read More</span>
            <MaterialSymbolsArrowForwardRounded className="w-4 h-4" />
          </div>
        </div>

        <div className="flex flex-1 flex-col justify-between p-4 md:px-6 md:py-4 relative">
          <div className="flex items-center gap-3 mb-4 text-sm md:absolute md:top-4 md:right-4">
            <span className="">
              {format(new Date(post.date), "yyyy-MM-dd")}
            </span>
            <span className="">•</span>
            <span className="">
              {post.readingTime} {t("blog.readingTime")}
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          <div className="flex-1 relative z-10 flex flex-col justify-between sm:mb-4">
            <div></div>
            <div>
              <h3 className="text-xl font-semibold leading-tight text-gray-900 transition-colors duration-300 mb-4">
                {post.title}
              </h3>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4 md:mb-0">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
