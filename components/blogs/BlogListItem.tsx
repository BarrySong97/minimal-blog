import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogPost } from "./BlogCard";

interface BlogListItemProps {
  post: BlogPost;
  className?: string;
}

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export function BlogListItem({ post, className }: BlogListItemProps) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "group relative py-3 transition-colors hover:bg-muted/50 rounded-md",
        className
      )}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="flex items-center gap-2 px-4 ">
          <h2 className="text-lg font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
            {post.title}
          </h2>
          <time className="text-sm text-muted-foreground" dateTime={post.date}>
            {post.date}
          </time>
        </div>
      </Link>
    </motion.div>
  );
}
