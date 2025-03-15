import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import React, { FC } from "react";
import { prefetchQuery } from "@/components/tanstack/tanstack-server";
import { projectService } from "@/service/projects";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import ProjectList from "@/components/projects/List";
export interface ProjectsProps {}
const Projects: FC<ProjectsProps> = async () => {
  const state = await prefetchQuery({
    queryKey: queryKeys.projects.all,
    queryFn: projectService.getProjects,
  });
  return (
    <HydrationBoundary state={state}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <SectionHeader
            title={"项目"}
            className={cn(
              "pl-0",
              "motion-scale-in-[0.37] motion-opacity-in-[0%]"
            )}
          />
        </div>

        <ProjectList />
      </div>
    </HydrationBoundary>
  );
};

export default Projects;
