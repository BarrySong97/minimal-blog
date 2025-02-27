import { Home } from "@/payload-types";
import { queryFetcher } from "@/lib/tanstack-query";
import { endpoints } from "./config";
import { experienceService } from "./experiences";
import { skillService } from ".";
export const homeService = {
  // 获取首页数据
  getHome: async () => {
    const skills = await skillService.getSkills();
    const experiences = await experienceService.getExperiences();
    const skillCategories = await skillService.getSkillCategories();
    const home = await queryFetcher<Home>(endpoints.home);
    return {
      home,
      skills: skills.docs,
      experiences: experiences.docs,
      skillCategories: skillCategories.docs,
    };
  },
};
