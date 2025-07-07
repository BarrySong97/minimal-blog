import { Media } from "@/payload-types";
import React, { FC } from "react";
import Image from "next/image";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
export interface HorizentalImagesProps {
  filename: string;
  images: {
    image: Media;
  }[];
  className?: string;
}
const HorizentalImages: FC<HorizentalImagesProps> = ({
  filename,
  images,
  className,
}) => {
  console.log(images);
  return (
    <div className={`${[className].filter(Boolean).join(" ")} py-4`}>
      <div className="flex  gap-4">
        {images.map((image) => (
          <div key={image.image.id}>
            <ImageWithFallback
              image={image.image}
              alt={image.image.alt || ""}
              width={image.image.width || 0}
              height={image.image.height || 0}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizentalImages;
