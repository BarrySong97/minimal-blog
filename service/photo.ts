import { Photo } from "@/payload-types";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
import { endpoints } from "./config";

export type PhotosResponse = {
  docs: Photo[];
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

export interface GetPhotosParams {
  page?: number;
  limit?: number;
  sort?: string;
}

export const photoService = {
  // 获取项目列表
  getPhotos: () => {
    return __request<PhotosResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.photos}?sort=-date`,
    });
  },

  getPhotoById: (id: string) => {
    return __request<Photo>(OpenAPI, {
      method: "GET",
      url: `${endpoints.photos}/${id}`,
    });
  },
  // 分页获取照片
  getPhotosPaginated: ({
    page = 1,
    limit = 9,
    sort = "-date",
  }: GetPhotosParams = {}) => {
    return __request<PhotosResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.photos}?page=${page}&limit=${limit}&sort=${sort}`,
    });
  },
};
