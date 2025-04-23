import { Book } from "@/payload-types";
import { endpoints } from "./config";
import { request as __request } from "@/lib/request/core/request";
import { OpenAPI } from "@/lib/request/core/OpenAPI";
export type BooksResponse = {
  docs: Book[];
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

export type BlogFilters = {
  page?: number;
  limit?: number;
  status?: "draft" | "published";
};

export const bookService = {
  getAllBooks: () => {
    return __request<BooksResponse>(OpenAPI, {
      method: "GET",
      url: `${endpoints.books}`,
    });
  },
};
