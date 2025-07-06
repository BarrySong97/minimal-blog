import { Blog, BlogPage } from "@/payload-types";
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
  tags?: string[];
};

export const blogService = {
  // 获取博客列表
  getBlogs: (filters?: BlogFilters) => {
    const query: Where = {
      status: {
        equals: "published",
      },
    };

    if (filters?.tags && filters.tags.length > 0) {
      query["tags.tag"] = {
        in: filters.tags.join(","),
      };
    }

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

  getBlogCount: () => {
    return __request(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}/count`,
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
    const queryParams: Record<string, any> = {
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2, // 需要深度查询来获取 prerequisites 关联数据
    };

    const stringifiedQuery = stringify(queryParams);

    return __request<{ docs: Blog[] }>(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}?${stringifiedQuery}`,
    });
  },

  getBannerBlog: async () => {
    const queryParams: Record<string, any> = {
      depth: 2, // 需要深度查询来获取 prerequisites 关联数据
    };
    const stringifiedQuery = stringify(queryParams);
    return __request<{ banners: Blog[] }>(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogPage}?${stringifiedQuery}`,
    });
  },

  getBlogTags: async (): Promise<string[]> => {
    const query: Where = {
      status: {
        equals: "published",
      },
    };

    const queryParams: Record<string, any> = {
      where: query,
      limit: 0, // Assume there are fewer than 1000 blog posts
      depth: 0, // We don't need to populate any relationships
      select: {
        tags: true,
      }, // We only need the tags field
    };

    const stringifiedQuery = stringify(queryParams);

    const response = await __request<BlogsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.blogs}?${stringifiedQuery}`,
    });

    const allTags =
      response.docs?.flatMap((doc) => doc.tags?.map((t) => t.tag) || []) || [];
    const uniqueTags = [...new Set(allTags.filter(Boolean))] as string[];

    return uniqueTags;
  },
};
