import { Experience } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";

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
    return queryFetcher<ExperiencesResponse>(
      `${endpoints.experiences}?sort=order`
    );
  },

  // 获取单个经历详情
  getExperience: (id: number) => {
    return queryFetcher<Experience>(`${endpoints.experiences}/${id}`);
  },
};
