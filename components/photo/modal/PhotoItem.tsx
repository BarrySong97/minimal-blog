"use client";

import { useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media, Photo } from "@/payload-types";
import { motion, AnimatePresence } from "framer-motion";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";

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
  photoIndex: number;
  isPage?: boolean;
}

const imageVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    zIndex: 1,
    opacity: 1,
  },
  exit: {
    zIndex: 0,
    opacity: 0,
  },
};

const PhotoItem = ({
  photo,
  containerDimensions,
  dimensions,
  isPage = false,
  photoIndex,
}: PhotoItemProps) => {
  return (
    <motion.div
      layoutId={`photo-${photo.id}`}
      className="flex flex-col items-center justify-center will-change-transform"
      style={{
        width: containerDimensions.width,
        height: containerDimensions.height,
      }}
    >
      {/* <img
        src={blurImage}
        className="h-full opacity-90 blur-[1px]   w-full object-cover z-0 absolute "
      /> */}

      {isPage ? (
        <motion.div
          className="relative overflow-hidden flex-1 z-10 will-change-transform "
          initial={{
            opacity: 0,
            scale: 0.9,
            z: -100,
            filter: "blur(12px)",
            perspective: 1000,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            z: 0,
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1.5,
            ease: [0.23, 1, 0.32, 1],
          }}
          style={{
            transformStyle: "preserve-3d",
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <ImageWithFallback
            image={photo.images[photoIndex].image as Media}
            alt={photo.title}
            className="object-contain shadow-lg"
            fill
            priority
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      ) : (
        <motion.div
          layoutId={`photo-image-${photo.id}`}
          className="relative z-10 overflow-hidden flex-1 will-change-transform"
          style={{
            width: dimensions.width,
            height: dimensions.height,
          }}
        >
          <div>
            <ImageWithFallback
              image={photo.images[photoIndex].image as Media}
              alt={photo.title}
              className="object-contain"
              fill
              priority
              style={{ width: "100%", height: "100%" }}
            />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhotoItem;
