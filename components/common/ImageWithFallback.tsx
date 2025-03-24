"use client";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { Media } from "@/payload-types";
import Image from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

export const ImageWithFallback = ({
  alt,
  className,
  enableTransition = true,
  ...props
}: Omit<ImageProps, "src"> & {
  image: Media;
  enableTransition?: boolean;
}) => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { image } = props;
  const url = image?.url;
  const blurhash = image?.blurhash;
  const blurImage = blurhash ? blurHashToDataURL(blurhash) : null;

  // 判断图片大小是否适合应用过渡动画 (通常小于500KB的图片加载较快，可能不需要过渡动画)
  const isSmallImage = image?.filesize && image.filesize < 500 * 1024; // 500KB

  // 根据enableTransition参数和图片大小决定是否应用过渡动画
  const shouldApplyTransition = enableTransition && !isSmallImage;

  const handleError = () => {
    setError(true);
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <Image
      src={error && !url ? "/imager-error.webp" : url!}
      alt={alt}
      onError={handleError}
      onLoad={handleLoad}
      placeholder={blurImage ? "blur" : "empty"}
      blurDataURL={blurImage ?? ""}
      className={cn(
        shouldApplyTransition ? "transition-all duration-700 ease-in-out" : "",
        shouldApplyTransition && !isLoaded
          ? "blur-sm brightness-90 opacity-80"
          : shouldApplyTransition
          ? "blur-0 brightness-100 opacity-100"
          : "",
        className
      )}
      {...props}
    />
  );
};
