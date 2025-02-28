import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";

interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: BlogPost[];
}

export function BlogList({ posts, className, ...props }: BlogListProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
        className
      )}
      {...props}
    >
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className="group relative flex flex-col overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md"
        >
          <div className="aspect-[16/9] overflow-hidden bg-gray-100">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={600}
              height={340}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">{post.tags[0]}</span>
                <span className="text-sm text-gray-400">•</span>
                <span className="text-sm text-gray-500">
                  {post.readingTime}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
