import { BlogList } from "@/components/blogs/BlogList";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import { blogService } from "@/service/blogs";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import Loading from "./loading";
export default async function Blogs() {
  // 预获取无限滚动的第一页数据
  const state = await prefetchInfiniteQuery({
    queryKey: queryKeys.blogs.infinite,
    queryFn: ({ pageParam = 1 }) => blogService.getBlogs({ page: pageParam }),
    initialPageParam: 1,
  });
  return (
    <HydrationBoundary state={state}>
      <BlogList />
    </HydrationBoundary>
  );
}
