import { Skill, SkillCategory } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";

export type SkillsResponse = {
  docs: Skill[];
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

export type SkillCategoriesResponse = {
  docs: SkillCategory[];
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

export const skillService = {
  // 获取技能列表
  getSkills: () => {
    return queryFetcher<SkillsResponse>(
      `${endpoints.skills}?sort=order&depth=1`
    );
  },

  // 获取单个技能详情
  getSkill: (id: number) => {
    return queryFetcher<Skill>(`${endpoints.skills}/${id}?depth=1`);
  },

  // 获取技能分类列表
  getSkillCategories: () => {
    return queryFetcher<SkillCategoriesResponse>(
      `${endpoints.skillCategories}?sort=order&depth=1`
    );
  },

  // 获取单个技能分类详情
  getSkillCategory: (id: number) => {
    return queryFetcher<SkillCategory>(`${endpoints.skillCategories}/${id}`);
  },
};
