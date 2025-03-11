import { Skill, SkillCategory } from "@/payload-types";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
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
    return __request<SkillsResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.skills}?sort=order&depth=1`,
    });
  },

  // 获取单个技能详情
  getSkill: (id: number) => {
    return __request<Skill>(OpenAPI, {
      method: "GET",
      url: `${endpoints.skills}/${id}?depth=1`,
    });
  },

  // 获取技能分类列表
  getSkillCategories: () => {
    return __request<SkillCategoriesResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.skillCategories}?sort=order&depth=1`,
    });
  },

  // 获取单个技能分类详情
  getSkillCategory: (id: number) => {
    return __request<SkillCategory>(OpenAPI, {
      method: "GET",
      url: `${endpoints.skillCategories}/${id}`,
    });
  },
};
