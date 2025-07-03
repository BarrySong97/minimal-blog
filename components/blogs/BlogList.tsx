"use client";
import { cn } from "@/lib/utils";
import { useRef, useState, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { blogService } from "@/service/blogs";
import { VList } from "virtua";
import { useResponsive } from "ahooks";
import { Icon } from "@iconify/react";
import { Blog } from "@/payload-types";
import { useQueryState } from "nuqs";
import { BlogGridItem } from "./BlogGridItem";
import { BlogListItem } from "./BlogListItem";
import Loading from "@/app/(app)/[lng]/blogs/loading";

interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {}

export function BlogList({ className, ...props }: BlogListProps) {
  const [layout] = useQueryState("layout", {
    defaultValue: "grid",
    parse: (value): "grid" | "list" => (value === "list" ? "list" : "grid"),
  });
  const [tags] = useQueryState("tags", {
    parse: (value) => (value ? value.split(",") : []),
    defaultValue: [],
  });
  const {
    data: blogsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: [...queryKeys.blogs.infinite, { tags }],
    queryFn: ({ pageParam = 1 }) =>
      blogService.getBlogs({ page: pageParam, tags }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const vListRef = useRef<any>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(2);
  const totalItemsRef = useRef<number>(0);

  // 根据屏幕宽度确定列数
  useEffect(() => {
    if (layout === "list") {
      setColumnCount(1);
      return;
    }
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
  }, [responsive?.sm, responsive?.md, responsive?.lg, responsive?.xl, layout]);

  // 将所有页面的博客合并为一个数组
  const allBlogs = blogsData?.pages.flatMap((page) => page.docs) || [];

  // 更新总项目数
  useEffect(() => {
    totalItemsRef.current = allBlogs.length;
  }, [allBlogs.length]);

  // 处理滚动加载更多
  const handleScroll = useCallback(async () => {
    if (!vListRef.current) return;

    // 如果有下一页并且不在加载中，并且当前查看的索引接近末尾
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetching &&
      vListRef.current.findEndIndex() + 10 >
        Math.ceil(allBlogs.length / columnCount)
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    allBlogs.length,
    columnCount,
  ]);

  // 加载状态
  if (isLoading) {
    return <Loading />;
  }

  // 空状态
  if (!allBlogs.length) {
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
  for (let i = 0; i < allBlogs.length; i += columnCount) {
    rows.push(allBlogs.slice(i, i + columnCount) as Blog[]);
  }

  const ItemComponent = layout === "grid" ? BlogGridItem : BlogListItem;

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-[calc(100dvh-14.5rem)] relative",
        "motion-translate-x-in-[0%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-ease-spring-smooth",
        className
      )}
      {...props}
    >
      <VList
        ref={vListRef}
        className="w-full h-full pb-12 scrollbar-hide"
        overscan={10}
        onScroll={handleScroll}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full pb-4 px-0 container mx-auto"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: "1rem",
            }}
          >
            {row.map((post) => (
              <ItemComponent
                key={post.id}
                post={post}
                isHovered={hoverId === post.id}
                onMouseEnter={() => setHoverId(post.id)}
                onMouseLeave={() => setHoverId(null)}
              />
            ))}
          </div>
        ))}
        {(isFetchingNextPage || isFetching) && (
          <div className="flex justify-center items-center py-6">
            <Icon
              icon="line-md:loading-twotone-loop"
              className="w-8 h-8 text-primary animate-spin"
            />
          </div>
        )}
      </VList>
    </div>
  );
}
