import { BlogList } from "@/components/blogs/BlogList";
import { SectionHeader } from "@/components/ui/section-header";
import { useTranslation } from "@/app/(app)/i18n";
import { cn } from "@/lib/utils";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import { blogService } from "@/service/blogs";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";

export default async function Blogs({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng);

  // 预获取无限滚动的第一页数据
  const state = await prefetchInfiniteQuery({
    queryKey: queryKeys.blogs.infinite,
    queryFn: ({ pageParam = 1 }) => blogService.getBlogs({ page: pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={state}>
      <DefaultLayout isScroll={false}>
        <div className="space-y-8">
          <div className="flex items-center justify-between container mx-auto px-6  2xl:px-0 ">
            <SectionHeader
              title={t("common.nav.blog")}
              className={cn(
                "pl-0",
                "motion-scale-in-[0.37] motion-opacity-in-[0%]"
              )}
            />
          </div>
          <BlogList />
        </div>
      </DefaultLayout>
    </HydrationBoundary>
  );
}
