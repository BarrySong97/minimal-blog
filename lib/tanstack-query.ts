import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// 创建一个新的QueryClient实例
export const getQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          // 在SSR时，我们通常希望设置一个默认的staleTime
          // 以避免在客户端立即重新获取
          staleTime: 60 * 1000,
          // 默认缓存时间10分钟
          gcTime: 1000 * 60 * 10,
        },
      },
    })
);

// 用于检查是否在服务器端
export const isServer = typeof window === "undefined";

// 创建通用的fetch wrapper
export async function queryFetcher<TData>(
  url: string,
  init?: RequestInit
): Promise<TData> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...init?.headers,
  };

  const res = await fetch(url, {
    ...init,
    headers,
  });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  return res.json();
}

// 创建通用的错误处理
export class QueryError extends Error {
  constructor(
    message: string,
    public statusCode: number,
    public errors?: Record<string, string[]>
  ) {
    super(message);
    this.name = "QueryError";
  }
}

// 创建通用的错误处理函数
export function handleQueryError(error: unknown): QueryError {
  if (error instanceof QueryError) {
    return error;
  }

  if (error instanceof Error) {
    return new QueryError(error.message, 500);
  }

  return new QueryError("An unknown error occurred", 500);
}
