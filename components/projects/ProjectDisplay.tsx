"use client";

import { Media, Project } from "@/payload-types";
import React, { useRef, useEffect, useState } from "react";
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
  const [isVideoReady, setIsVideoReady] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 使用useEffect监听isHovering状态变化
  useEffect(() => {
    // Clear any existing timeout to prevent race conditions
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (!videoRef.current || !isVideoReady) return;

    if (isHovering) {
      // Add a small delay before playing to avoid rapid play/pause cycles
      timeoutRef.current = setTimeout(() => {
        if (videoRef.current && isHovering) {
          videoRef.current.play().catch((error) => {
            console.error("Error playing video:", error);
          });
        }
      }, 50);
    } else {
      videoRef.current.pause();
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isHovering, isVideoReady]);

  // Handle video load event
  const handleVideoLoaded = () => {
    setIsVideoReady(true);
  };

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
      className={cn(
        "aspect-[4/3] overflow-hidden bg-muted rounded-lg",
        className
      )}
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
          className="object-cover w-full h-full"
          onLoadedData={handleVideoLoaded}
          preload="metadata"
        />
      ) : (
        <Image
          src={coverUrl || "/placeholder-project.jpg"}
          alt={project.title}
          width={coverWidth || 800}
          height={coverHeight || 600}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
};
