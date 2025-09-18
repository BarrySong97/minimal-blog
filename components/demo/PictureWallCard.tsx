"use client";
import React from "react";
import Image from "next/image";
import {
  Cursor,
  CursorContainer,
  CursorFollow,
  CursorProvider,
} from "../ui/cursor";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service";
import { projectService } from "@/service/projects";
import { IcSharpArrowOutward } from "../home/icon";
import Link from "next/link";

interface PictureWallCardProps {
  className?: string;
}

const PictureWallCard: React.FC<PictureWallCardProps> = ({
  className = "",
}) => {
  // Sample image URLs - replace with actual images as needed
  const { data } = useQuery({
    queryKey: queryKeys.projects.latest,
    queryFn: projectService.getLatestProject,
  });
  const project = data?.docs[0];
  return (
    <div
      className={`bg-white rounded-md p-8 relative overflow-hidden  border border-gray-200 shadow-sm aspect-square ${className}`}
    >
      <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
        <div className="space-y-1">
          <div className=" font-bold">{project?.title}</div>
          <div className="text-xs text-gray-500">{project?.description}</div>
        </div>
        <Link
          href="/projects"
          className="flex items-center gap-1 hover:underline text-sm"
        >
          more
          <IcSharpArrowOutward className="w-4 h-4" />
        </Link>
      </div>
      <Image
        src={project?.home_cover?.url ?? ""}
        fill
        alt={project?.title ?? ""}
        className="object-cover"
      />
    </div>
  );
};

export default PictureWallCard;
