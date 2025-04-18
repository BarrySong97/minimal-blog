"use client";

import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Media, Photo } from "@/payload-types";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation";

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
  isPage?: boolean;
}

const PhotoItem = ({
  photo,
  containerDimensions,
  dimensions,
  isPage = false,
}: PhotoItemProps) => {
  const router = useRouter();

  const blurImage = blurHashToDataURL(
    (photo.images[0].image as Media).blurhash!
  );
  return (
    <motion.div
      layoutId={`photo-${photo.id}`}
      className="flex items-center justify-center will-change-transform"
      style={{
        width: containerDimensions.width,
        height: containerDimensions.height,
      }}
    >
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-20 text-white bg-black/30 rounded-full p-2 hover:bg-black/50 transition-colors"
        aria-label="Go back"
      >
        <Icon icon="mdi:arrow-left" className="w-6 h-6" />
      </button>

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
            image={photo.images[0].image as Media}
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
          <ImageWithFallback
            image={photo.images[0].image as Media}
            alt={photo.title}
            className="object-contain"
            fill
            priority
            style={{ width: "100%", height: "100%" }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default PhotoItem;
