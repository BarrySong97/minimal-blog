import { Blog } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";

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
    const searchParams = new URLSearchParams();
    if (filters?.page) searchParams.set("page", filters.page.toString());
    if (filters?.limit) searchParams.set("limit", filters.limit.toString());
    if (filters?.status) searchParams.set("status", filters.status);

    const url = `${endpoints.blogs}${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
    return queryFetcher<BlogsResponse>(url);
  },

  // 获取单个博客详情
  getBlog: (id: number) => {
    return queryFetcher<Blog>(`${endpoints.blogs}/${id}`);
  },

  // 根据slug获取博客
  getBlogBySlug: (slug: string) => {
    return queryFetcher<Blog>(`${endpoints.blogs}?where[slug][equals]=${slug}`);
  },
};
