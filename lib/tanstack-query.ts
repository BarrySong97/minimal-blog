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
