import { Blog } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
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
    return __request(OpenAPI, {
      method: "GET",
      url: endpoints.blogs,
      query: {
        ...filters,
      },
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
    return __request(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}?where[slug][equals]=${slug}`,
    });
  },
};
