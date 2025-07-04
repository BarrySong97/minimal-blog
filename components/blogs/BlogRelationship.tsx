import LinkWithLoc from "@/components/common/LinkWithLoc";
import type { Blog, Media } from "@/payload-types";
import Image from "next/image";

interface BlogRelationshipProps {
  blog: Partial<Blog>;
}

export function BlogRelationship({ blog }: BlogRelationshipProps) {
  if (!blog.slug || !blog.title) {
    return null;
  }

  const coverImage = blog.coverImage as Media | undefined;

  return (
    <div className="my-6 not-prose flex justify-center">
      <LinkWithLoc
        href={`/blogs/${blog.slug}`}
        className="block lg:max-w-sm  w-full border  overflow-hidden hover:shadow-lg transition-shadow duration-300 group"
      >
        <div className="flex flex-col md:flex-row">
          {/* Cover Image */}
          {coverImage?.url && (
            <div className="w-1/2 relative ">
              <Image
                src={coverImage.url}
                alt={coverImage.alt || blog.title}
                fill
                className="object-cover  transition-transform duration-300"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 p-4 flex flex-col justify-center">
            <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors !no-underline">
              {blog.title}
            </h4>
            {blog.excerpt && (
              <p
                style={{
                  textDecoration: "none",
                }}
                className="text-muted-foreground text-sm line-clamp-2 !no-underline"
              >
                {blog.excerpt}
              </p>
            )}
          </div>
        </div>
      </LinkWithLoc>
    </div>
  );
}

interface PrerequisiteBlogsProps {
  prerequisites: ((number | Blog) | null)[] | null;
}

export function PrerequisiteBlogs({ prerequisites }: PrerequisiteBlogsProps) {
  if (!prerequisites || prerequisites.length === 0) {
    return null;
  }

  // 过滤和转换 prerequisites，确保只处理有效的 Blog 对象
  const validPrerequisites = prerequisites.filter(
    (item): item is Blog =>
      item !== null &&
      typeof item === "object" &&
      "slug" in item &&
      "title" in item
  );

  if (validPrerequisites.length === 0) {
    return null;
  }

  return (
    <div className="my-8 p-6 bg-muted/50 border">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">前情提要</h3>
        <p className="text-sm text-muted-foreground">
          在阅读本文章之前，你可能需要阅读以上文章：
        </p>
      </div>
      <div className="space-y-3">
        {validPrerequisites.map((blog, index) => (
          <div key={blog.id || index} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
            <LinkWithLoc
              href={`/blogs/${blog.slug}`}
              className="text-sm font-medium text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              {blog.title}
            </LinkWithLoc>
          </div>
        ))}
      </div>
    </div>
  );
}
