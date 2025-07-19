import { FriendLink } from "@/payload-types";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
import { endpoints } from "./config";
import { stringify } from "qs-esm";

export type FriendLinksResponse = {
  docs: FriendLink[];
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

export type FriendLinkFilters = {
  page?: number;
  limit?: number;
  status?: "active" | "inactive";
};

export const friendLinkService = {
  // 获取友链列表
  getFriendLinks: (filters?: FriendLinkFilters) => {
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
      queryParams.limit = 50;
    }

    // 添加状态过滤，默认只显示激活的友链
    if (filters?.status) {
      queryParams.where = {
        status: {
          equals: filters.status,
        },
      };
    } else {
      queryParams.where = {
        status: {
          equals: "active",
        },
      };
    }

    const stringifiedQuery = stringify(queryParams);

    return __request<FriendLinksResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.friendLinks}?${stringifiedQuery}`,
    });
  },

  // 获取单个友链详情
  getFriendLink: (id: number) => {
    return __request<FriendLink>(OpenAPI, {
      method: "GET",
      url: `${endpoints.friendLinks}/${id}`,
    });
  },

  // 获取所有激活的友链（用于友链页面）
  getActiveFriendLinks: () => {
    return __request<FriendLinksResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.friendLinks}?sort=order&where[status][equals]=active&limit=100`,
    });
  },
};