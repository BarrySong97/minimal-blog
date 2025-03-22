"use client";

import { Media, Project } from "@/payload-types";
import React, { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "../common/ImageWithFallback";
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
  const [isIOS, setIsIOS] = useState(false);

  // 检测是否为iOS设备
  useEffect(() => {
    // 检测iOS设备（iPhone、iPad、iPod）
    const detectIOS = () => {
      const userAgent = window.navigator.userAgent.toLowerCase();
      return (
        /iphone|ipad|ipod/.test(userAgent) ||
        (userAgent.includes("mac") && "ontouchend" in document)
      );
    };

    setIsIOS(detectIOS());
  }, []);

  // 使用useEffect监听isHovering状态变化
  useEffect(() => {
    // 如果是iOS设备，不处理视频
    if (isIOS) return;

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
          try {
            // For Safari, we need to handle the promise differently
            const playPromise = videoRef.current.play();

            // Modern browsers return a promise from play()
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Error playing video:", error);
              });
            }
          } catch (error) {
            console.error("Exception while playing video:", error);
          }
        }
      }, 200); // Increased timeout to give more time for Safari
    } else {
      try {
        videoRef.current.pause();
      } catch (error) {
        console.error("Error pausing video:", error);
      }
    }

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [isHovering, isVideoReady, isIOS]);

  // Handle video load event
  const handleVideoLoaded = () => {
    setIsVideoReady(true);
  };

  // Helper function to safely get media URL
  const getMediaUrl = (
    media: (number | null | Media) | undefined
  ): Media | null => {
    if (!media || typeof media === "number" || media === null) {
      return null;
    }
    return media as Media;
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

  const videoUrl = project.video as Media;
  const cover = getMediaUrl(project.cover);
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
      {!isIOS &&
      project.video &&
      typeof project.video !== "number" &&
      project.video !== null ? (
        <video
          ref={videoRef}
          src={videoUrl.url!}
          muted
          loop
          playsInline
          className="object-cover w-full h-full"
          onLoadedData={handleVideoLoaded}
          preload="auto" // Changed from "metadata" to "auto" for better Safari support
          controlsList="nodownload nofullscreen noremoteplayback"
        />
      ) : (
        <ImageWithFallback
          image={cover as Media}
          alt={project.title}
          width={coverWidth || 800}
          height={coverHeight || 600}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
        />
      )}
    </div>
  );
};
