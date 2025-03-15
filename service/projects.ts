import { Project } from "@/payload-types";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
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
    return __request<ProjectsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.projects}?sort=order`,
    });
  },

  // 获取单个项目详情
  getProject: (id: number) => {
    return __request(OpenAPI, {
      method: "GET",
      url: `${endpoints.projects}/${id}`,
    });
  },
};
