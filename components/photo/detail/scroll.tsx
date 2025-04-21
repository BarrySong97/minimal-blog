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
}
const PhotoScroll: FC<PhotoScrollProps> = ({
  photos,
  photoIndex = 0,
  onSelect,
}) => {
  return (
    <div className="w-[100px] h-screen flex flex-col justify-center gap-2 px-2">
      {photos.map((photo, index) => (
        <div
          onClick={() => onSelect(index)}
          key={photo.id}
          className={cn(index === photoIndex && "", "cursor-pointer relative")}
        >
          {index === photoIndex && (
            <motion.div
              layoutId={`photo-outline`}
              className="absolute -left-1 -right-1 -top-1 -bottom-1 border-[1px] border-primary"
            ></motion.div>
          )}
          <Image
            src={((photo as any).image as unknown as Media).url!}
            alt={`photo-${index}`}
            width={160}
            height={160}
          />
        </div>
      ))}
    </div>
  );
};

export default PhotoScroll;
