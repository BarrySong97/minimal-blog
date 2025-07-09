import { Journal } from "@/payload-types";
import { stringify } from "qs-esm";
import { endpoints } from "./config";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
import { Where } from "payload";
export type JournalsResponse = {
  docs: Journal[];
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

export type JournalFilters = {
  page?: number;
  limit?: number;
};

export const journalService = {
  // 获取日志列表
  getJournals: (filters?: JournalFilters) => {
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

    return __request<JournalsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.journals}?${stringifiedQuery}`,
    });
  },

  // 根据slug获取日志
  getJournalBySlug: (slug: string) => {
    const queryParams: Record<string, any> = {
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2, // 需要深度查询来获取 prerequisites 关联数据
    };

    const stringifiedQuery = stringify(queryParams);

    return __request<{ docs: Journal[] }>(OpenAPI, {
      method: "GET",
      url: `${endpoints.journals}?${stringifiedQuery}`,
    });
  },
};
