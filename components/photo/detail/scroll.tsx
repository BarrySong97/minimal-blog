"use client";
import React, { FC } from "react";
import Image from "next/image";
import { Media, Photo } from "@/payload-types";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
export interface PhotoScrollProps {
  photos: Photo[];
  onSelect: (index: number) => void;
  photoIndex: number;
  className?: string;
}
const PhotoScroll: FC<PhotoScrollProps> = ({
  photos,
  photoIndex = 0,
  onSelect,
  className,
}) => {
  return (
    <div
      className={cn(
        "sm:w-[100px]  sm:h-screen  sm:flex-col   gap-2 px-2",
        className
      )}
    >
      {photos.map((photo, index) => (
        <div
          onClick={() => onSelect(index)}
          key={index}
          className={cn(
            index === photoIndex && "",
            "cursor-pointer relative",
            "max-[720px]:shrink-0 ",
            "max-[720px]:w-[88px] max-[720px]:h-[68px] flex justify-center items-center"
          )}
        >
          {index === photoIndex && (
            <motion.div
              layoutId={`photo-outline`}
              className="absolute left-0 right-0 bottom-0 top-0 sm:-left-1 sm:-right-1 sm:-top-1 sm:-bottom-1 border-[1px] border-primary"
            ></motion.div>
          )}
          <Image
            src={((photo as any).image as unknown as Media).url!}
            alt={`photo-${index}`}
            className="object-cover max-[720px]:h-[60px] max-[720px]:w-[80px]"
            width={160}
            height={160}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoScroll;
