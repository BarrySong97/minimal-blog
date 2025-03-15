"use client";
import { Media } from "@/payload-types";
import React, { FC, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { projectService } from "@/service/projects";
import { queryKeys } from "@/service/config";
import ProjectItem from "./ProjectItem";
import { cn } from "@/lib/utils";
import { ViewHover } from "../common/ViewHover";

export interface ProjectListProps {}

const ProjectList: FC<ProjectListProps> = () => {
  const { data: projects } = useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: () => projectService.getProjects(),
  });
  const ref = useRef<HTMLDivElement>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [hoverType, setHoverType] = useState<"default" | "github">("default");

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 gap-4",
        "motion-translate-x-in-[0%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-ease-spring-smooth"
      )}
      ref={ref}
    >
      {projects?.docs.map((project) => (
        <div key={project.id} className="group relative">
          <ProjectItem
            key={project.title}
            project={project}
            href={project.href}
            onMouseEnter={() => {
              setHoverId(project.id);
              setHoverType("default");
            }}
            onMouseLeave={() => {
              setHoverId(null);
            }}
            onGithubHover={() => {
              setHoverId(project.id);
              setHoverType("github");
            }}
            onGithubLeave={() => {
              setHoverType("default");
            }}
          />
          <ViewHover
            isHover={hoverId === project.id}
            trackMouse
            text={hoverType === "github" ? "Go to GitHub" : "Read More"}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
