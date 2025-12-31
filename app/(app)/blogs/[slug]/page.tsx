import BlogContent from "@/components/blogs/detail/Content";
import Header from "@/components/blogs/detail/Header";
import Image from "next/image";
import "@/styles/shiki.css";
import "react-photo-view/dist/react-photo-view.css";
import MobileToc from "@/components/blogs/detail/MobileToc";
import { PrerequisiteBlogs } from "@/components/blogs/BlogRelationship";
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
import { notFound } from "next/navigation";
import Toc from "@/components/blogs/detail/Toc";
const getBlog = async (slug: string) => {
  const blog = await blogService.getBlogBySlug(slug);
  return blog;
};
const getBlogCache = cache(getBlog);
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const blog = await getBlogCache(slug);
  if (!blog) {
    notFound();
  }
  const cover = (blog?.docs?.[0]?.ogImage as Media).url;
  return {
    title: blog?.docs?.[0]?.title,
    description: blog?.docs?.[0]?.excerpt,
    openGraph: {
      images: [
        {
          url: `${process.env.DOMAIN_URL}${cover}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog?.docs?.[0]?.title} | Barry Song's Blog`,
      description: blog?.docs?.[0]?.excerpt,
      images: [`${process.env.DOMAIN_URL}${cover}`],
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
  const { slug } = await params;
  const blog = await getBlogCache(slug);
  const blogDoc = blog?.docs?.[0];
  if (!blogDoc) {
    notFound();
  }
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
            <Header blog={blogDoc} />
            <PrerequisiteBlogs prerequisites={blogDoc?.prerequisites || []} />

            <div
              id="blog-content"
              className=" md:max-w-md lg:max-w-2xl 2xl:max-w-4xl !text-primary  "
            >
              <div className="prose prose-md max-w-none leading-normal relative">
                <BlogContent
                  blog={blogDoc}
                  toc={
                    new Map(
                      headings.map((heading) => [heading.anchor, heading])
                    ) as any
                  }
                />
              </div>
            </div>

            <hr className="my-12" />
            <div className="flex flex-col justify-center items-center">
              <Image
                src={"/weixin.jpg"}
                alt={"微信公众号"}
                width={200}
                height={200}
              />
              <div>关注我的微信公众号Barry的代码日志</div>
            </div>

            <hr className="my-12" />
            <Cd />
          </div>

          <Toc headings={headings} className="hidden lg:block  " />
          <div className="block lg:hidden absolute">
            <MobileToc headings={headings} />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default BlogDetail;
