"use client";
import React from "react";
import { cn } from "@/lib/utils";

export default function ProjectsLoading() {
  // 创建一个模拟的项目列表骨架屏
  return (
    <div className="w-full h-[calc(100vh-9.5rem)] relative">
      <div className="w-full h-full pb-12 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4 px-6 2xl:px-0 pt-4">
          {/* 生成6个骨架项目卡片 */}
          {Array.from({ length: 6 }).map((_, index) => (
            <ProjectItemSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectItemSkeleton() {
  return (
    <div className="group relative block overflow-hidden  transition-all duration-300 hover:shadow-lg animate-pulse">
      <div className="relative ">
        {/* 项目图片/视频区域 - 使用更接近实际内容的比例 */}
        <div className=" w-full aspect-[4/3] bg-gray-200 dark:bg-gray-800 " />

        {/* 项目元数据区域骨架 - 使用渐变背景更接近实际效果 */}
        <div className="absolute bottom-0 flex justify-between left-0 right-0 p-4 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
          {/* 项目标题骨架 */}
          <div>
            <div className="h-6 w-[100px] bg-gray-300/50 dark:bg-gray-700/50 rounded mb-2" />
            <div className="h-6 w-[200px] bg-gray-300/50 dark:bg-gray-700/50 rounded mb-2" />
          </div>

          {/* 项目描述骨架 */}

          {/* 项目标签骨架 */}
          <div className="flex  flex-col flex-wrap gap-2 mt-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-16 bg-gray-300/50 dark:bg-gray-700/50 rounded-full"
              />
            ))}
          </div>
        </div>

        {/* 添加悬停效果的骨架 - 模拟ViewHover组件 */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
      </div>
    </div>
  );
}
