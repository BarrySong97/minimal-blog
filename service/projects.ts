import { Project } from "@/payload-types";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
import { endpoints } from "./config";
import { stringify } from "qs-esm";

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

export type ProjectFilters = {
  page?: number;
  limit?: number;
  status?: "working" | "running" | "archived";
};

export const projectService = {
  // 获取项目列表
  getProjects: (filters?: ProjectFilters) => {
    // 构建查询参数
    const queryParams: Record<string, any> = {
      sort: "order",
    };

    // 添加分页参数
    if (filters?.page) {
      queryParams.page = filters.page;
    }

    if (filters?.limit) {
      queryParams.limit = filters.limit;
    } else {
      // 设置默认每页数量
      queryParams.limit = 10;
    }

    // 添加状态过滤
    if (filters?.status) {
      queryParams.where = {
        status: {
          equals: filters.status,
        },
      };
    }

    const stringifiedQuery = stringify(queryParams);

    return __request<ProjectsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.projects}?${stringifiedQuery}`,
    });
  },

  // 获取单个项目详情
  getProject: (id: number) => {
    return __request(OpenAPI, {
      method: "GET",
      url: `${endpoints.projects}/${id}`,
    });
  },

  getHomeProjects: () => {
    return __request<ProjectsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.projects}?sort=order&limit=2`,
    });
  },
};
