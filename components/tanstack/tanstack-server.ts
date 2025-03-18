import { dehydrate, QueryClient, QueryFunction } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";
type PrefetchQueryOptions = {
  queryKey: readonly unknown[];
  queryFn: QueryFunction;
  staleTime?: number;
};

// 用于无限查询的类型
type PrefetchInfiniteQueryOptions = {
  queryKey: readonly unknown[];
  queryFn: (context: { pageParam: any }) => Promise<any>;
  initialPageParam: any;
  staleTime?: number;
};

export const DEFAULT_STALE_TIME = 60 * 1000;

// 用于在服务端预取数据
export async function prefetchQuery({
  queryKey,
  queryFn,
  staleTime = DEFAULT_STALE_TIME, // 默认1分钟
}: PrefetchQueryOptions) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime,
  });

  return dehydrate(queryClient);
}

// 用于在服务端预取无限查询数据
export async function prefetchInfiniteQuery({
  queryKey,
  queryFn,
  initialPageParam,
  staleTime = DEFAULT_STALE_TIME, // 默认1分钟
}: PrefetchInfiniteQueryOptions) {
  const queryClient = getQueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey,
    queryFn,
    initialPageParam,
    staleTime,
  });

  return dehydrate(queryClient);
}

// 创建一个工具函数来包装多个预取
export async function prefetchQueries(queries: PrefetchQueryOptions[]) {
  const queryClient = getQueryClient();
  await Promise.all(
    queries.map(({ queryKey, queryFn, staleTime = DEFAULT_STALE_TIME }) =>
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime,
      })
    )
  );

  return dehydrate(queryClient);
}
