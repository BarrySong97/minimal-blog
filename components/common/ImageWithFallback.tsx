"use client";
import { blurHashToDataURL } from "@/lib/blurHashToDataURL";
import { Media } from "@/payload-types";
import Image from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

export const ImageWithFallback = ({
  alt,
  ...props
}: Omit<ImageProps, "src"> & { image: Media }) => {
  const [error, setError] = useState(false);
  const { image } = props;
  const url = image?.url;
  const blurhash = image?.blurhash;
  const blurImage = blurhash ? blurHashToDataURL(blurhash) : null;

  const handleError = () => {
    setError(true);
  };

  return (
    <Image
      src={error && !url ? "/imager-error.webp" : url!}
      alt={alt}
      onError={handleError}
      placeholder={blurImage ? "blur" : "empty"}
      blurDataURL={blurImage ?? ""}
      {...props}
    />
  );
};
