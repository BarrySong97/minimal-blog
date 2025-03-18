import { Blog } from "@/payload-types";
import { stringify } from "qs-esm";
import { endpoints } from "./config";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
import { Where } from "payload";
export type BlogsResponse = {
  docs: Blog[];
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

export type BlogFilters = {
  page?: number;
  limit?: number;
  status?: "draft" | "published";
};

export const blogService = {
  // 获取博客列表
  getBlogs: (filters?: BlogFilters) => {
    const query: Where = {
      status: {
        equals: "published",
      },
    };

    // 构建查询参数
    const queryParams: Record<string, any> = {
      where: query,
      sort: "-date",
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

    const stringifiedQuery = stringify(queryParams);

    return __request<BlogsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}?${stringifiedQuery}`,
    });
  },

  // 获取单个博客详情
  getBlog: (id: number) => {
    return __request(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}/${id}`,
    });
  },

  // 根据slug获取博客
  getBlogBySlug: (slug: string) => {
    return __request<{ docs: Blog[] }>(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}?where[slug][equals]=${slug}`,
    });
  },
};
