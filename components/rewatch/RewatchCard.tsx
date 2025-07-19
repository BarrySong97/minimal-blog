"use client";

import { Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Icon } from "@iconify/react";

interface RewatchCardProps {
  title: string;
  description?: string;
  cover?: string | Media | null;
  link: string;
  type: "book" | "movie" | "tv";
  className?: string;
}

const typeLabels = {
  book: "书籍",
  movie: "电影",
  tv: "电视剧",
};

const typeColors = {
  book: "bg-blue-100 text-blue-800",
  movie: "bg-green-100 text-green-800",
  tv: "bg-purple-100 text-purple-800",
};

export function RewatchCard({
  title,
  description,
  cover,
  link,
  type,
  className,
}: RewatchCardProps) {
  const handleClick = () => {
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const coverUrl = typeof cover === "string" ? cover : cover?.url;

  return (
    <div
      className={cn(
        "group cursor-pointer overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md",
        className
      )}
      onClick={handleClick}
    >
      {/* Cover Image */}
      <div className="aspect-[3/4] overflow-hidden">
        <ImageWithFallback
          image={cover as Media}
          alt={title}
          fill={true}
          enableTransition={true}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Type Badge */}
        <div className="mb-2">
          <span
            className={cn(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
              typeColors[type]
            )}
          >
            {typeLabels[type]}
          </span>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        )}

        {/* External Link Icon */}
        <div className="mt-3 flex items-center text-gray-400 group-hover:text-blue-500 transition-colors">
          <Icon icon="lucide:external-link" className="h-4 w-4" />
          <span className="ml-1 text-xs">查看详情</span>
        </div>
      </div>
    </div>
  );
}
