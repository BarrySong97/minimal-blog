import { dehydrate, QueryClient, QueryFunction } from "@tanstack/react-query";
import { getQueryClient } from "./get-query-client";
type PrefetchQueryOptions = {
  queryKey: readonly unknown[];
  queryFn: QueryFunction;
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
