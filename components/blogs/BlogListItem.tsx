import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import type { BlogPost } from "./BlogCard";

interface BlogListItemProps {
  post: BlogPost;
  className?: string;
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export function BlogListItem({ post, className }: BlogListItemProps) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative overflow-hidden rounded-xl bg-background border transition-all hover:bg-accent/5",
        className
      )}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="flex flex-col-reverse md:flex-row items-start">
          {/* Left side - Content */}
          <div className="flex-1 p-6">
            <h2 className="text-2xl font-semibold tracking-tight">
              {post.title}
            </h2>
          </div>

          {/* Right side - Image */}
          <div className="relative w-full md:w-[45%] aspect-[4/3] overflow-hidden">
            {post.coverImage ? (
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="h-full w-full bg-muted" />
            )}
            <div className="absolute top-4 right-4 flex items-center gap-2 text-sm">
              <time
                dateTime={post.date}
                className="text-background bg-foreground/80 px-3 py-1 rounded-full"
              >
                {post.date}
              </time>
              <span className="text-background bg-foreground/80 px-3 py-1 rounded-full">
                {post.readingTime}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
