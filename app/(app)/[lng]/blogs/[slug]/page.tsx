import BlogContent from "@/components/blogs/detail/Content";
import Header from "@/components/blogs/detail/Header";
import Toc from "@/components/blogs/detail/Toc";
import MobileToc from "@/components/blogs/detail/MobileToc";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import { prefetchQueries } from "@/components/tanstack/tanstack-server";
import { blogService } from "@/service/blogs";
import { queryKeys } from "@/service/config";
import { homeService } from "@/service/home";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { cache, FC } from "react";
import { Media } from "@/payload-types";
import Cd from "@/components/common/cd";
const getBlog = async (slug: string) => {
  const blog = await blogService.getBlogBySlug(slug);
  return blog;
};
const getBlogCache = cache(getBlog);
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogCache(slug);
  const cover = blog?.docs?.[0]?.ogImage as Media;
  console.log(cover);
  return {
    title: blog?.docs?.[0]?.title,
    description: blog?.docs?.[0]?.excerpt,
    openGraph: {
      images: [
        {
          url: `${process.env.DOMAIN_URL}${cover?.sizes?.card?.url}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog?.docs?.[0]?.title} | Barry Song's Blog`,
      description: blog?.docs?.[0]?.excerpt,
      images: [cover?.url],
    },
  };
}
export interface Props {
  params: Promise<{
    slug: string;
    lng: string;
  }>;
}
const BlogDetail: FC<Props> = async ({ params }) => {
  const { slug, lng } = await params;
  const blog = await getBlogCache(slug);
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
            <hr className="my-12" />
            <Cd />
          </div>

          <div className="hidden lg:block">
            <Toc headings={headings} />
          </div>
          <div className="block lg:hidden absolute">
            <MobileToc headings={headings} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default BlogDetail;
