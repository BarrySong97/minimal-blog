"use client";

import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media } from "@/payload-types";
import { useTranslation } from "@/app/(app)/i18n/client";
import { RewatchItem } from "./RewatchScrollView";

interface RewatchGridProps {
  items: RewatchItem[];
  lng: string;
  className?: string;
}

const typeColors = {
  book: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  movie: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  tv: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
};

export const RewatchGrid: FC<RewatchGridProps> = ({ items, lng, className }) => {
  const { t } = useTranslation(lng);

  return (
    <div className={cn("grid grid-cols-1 gap-6", className)}>
      {items.map((item) => {
        const coverUrl = item.cover && typeof item.cover === 'object' 
          ? (item.cover as Media).url 
          : null;

        return (
          <Link
            key={item.id}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-[3/4]  overflow-hidden bg-gray-100 dark:bg-gray-800">
              {/* Cover Image */}
              {coverUrl ? (
                <ImageWithFallback
                  image={item.cover as Media}
                  alt={item.title}
                  width={300}
                  height={400}
                  enableTransition={true}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                  <span className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    {item.title.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}

              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Content overlay - positioned at bottom left */}
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* Type badge */}
                <div className="mb-2">
                  <span className={cn(
                    "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                    typeColors[item.type]
                  )}>
                    {t(`common.rewatch.types.${item.type}`)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-white font-semibold text-lg line-clamp-2 mb-1">
                  {item.title}
                </h3>

                {/* Description */}
                {item.description && (
                  <p className="text-white/80 text-sm line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </Link>
        );
      })}
    </div>
  );
};