"use client";

import { Project } from "@/payload-types";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import React from "react";
import Link from "next/link";

export interface ProjectMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  project: Project;
  onGithubHover?: () => void;
  onGithubLeave?: () => void;
}

export const ProjectMeta: React.FC<ProjectMetaProps> = ({
  project,
  className,
  onGithubHover,
  onGithubLeave,
  ...props
}) => {
  // Status badge color mapping
  const statusColors = {
    working: "bg-amber-500",
    running: "bg-emerald-500",
    archived: "bg-slate-500",
  };

  // Get status color or default to slate if status is undefined
  const statusColor = project.status
    ? statusColors[project.status]
    : "bg-slate-500";

  // Handle GitHub badge click to prevent event propagation
  const handleGithubClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.github) {
      window.open(project.github, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col justify-end text-white",
        className
      )}
      {...props}
    >
      <div className="flex justify-between items-center">
        <div>
          {/* Project title */}

          <h3 className="text-xl font-bold mb-1 group-hover:underline underline-offset-2">
            {project.title}
          </h3>

          {/* Project description (truncated) */}
          {project.description && (
            <p className="text-sm text-white/80 line-clamp-2 ">
              {project.description}
            </p>
          )}
        </div>

        {/* Status and GitHub badges */}
        <div className="flex items-end justify-between gap-2 flex-col">
          {/* Status badge (right) */}
          <div>
            {project.status && (
              <span
                className={cn(
                  "px-2 py-1 text-xs font-medium rounded-full",
                  statusColor
                )}
              >
                {project.status.charAt(0).toUpperCase() +
                  project.status.slice(1)}
              </span>
            )}
          </div>
          {/* GitHub badge (left) */}
          <div>
            {project.github && (
              <span
                className="bg-black/50 px-2 py-1 text-xs font-medium rounded-full flex items-center gap-1 cursor-pointer hover:bg-black/80 transition-colors"
                onMouseEnter={onGithubHover}
                onMouseLeave={onGithubLeave}
                onClick={handleGithubClick}
              >
                <Icon icon="mdi:github" className="w-3 h-3" />
                Open Source
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
