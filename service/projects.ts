import { Project } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";

export type ProjectsResponse = {
  docs: Project[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
};

export const projectService = {
  // 获取项目列表
  getProjects: () => {
    return queryFetcher<ProjectsResponse>(`${endpoints.projects}?sort=order`);
  },

  // 获取单个项目详情
  getProject: (id: number) => {
    return queryFetcher<Project>(`${endpoints.projects}/${id}`);
  },
};
