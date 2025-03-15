"use client";

import { Media, Project } from "@/payload-types";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ProjectDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  isHovering?: boolean;
}

export const ProjectDisplay: React.FC<ProjectDisplayProps> = ({
  project,
  className,
  isHovering = false,
  ...props
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // 使用useEffect监听isHovering状态变化
  useEffect(() => {
    if (videoRef.current) {
      if (isHovering) {
        videoRef.current.play().catch((error) => {
          console.error("Error playing video:", error);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovering]);

  // Helper function to safely get media URL
  const getMediaUrl = (media: (number | null | Media) | undefined): string => {
    if (!media || typeof media === "number" || media === null) {
      return "";
    }
    return media.url || "";
  };

  // Helper function to safely get media dimensions
  const getMediaDimension = (
    media: (number | null | Media) | undefined,
    dimension: "width" | "height"
  ): number => {
    if (!media || typeof media === "number" || media === null) {
      return 0;
    }
    return media[dimension] || 0;
  };

  const videoUrl = getMediaUrl(project.video);
  const coverUrl = getMediaUrl(project.cover);
  const coverWidth = getMediaDimension(project.cover, "width");
  const coverHeight = getMediaDimension(project.cover, "height");

  return (
    <div
      className={cn("aspect-[4/3] overflow-hidden bg-muted", className)}
      {...props}
    >
      {project.video &&
      typeof project.video !== "number" &&
      project.video !== null ? (
        <video
          ref={videoRef}
          src={videoUrl}
          muted
          loop
          playsInline
          className="object-cover w-full h-full "
        />
      ) : (
        <Image
          src={coverUrl}
          alt={project.title}
          width={coverWidth || 800}
          height={coverHeight || 600}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
};
