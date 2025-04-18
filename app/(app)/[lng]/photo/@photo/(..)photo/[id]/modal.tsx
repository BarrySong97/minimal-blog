"use client";
import PhotoItem from "@/components/photo/modal/PhotoItem";
import { getQueryClient } from "@/components/tanstack/get-query-client";
import { useLayoutNavigation } from "@/hooks/use-layout-navigation";
import { queryKeys } from "@/service";
import { PhotosResponse } from "@/service/photo";
import { InfiniteData } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useLayoutEffect } from "react";
import { Media } from "@/payload-types";
import PhotoMeta from "@/components/photo/detail/PhotoMeta";

// 增加退出动画持续时间，使其更慢更平滑

const Modal = ({ id }: { id: string }) => {
  const { isOpen, open, setIsOpen } = useLayoutNavigation();
  const queryClient = getQueryClient();
  const photoData = queryClient.getQueryData<InfiniteData<PhotosResponse>>(
    queryKeys.photos.infinite
  );
  const [conterinDimensions, setconterinDimensions] = useState({
    width: 0,
    height: 0,
  });
  const photo = photoData?.pages
    .flatMap((page) => page.docs)
    .find((photo) => String(photo.id) === id);

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [dimensionsCalculated, setDimensionsCalculated] = useState(false);

  useLayoutEffect(() => {
    if (!photo) return;

    const calculateDimensions = () => {
      const containerHeight = document.documentElement.clientHeight;
      const containerWidth = window.innerWidth / 2;
      const imageWidth = (photo.images[0].image as Media).width || 1;
      const imageHeight = (photo.images[0].image as Media).height || 1;

      // Calculate aspect ratios
      const containerRatio = containerWidth / containerHeight;
      const imageRatio = imageWidth / imageHeight;

      // Scaling factor - reduce to leave some space around the image
      const scaleFactor = 0.85;

      let finalWidth, finalHeight;

      // If image is more landscape than container
      if (imageRatio > containerRatio) {
        // Fit by width but scaled down
        finalWidth = containerWidth * scaleFactor;
        finalHeight = finalWidth / imageRatio;
      } else {
        // Fit by height but scaled down
        finalHeight = containerHeight * scaleFactor;
        finalWidth = finalHeight * imageRatio;
      }

      // If image ratio is very close to container ratio (within 1%),
      // we can consider it a "perfect fit" and use the full container size
      const ratioTolerance = 0.01; // 1% tolerance
      const isNearPerfectFit =
        Math.abs(imageRatio - containerRatio) / containerRatio < ratioTolerance;

      if (isNearPerfectFit) {
        finalWidth = containerWidth;
        finalHeight = containerHeight;
      }

      setDimensions({
        width: finalWidth,
        height: finalHeight,
      });
      setconterinDimensions({
        width: containerWidth,
        height: containerHeight,
      });
      setDimensionsCalculated(true);
    };

    // Calculate immediately
    calculateDimensions();

    // Recalculate on resize
    const handleResize = () => {
      calculateDimensions();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [photo]);

  useLayoutEffect(() => {
    if (dimensionsCalculated) {
      open();
    }
  }, [dimensionsCalculated, open, setIsOpen]);
  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          transition={{ duration: 0.4, delay: 0.1 }}
          className="fixed inset-0 z-[9999] will-change-auto"
        >
          {/* White background mask with fade animation */}
          <motion.div
            className="absolute z-0 inset-0 bg-white will-change-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          />

          {/* Content container */}
          <div className="relative z-10 w-full min-h-screen">
            <motion.div className="w-full h-screen bg-white flex">
              <PhotoItem
                key={`photo-item-${photo.id}`}
                photo={photo}
                containerDimensions={conterinDimensions}
                dimensions={dimensions}
              />
              <PhotoMeta photo={photo} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
