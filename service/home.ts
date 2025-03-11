import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
import { endpoints } from "./config";
import { Home } from "@/payload-types";
export const homeService = {
  // 获取首页数据
  getHome: async () => {
    return __request<Home>(OpenAPI, {
      method: "GET",
      url: endpoints.home,
    });
  },
};
