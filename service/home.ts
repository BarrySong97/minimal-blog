import { Home } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";
import { experienceService } from "./experiences";
import { skillService } from ".";
export const homeService = {
  // 获取首页数据
  getHome: async () => {
    return await queryFetcher<Home>(endpoints.home);
  },
};
