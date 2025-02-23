import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { BlogPost } from "./BlogCard";

interface BlogListItemProps {
  post: BlogPost;
  className?: string;
}

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function BlogListItem({ post, className }: BlogListItemProps) {
  return (
    <motion.div
      variants={item}
      className={cn(
        "group cursor-pointer border-b border-border py-4 transition-colors hover:bg-muted/50",
        className
      )}
    >
      <Link href={`/blogs/${post.slug}`} className="block">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.tags[0]}</span>
            </div>
            <h2 className="text-lg font-medium tracking-tight group-hover:text-primary">
              {post.title}
            </h2>
          </div>
          <div className="text-sm text-muted-foreground">
            {post.readingTime}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
