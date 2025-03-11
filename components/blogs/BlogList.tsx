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
      className={cn("grid grid-cols-1 xl:grid-cols-2 gap-8", className)}
      {...props}
    >
      {posts.map((post) => (
        <Link
          key={post.slug + post.id}
          href={`/blog/${post.slug}`}
          className="group relative flex  h-[400px] flex-row overflow-hidden  border   shadow-sm transition-all duration-300 hover:shadow-purple-200/20 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm"
        >
          <div className="aspect-[16/9] md:aspect-[4/3] w-1/2 overflow-hidden ">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={800}
              height={800}
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between p-6 md:p-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex-1 relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center rounded-full  px-3 py-1 text-xs font-medium  border border-purple-100">
                  {post.tags[0]}
                </span>
                <span className="text-sm ">•</span>
                <span className="text-sm ">{post.readingTime}</span>
              </div>
              <h3 className="text-2xl font-semibold leading-tight text-gray-900  transition-colors duration-300 mb-4">
                {post.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-600 line-clamp-2 group-hover:text-gray-700">
                {post.excerpt}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
