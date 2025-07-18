"use client";

import { cn } from "@/lib/utils";
import { RewatchCard } from "./RewatchCard";
import { Media } from "@/payload-types";

export interface RewatchItem {
  id: string;
  title: string;
  description?: string;
  cover?: string | Media | null;
  link: string;
  type: "book" | "movie" | "tv";
}

interface RewatchGridProps {
  items: RewatchItem[];
  className?: string;
}

export function RewatchGrid({ items, className }: RewatchGridProps) {
  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-gray-500 text-center">
          <p className="text-lg font-medium mb-2">暂无内容</p>
          <p className="text-sm">还没有添加想要再看的内容</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
        className
      )}
    >
      {items.map((item) => (
        <RewatchCard
          key={item.id}
          title={item.title}
          description={item.description}
          cover={item.cover}
          link={item.link}
          type={item.type}
        />
      ))}
    </div>
  );
}