import BlogContent from "@/components/blogs/detail/Content";
import { getHeadings, HeadingNode } from "@/lib/get-headings";
import { prefetchQuery } from "@/lib/tanstack-server";
import { blogService } from "@/service/blogs";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
export interface Props {
  params: Promise<{
    slug: string;
  }>;
}
const BlogDetail: FC<Props> = async ({ params }) => {
  const { slug } = await params;
  const blog = await blogService.getBlogBySlug(slug);
  const headings = getHeadings(
    blog?.docs?.[0]?.content?.root?.children as unknown as HeadingNode[]
  );
  console.log(headings);
  return (
    <div>
      <BlogContent blog={blog?.docs?.[0]} />
    </div>
  );
};

export default BlogDetail;
