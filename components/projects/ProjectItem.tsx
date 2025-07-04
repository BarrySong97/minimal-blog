"use client";
import { Project } from "@/payload-types";
import Link from "next/link";
import React, { FC, useState } from "react";
import { cn } from "@/lib/utils";
import { ProjectMeta } from "./ProjectMeta";
import { ProjectDisplay } from "./ProjectDisplay";

export interface ProjectItemProps
  extends React.ComponentPropsWithoutRef<typeof Link> {
  project: Project;
  onGithubHover?: () => void;
  onGithubLeave?: () => void;
}

const ProjectItem: FC<ProjectItemProps> = ({
  project,
  className,
  href,
  onMouseEnter,
  onMouseLeave,
  onGithubHover,
  onGithubLeave,
  ...props
}) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovering(true);
    onMouseEnter?.(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsHovering(false);
    onMouseLeave?.(e);
  };

  return (
    <Link
      href={project.href}
      className={cn(
        "group relative block overflow-hidden  transition-all duration-300 hover:shadow-lg",
        className
      )}
      target="_blank"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <div className="relative">
        {/* Project display (video or image) */}
        <ProjectDisplay project={project} isHovering={isHovering} />

        {/* Project metadata overlay */}
        <ProjectMeta
          project={project}
          onGithubHover={onGithubHover}
          onGithubLeave={onGithubLeave}
        />
      </div>
    </Link>
  );
};

export default ProjectItem;
