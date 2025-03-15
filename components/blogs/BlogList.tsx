"use client";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { blogService } from "@/service/blogs";
import { BlogItem } from "./BlogItem";

interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BlogList({ className, ...props }: BlogListProps) {
  const { data: posts } = useQuery({
    queryKey: queryKeys.blogs.all,
    queryFn: () => blogService.getBlogs(),
  });
  const ref = useRef<HTMLDivElement>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-8",
        "motion-translate-x-in-[0%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-ease-spring-smooth",
        className
      )}
      ref={ref}
      {...props}
    >
      {posts?.docs.map((post) => (
        <BlogItem
          key={post.id}
          post={post}
          isHovered={hoverId === post.id}
          onMouseEnter={() => setHoverId(post.id)}
          onMouseLeave={() => setHoverId(null)}
        />
      ))}
    </div>
  );
}
