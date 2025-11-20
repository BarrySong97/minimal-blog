"use client";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { Media } from "@/payload-types";
import Image from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/get-image-url";

type ImageSize = "card" | "thumbnail" | "tablet" | "original";

export const ImageWithFallback = ({
  alt,
  className,
  enableTransition = true,
  isThumbnail = false,
  size,
  ...props
}: Omit<ImageProps, "src"> & {
  image: Media;
  isThumbnail?: boolean;
  enableTransition?: boolean;
  size?: ImageSize;
}) => {
  const [error, setError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { image } = props;

  // 根据 size 参数选择对应的图片 URL
  let url: string | null | undefined = image?.url;

  if (size === "card" && image?.sizes?.card?.url) {
    url = image.sizes.card.url;
  } else if (size === "thumbnail" && image?.sizes?.thumbnail?.url) {
    url = image.sizes.thumbnail.url;
  } else if (size === "tablet" && image?.sizes?.tablet?.url) {
    url = image.sizes.tablet.url;
  } else if (size === "original" && image?.sizes?.original?.url) {
    url = image.sizes.original.url;
  }

  // 如果没有找到对应尺寸的 URL，使用原始 URL
  if (!url) {
    url = image?.url;
  }

  // 使用 getImageUrl 处理最终的 URL
  const finalUrl = url ? getImageUrl(url) : null;

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
      src={error && !finalUrl ? "/imager-error.webp" : finalUrl!}
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
