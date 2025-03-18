import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import Link from "next/link";
import React, { FC } from "react";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import { projectService } from "@/service/projects";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import ProjectList from "@/components/projects/List";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
export interface ProjectsProps {}
const Projects: FC<ProjectsProps> = async () => {
  // 预获取无限滚动的第一页数据
  const state = await prefetchInfiniteQuery({
    queryKey: queryKeys.projects.infinite,
    queryFn: ({ pageParam = 1 }) =>
      projectService.getProjects({ page: pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={state}>
      <DefaultLayout isScroll={false}>
        <div className="space-y-8">
          <div className="flex items-center justify-between container mx-auto px-6 2xl:px-0 ">
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
      </DefaultLayout>
    </HydrationBoundary>
  );
};

export default Projects;
