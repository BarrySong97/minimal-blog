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
          className="group relative flex flex-col overflow-hidden rounded-xl border border-purple-200/20 bg-gradient-to-b from-white to-purple-50/30 shadow-sm transition-all duration-300 hover:shadow-purple-200/20 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm"
        >
          <div className="aspect-[16/9] overflow-hidden bg-gradient-to-br from-purple-900/5 to-purple-600/5">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={600}
              height={340}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/80 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center rounded-full bg-purple-50 px-2.5 py-0.5 text-xs font-medium text-purple-700 border border-purple-100">
                  {post.tags[0]}
                </span>
                <span className="text-sm text-purple-300">•</span>
                <span className="text-sm text-purple-600">
                  {post.readingTime}
                </span>
              </div>
              <h3 className="mt-3 text-xl font-semibold leading-6 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-gray-600 line-clamp-3 group-hover:text-gray-700">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
