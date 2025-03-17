"use client";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { blogService } from "@/service/blogs";
import { BlogItem } from "./BlogItem";
import { VList } from "virtua";
import { useResponsive } from "ahooks";
import { Icon } from "@iconify/react";
import { Blog } from "@/payload-types";

interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BlogList({ className, ...props }: BlogListProps) {
  const { data: posts, isLoading } = useQuery({
    queryKey: queryKeys.blogs.all,
    queryFn: () => blogService.getBlogs(),
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(2);

  // 根据屏幕宽度确定列数
  useEffect(() => {
    if (responsive?.sm && !responsive?.md) {
      setColumnCount(1);
    } else if (responsive?.md && !responsive?.lg) {
      setColumnCount(1);
    } else if (responsive?.lg && !responsive?.xl) {
      setColumnCount(2);
    } else if (responsive?.xl) {
      setColumnCount(2);
    } else {
      // 默认情况（小屏幕）
      setColumnCount(1);
    }
  }, [responsive?.sm, responsive?.md, responsive?.lg, responsive?.xl]);

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="w-12 h-12 text-primary animate-spin"
        />
        <p className="mt-4 text-gray-500">加载博客中...</p>
      </div>
    );
  }

  // 空状态
  if (!posts?.docs.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon
          icon="mdi:file-document-outline"
          className="w-16 h-16 text-gray-400"
        />
        <p className="mt-4 text-gray-500">暂无博客</p>
      </div>
    );
  }

  // 将博客数据分组为行
  const rows: Blog[][] = [];
  for (let i = 0; i < posts.docs.length; i += columnCount) {
    rows.push(posts.docs.slice(i, i + columnCount) as Blog[]);
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-[calc(100vh-9.5rem)]", className)}
      {...props}
    >
      <VList className="w-full h-full pb-12 scrollbar-hide" overscan={5}>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full pb-4"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: "1rem",
            }}
          >
            {row.map((post) => (
              <BlogItem
                key={post.id}
                post={post}
                isHovered={hoverId === post.id}
                onMouseEnter={() => setHoverId(post.id)}
                onMouseLeave={() => setHoverId(null)}
              />
            ))}
          </div>
        ))}
      </VList>
    </div>
  );
}
