import { Experience } from "@/payload-types";
import { endpoints } from "./config";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
export type ExperiencesResponse = {
  docs: Experience[];
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

export const experienceService = {
  // 获取经历列表
  getExperiences: () => {
    return __request<ExperiencesResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.experiences}?sort=order`,
    });
  },

  // 获取单个经历详情
  getExperience: (id: number) => {
    return __request<Experience>(OpenAPI, {
      method: "GET",
      url: `${endpoints.experiences}/${id}`,
    });
  },
};
