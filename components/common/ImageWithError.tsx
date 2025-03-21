"use client";
import Image from "next/image";
import { ImageProps } from "next/image";
import { useState } from "react";

export const ImageWithError = ({ src, alt, ...props }: ImageProps) => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <Image
      src={error ? "/imager-error.webp" : src}
      alt={alt}
      onError={handleError}
      {...props}
    />
  );
};
