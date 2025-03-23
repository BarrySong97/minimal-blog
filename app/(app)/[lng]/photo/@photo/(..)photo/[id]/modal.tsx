"use client";
import PhotoItem from "@/components/photo/modal/PhotoItem";
import { getQueryClient } from "@/components/tanstack/get-query-client";
import { useLayoutNavigation } from "@/hooks/use-layout-navigation";
import { queryKeys } from "@/service";
import { PhotosResponse } from "@/service/photo";
import { InfiniteData } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

const duration = 300 / 1000;

const Modal = ({ id }: { id: string }) => {
  const { isOpen, open, setIsOpen } = useLayoutNavigation();
  const queryClient = getQueryClient();
  const photoData = queryClient.getQueryData<InfiniteData<PhotosResponse>>(
    queryKeys.photos.infinite
  );
  const photo = photoData?.pages
    .flatMap((page) => page.docs)
    .find((photo) => String(photo.id) === id);

  useEffect(() => {
    open();

    return () => {
      setIsOpen(false);
    };
  }, []);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="w-full h-full z-50 fixed top-0 overflow-y-auto ">
          <motion.div
            className="mx-auto bg-background p-6 top-10 max-w-5xl"
            transition={{ duration }}
          >
            <PhotoItem photo={photo!} />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
