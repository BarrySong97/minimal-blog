"use client";

import { Photo, Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useState } from "react";

// PhotoMeta component for displaying photo metadata
interface PhotoMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  excerpt?: string;
  date: string;
  showExcerpt?: boolean;
}

export const PhotoMeta: React.FC<PhotoMetaProps> = ({
  title,
  excerpt,
  date,
  showExcerpt = true,
  className,
  ...props
}) => {
  const formattedDate = format(new Date(date), "MMM d, yyyy");

  return (
    <div className={cn("text-white", className)} {...props}>
      <h3 className="text-lg font-medium line-clamp-1">{title}</h3>

      <p className="mt-1 text-sm line-clamp-2 text-gray-200">{excerpt}</p>

      <div className="mt-2 flex items-center text-xs text-gray-300">
        <Icon icon="mdi:calendar" className="mr-1" />
        <span>{formattedDate}</span>
      </div>
    </div>
  );
};

export interface PhotoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({
  photo,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper function to safely get media URL and dimensions
  const getMediaUrl = (media: number | Media): string => {
    if (typeof media === "number") {
      return "";
    }
    return media.url || "";
  };

  const getMediaDimension = (
    media: number | Media,
    dimension: "width" | "height"
  ): number => {
    if (typeof media === "number") {
      return 0;
    }
    return media[dimension] || 0;
  };

  const imageUrl = getMediaUrl(photo.image);
  const imageWidth = getMediaDimension(photo.image, "width") || 800;
  const imageHeight = getMediaDimension(photo.image, "height") || 600;

  return (
    <motion.div
      className={cn(
        "group relative overflow-hidden rounded-lg bg-card shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image container */}
      <div className="aspect-[4/3] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder-image.jpg"}
          alt={photo.title}
          width={imageWidth}
          height={imageHeight}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content overlay - only covers the meta information area */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent h-auto pb-4 pt-16" />

      {/* Photo info - always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <PhotoMeta
          title={photo.title}
          excerpt={photo.excerpt}
          date={photo.date}
        />
      </div>
    </motion.div>
  );
};

export default PhotoCard;
