"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Media } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";
import { homeService, queryKeys } from "@/service";

interface ImageCubeProps {
  className?: string;
}

const ImageCube: React.FC<ImageCubeProps> = ({ className = "" }) => {
  const [hue, setHue] = useState(0);
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
  });

  useEffect(() => {
    const interval = setTimeout(() => {
      setHue((prevHue) => (prevHue + 1) % 360);
    }, 50); // Change hue every 50ms for smooth transition
    return () => clearTimeout(interval);
  }, [hue]);

  const backgroundColor = `hsl(${hue}, 70%, 75%)`;

  return (
    <div
      className={`aspect-square flex items-center justify-center transition-colors duration-75 ${className}`}
      style={{ backgroundColor }}
    >
      <div className="relative w-32 h-32 sm:w-48 sm:h-48">
        <div className="absolute w-3/4 h-3/4 bg-black/20 top-8 left-8 sm:top-12 sm:left-12 "></div>

        <div className="absolute w-3/4 h-3/4 bg-black/40 top-4 left-4 sm:top-6 sm:left-6"></div>

        <div className="absolute w-3/4 h-3/4 bg-teal-950 top-0 left-0 ">
          <Image
            src={(data?.avatar! as Media)?.url!}
            className="w-full h-full object-cover"
            alt="Bitrecs"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default ImageCube;
