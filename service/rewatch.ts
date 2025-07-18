import { Rewatch } from "@/payload-types";
import { endpoints } from "./config";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";

export type RewatchResponse = {
  docs: Rewatch[];
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

export type RewatchFilters = {
  page?: number;
  limit?: number;
  type?: "book" | "movie" | "tv";
};

export const rewatchService = {
  getAllRewatch: (filters?: RewatchFilters) => {
    const params = new URLSearchParams();
    if (filters?.page) params.append("page", filters.page.toString());
    if (filters?.limit) params.append("limit", filters.limit.toString());
    if (filters?.type) params.append("where[type][equals]", filters.type);

    const queryString = params.toString();
    const url = queryString ? `${endpoints.rewatch}?${queryString}` : endpoints.rewatch;

    return __request<RewatchResponse>(OpenAPI, {
      method: "GET",
      url,
    });
  },
};