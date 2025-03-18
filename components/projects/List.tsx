"use client";
import { Project } from "@/payload-types";
import React, { FC, useRef, useState, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { projectService } from "@/service/projects";
import { queryKeys } from "@/service/config";
import ProjectItem from "./ProjectItem";
import { cn } from "@/lib/utils";
import { ViewHover } from "../common/ViewHover";
import { VList } from "virtua";
import { useResponsive } from "ahooks";
import { Icon } from "@iconify/react";

export interface ProjectListProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const ProjectList: FC<ProjectListProps> = ({ className, ...props }) => {
  const {
    data: projectsData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: queryKeys.projects.infinite,
    queryFn: ({ pageParam = 1 }) =>
      projectService.getProjects({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const vListRef = useRef<any>(null);
  const [hoverId, setHoverId] = useState<number | null>(null);
  const [hoverType, setHoverType] = useState<"default" | "github">("default");
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(2);
  const totalItemsRef = useRef<number>(0);

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

  // 将所有页面的项目合并为一个数组
  const allProjects = projectsData?.pages.flatMap((page) => page.docs) || [];

  // 更新总项目数
  useEffect(() => {
    totalItemsRef.current = allProjects.length;
  }, [allProjects.length]);

  // 处理滚动加载更多
  const handleScroll = useCallback(async () => {
    if (!vListRef.current) return;

    // 如果有下一页并且不在加载中，并且当前查看的索引接近末尾
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetching &&
      vListRef.current.findEndIndex() + 10 >
        Math.ceil(allProjects.length / columnCount)
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    allProjects.length,
    columnCount,
  ]);

  // 加载状态
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon
          icon="line-md:loading-twotone-loop"
          className="w-12 h-12 text-primary animate-spin"
        />
        <p className="mt-4 text-gray-500">加载项目中...</p>
      </div>
    );
  }

  // 空状态
  if (!allProjects.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon icon="mdi:folder-outline" className="w-16 h-16 text-gray-400" />
        <p className="mt-4 text-gray-500">暂无项目</p>
      </div>
    );
  }

  // 将项目数据分组为行
  const rows: Project[][] = [];
  for (let i = 0; i < allProjects.length; i += columnCount) {
    rows.push(allProjects.slice(i, i + columnCount) as Project[]);
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-[calc(100vh-9.5rem)] relative", className)}
      {...props}
    >
      <VList
        ref={vListRef}
        className={cn(
          "w-full h-full pb-12 scrollbar-hide",
          "motion-translate-x-in-[0%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-ease-spring-smooth"
        )}
        overscan={5}
        onScroll={handleScroll}
      >
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full pb-4 px-6  2xl:px-0 container mx-auto"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: "1rem",
            }}
          >
            {row.map((project) => (
              <div key={project.id} className="group relative">
                <ProjectItem
                  key={project.title}
                  project={project}
                  href={project.href}
                  onMouseEnter={() => {
                    setHoverId(project.id);
                    setHoverType("default");
                  }}
                  onMouseLeave={() => {
                    setHoverId(null);
                  }}
                  onGithubHover={() => {
                    setHoverId(project.id);
                    setHoverType("github");
                  }}
                  onGithubLeave={() => {
                    setHoverType("default");
                  }}
                />
                <ViewHover
                  isHover={hoverId === project.id}
                  trackMouse
                  text={hoverType === "github" ? "Go to GitHub" : "Read More"}
                />
              </div>
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
};

export default ProjectList;
