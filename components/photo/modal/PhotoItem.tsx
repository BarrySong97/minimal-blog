"use client";

import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media, Photo } from "@/payload-types";
import { motion } from "framer-motion";
const Planet = ({ photo }: { photo: Photo }) => {
  return (
    <motion.div
      className="w-full flex flex-col items-center"
      layoutId={`photo-${photo.id}`}
    >
      <motion.div
        className="relative aspect-video items-end justify-center flex w-full"
        layoutId={`photo-image-${photo.id}`}
      >
        <ImageWithFallback
          image={photo.image as Media}
          alt={photo.title}
          width={600}
          height={600}
        />
      </motion.div>
    </motion.div>
  );
};

export default Planet;
