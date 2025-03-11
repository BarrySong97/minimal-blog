import { dehydrate, QueryClient, QueryFunction } from "@tanstack/react-query";

type PrefetchQueryOptions = {
  queryKey: readonly unknown[];
  queryFn: QueryFunction;
  staleTime?: number;
};

// 用于在服务端预取数据
export async function prefetchQuery({
  queryKey,
  queryFn,
  staleTime = 60 * 1000, // 默认1分钟
}: PrefetchQueryOptions) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
    staleTime,
  });

  return dehydrate(queryClient);
}

// 创建一个工具函数来包装多个预取
export async function prefetchQueries(queries: PrefetchQueryOptions[]) {
  const queryClient = new QueryClient();

  await Promise.all(
    queries.map(({ queryKey, queryFn, staleTime = 60 * 60 * 1000 }) =>
      queryClient.prefetchQuery({
        queryKey,
        queryFn,
        staleTime,
      })
    )
  );

  return dehydrate(queryClient);
}
