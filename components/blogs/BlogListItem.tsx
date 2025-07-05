"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { forwardRef } from "react";
import { MaterialSymbolsArrowForwardRounded } from "./icon";
import { ViewHover } from "../common/ViewHover";
import { Blog } from "@/payload-types";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

interface BlogListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  post: Blog;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

export const BlogListItem = forwardRef<HTMLDivElement, BlogListItemProps>(
  function BlogListItem(
    { post, isHovered, onMouseEnter, onMouseLeave, className, ...props },
    ref
  ) {
    const { t } = useTranslation("common");

    return (
      <div
        ref={ref}
        className={cn("group relative z-10", className)}
        {...props}
      >
        <Link
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          href={`/blogs/${post.slug}`}
          className="group relative flex flex-row h-auto overflow-hidden transition-all duration-300 backdrop-blur-sm"
        >
          <div className="flex flex-1 flex-col justify-between p-4 px-0 md:py-4 relative">
            <div className="flex items-center gap-3 mb-4 text-sm md:absolute md:top-4 md:right-4">
              <span className="text-gray-500">
                {format(new Date(post.date), "yyyy-MM-dd")}
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {post.readingTime} {t("blog.readingTime")}
              </span>
            </div>

            <div className="flex-1 relative z-10 flex flex-col justify-between sm:mb-4">
              <div></div>
              <div>
                <h3 className="group-hover:underline text-xl font-semibold leading-tight text-gray-900 transition-colors duration-300 mb-4">
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
);
