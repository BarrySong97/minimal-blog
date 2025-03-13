import BlogContent from "@/components/blogs/detail/Content";
import Toc from "@/components/blogs/detail/Toc";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import { blogService } from "@/service/blogs";
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
  return (
    <div className="mx-auto ">
      <div className="flex gap-12 justify-center relative">
        <BlogContent
          blog={blog?.docs?.[0]}
          toc={
            new Map(headings.map((heading) => [heading.anchor, heading])) as any
          }
        />
        <div className="">
          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
