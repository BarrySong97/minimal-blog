"use client";

import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media, Photo } from "@/payload-types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface PhotoItemProps {
  photo: Photo;
  containerDimensions: {
    width: number;
    height: number;
  };
  dimensions: {
    width: number;
    height: number;
  };
}

const PhotoItem = ({
  photo,
  containerDimensions,
  dimensions,
}: PhotoItemProps) => {
  // 设置退出动画参数

  return (
    <motion.div
      layoutId={`photo-${photo.id}`}
      className="flex items-center justify-center will-change-transform"
      style={{
        width: containerDimensions.width,
        height: containerDimensions.height,
      }}
    >
      <motion.div
        layoutId={`photo-image-${photo.id}`}
        className="relative overflow-hidden flex-1 will-change-transform"
        style={{
          width: dimensions.width,
          height: dimensions.height,
        }}
      >
        <ImageWithFallback
          image={photo.image as Media}
          alt={photo.title}
          className="object-contain"
          width={dimensions.width}
          priority
          height={dimensions.height}
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>
    </motion.div>
  );
};

export default PhotoItem;
