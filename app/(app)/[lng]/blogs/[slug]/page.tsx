import BlogContent from "@/components/blogs/detail/Content";
import Header from "@/components/blogs/detail/Header";
import Toc from "@/components/blogs/detail/Toc";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import { prefetchQueries } from "@/components/tanstack/tanstack-server";
import { blogService } from "@/service/blogs";
import { queryKeys } from "@/service/config";
import { homeService } from "@/service/home";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
export interface Props {
  params: Promise<{
    slug: string;
    lng: string;
  }>;
}
const BlogDetail: FC<Props> = async ({ params }) => {
  const { slug, lng } = await params;
  const blog = await blogService.getBlogBySlug(slug);
  const blogDoc = blog?.docs?.[0];
  const headings = getHeadings(
    blogDoc?.content?.root?.children as unknown as HeadingNode[]
  );
  const state = await prefetchQueries([
    {
      queryKey: queryKeys.home,
      queryFn: () => homeService.getHome(),
    },
  ]);
  return (
    <HydrationBoundary state={state}>
      <div className="mx-auto ">
        <div className="flex gap-12 justify-center relative">
          <div>
            <Header blog={blogDoc} lng={lng} />
            <BlogContent
              blog={blogDoc}
              toc={
                new Map(
                  headings.map((heading) => [heading.anchor, heading])
                ) as any
              }
            />
          </div>

          <div className="hidden lg:block">
            <Toc headings={headings} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default BlogDetail;
