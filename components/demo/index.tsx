"use client";
import React, { FC } from "react";
import BlurImage from "../common/BlurImage";
export interface TestImageProps {}
const TestImage: FC<TestImageProps> = () => {
  const image = (
    <BlurImage
      url="http://localhost:3000/api/media/file/z-fVW7RtKI9o5kb5Os3av.jpg"
      alt="Snowy mountain peaks"
      containerClass="w-full h-full"
    />
  );
  return <div>{image}</div>;
};

export default TestImage;
