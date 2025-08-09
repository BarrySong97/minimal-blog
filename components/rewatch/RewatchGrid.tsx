"use client";

import React, { FC } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media } from "@/payload-types";
import { useTranslation } from "@/app/(app)/i18n/client";
import { RewatchItem } from "./RewatchScrollView";

interface RewatchGridProps {
  groupedItems: Record<string, RewatchItem[]>;
  lng: string;
  className?: string;
}

const typeColors = {
  book: "bg-amber-50 text-amber-900 dark:bg-amber-900/20 dark:text-amber-100",
  movie: "bg-rose-50 text-rose-900 dark:bg-rose-900/20 dark:text-rose-100",
  tv: "bg-slate-50 text-slate-900 dark:bg-slate-900/20 dark:text-slate-100",
};

const typeOrder = ["book", "movie", "tv"] as const;

export const RewatchGrid: FC<RewatchGridProps> = ({
  groupedItems,
  lng,
  className,
}) => {
  const { t } = useTranslation(lng);

  return (
    <div className={cn("space-y-16", className)}>
      {typeOrder.map((type) => {
        const items = groupedItems[type];
        if (!items || items.length === 0) return null;

        return (
          <section key={type} className="space-y-8">
            {/* Section Header */}
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {t(`common.rewatch.types.${type}`)}
              </h2>
            </div>

            {/* Grid of Items - Only show first item */}
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
              {items.slice(0, 1).map((item) => {
                const coverUrl =
                  item.cover && typeof item.cover === "object"
                    ? (item.cover as Media).url
                    : null;

                const cover = item.cover as Media;
                const imageWidth = cover?.width || 0;
                const imageHeight = cover?.height || 0;
                const isPortrait = imageHeight > imageWidth;

                return (
                  <Link
                    key={item.id}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block w-full"
                  >
                    <div className="overflow-hidden bg-white dark:bg-gray-900">
                      {/* Cover Image */}
                      <div className="relative overflow-hidden">
                        {coverUrl ? (
                          <ImageWithFallback
                            image={item.cover as Media}
                            alt={item.title}
                            width={400}
                            height={0}
                            enableTransition={true}
                            className={cn(
                              "w-full object-cover group-hover:scale-105 transition-transform duration-300",
                              isPortrait ? "max-h-[400px]" : "h-auto"
                            )}
                            style={
                              isPortrait ? { objectPosition: "center top" } : {}
                            }
                          />
                        ) : (
                          <div
                            className={cn(
                              "w-full aspect-[3/4] flex items-center justify-center text-4xl font-bold",
                              typeColors[item.type]
                            )}
                          >
                            {item.title.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>

                      {/* Content below image */}
                      <div
                        className={cn(
                          "bg-gray-100 dark:bg-gray-800",
                          isPortrait ? "p-8" : "p-6"
                        )}
                      >
                        {/* Title */}
                        <h3
                          className={cn(
                            "text-gray-900 dark:text-gray-100 font-bold mb-2 line-clamp-2",
                            isPortrait ? "text-2xl" : "text-xl"
                          )}
                        >
                          {item.title}
                        </h3>

                        {/* Description */}
                        {item.description && (
                          <p
                            className={cn(
                              "text-gray-600 dark:text-gray-400",
                              isPortrait
                                ? "text-base line-clamp-4"
                                : "text-sm line-clamp-3"
                            )}
                          >
                            {item.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
};
