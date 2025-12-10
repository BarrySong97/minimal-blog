import { BlogList } from "@/components/blogs/BlogList";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import { blogService } from "@/service/blogs";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { LayoutToggle } from "@/components/blogs/LayoutToggle";
import { TagList } from "@/components/blogs/TagList";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Barry Song's blog, share his thoughts and experiences.",
};

export default async function Blogs({
  params,
  searchParams,
}: {
  params: Promise<{ lng: string }>;
  searchParams?: Promise<{
    tags?: string;
  }>;
}) {
  const { lng } = await params;
  const { tags } = (await searchParams) || {};
  const tagsArray = tags ? [tags] : [];
  // 预获取无限滚动的第一页数据
  const state = await prefetchInfiniteQuery({
    queryKey: [...queryKeys.blogs.infinite, { tags: tagsArray }],
    queryFn: ({ pageParam = 1 }) =>
      blogService.getBlogs({ page: pageParam, tags: tagsArray }),
    initialPageParam: 1,
  });
  const allTags = await blogService.getBlogTags();

  const bannerBlog = await blogService.getBannerBlog();
  const bannerBlogList = bannerBlog.banners;
  return (
    <HydrationBoundary state={state}>
      <div className="container mx-auto space-y-6 px-6 2xl:px-0 2xl:max-w-5xl">
        <div className="flex items-center justify-between">
          <SectionHeader
            title={"文章"}
            className={cn(
              "pl-0",
              "motion-scale-in-[0.37] motion-opacity-in-[0%]"
            )}
          />
        </div>
        <TagList tags={allTags} />
        <BlogList bannerBlogs={bannerBlogList} />
      </div>
    </HydrationBoundary>
  );
}
