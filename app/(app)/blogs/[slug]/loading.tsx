"use client";
import BlogContent from "@/components/blogs/detail/Content";
import Header from "@/components/blogs/detail/Header";
import Toc from "@/components/blogs/detail/Toc";
import MobileToc from "@/components/blogs/detail/MobileToc";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import { queryKeys } from "@/service/config";
import { InfiniteData } from "@tanstack/react-query";
import React from "react";
import { useParams } from "next/navigation";
import { getQueryClient } from "@/components/tanstack/get-query-client";
import { BlogsResponse } from "@/service";
import BlogLoading from "@/components/blogs/detail/loading";
const BlogDetail = () => {
  const params = useParams();
  const slug = params.slug as string;
  const lng = params.lng as string;
  const queryClient = getQueryClient();
  const blogData = queryClient.getQueryData<InfiniteData<BlogsResponse>>(
    queryKeys.blogs.infinite
  );
  const blog = blogData?.pages
    .flatMap((page) => page.docs)
    ?.find((blog) => blog.slug === slug);

  if (!blog) {
    return <BlogLoading />;
  }
  const headings = getHeadings(
    blog?.content?.root?.children as unknown as HeadingNode[]
  );
  return (
    <div className="mx-auto ">
      <div className="flex gap-12 justify-center relative">
        <div>
          <Header blog={blog!} />
          <BlogContent
            blog={blog}
            toc={
              new Map(
                headings.map((heading) => [heading.anchor, heading])
              ) as any
            }
          />
        </div>

        <div className="hidden lg:block w-[181px]">
          {/* <Toc headings={headings} /> */}
        </div>
        <div className="block lg:hidden absolute">
          <MobileToc headings={headings} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
