import React, { FC } from "react";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import { projectService } from "@/service/projects";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import ProjectList from "@/components/projects/List";
import Loading from "./loading";
import ProjectsLoading from "./loading";
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
      <ProjectList />
      {/* <ProjectsLoading /> */}
    </HydrationBoundary>
  );
};

export default Projects;
