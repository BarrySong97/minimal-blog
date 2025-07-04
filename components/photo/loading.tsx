"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export default function PhotoLoading() {
  // 默认显示3列，在小屏幕上会通过CSS调整
  const columns = 3;
  // 生成9个骨架项
  const skeletonItems = Array.from({ length: 9 }, (_, i) => i);

  // 将骨架项分组为行
  const rows = [];
  for (let i = 0; i < skeletonItems.length; i += columns) {
    rows.push(skeletonItems.slice(i, i + columns));
  }

  return (
    <div className="w-full h-[calc(100vh-9.5rem)] relative">
      <div className="w-full h-full pb-12 overflow-auto scrollbar-hide">
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full pb-4 container mx-auto px-6 2xl:px-0 
                      grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
          >
            {row.map((item) => (
              <div key={item} className="aspect-[4/3] w-full">
                <div
                  className={cn(
                    "relative overflow-hidden  bg-card shadow-sm h-full",
                    "animate-pulse"
                  )}
                >
                  {/* 图片骨架 - 占据卡片大部分空间 */}
                  <div className="w-full h-full bg-gray-200 dark:bg-gray-700"></div>

                  {/* 内容骨架 - 位于底部 */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 space-y-1.5 ">
                    {/* 标题骨架 - 白色 */}
                    <div className="h-4 bg-gray-100 dark:bg-gray-300 rounded w-2/3 opacity-70"></div>
                    {/* 描述骨架 - 较小 */}
                    <div className="h-3 bg-gray-100 dark:bg-gray-300 rounded w-1/2 opacity-60"></div>
                    {/* 日期骨架 - 最小 */}
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-300 rounded w-1/4 opacity-50"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* 底部加载指示器 */}
        <div className="flex justify-center items-center py-6">
          <Icon
            icon="line-md:loading-twotone-loop"
            className="w-8 h-8 text-primary animate-spin"
          />
        </div>
      </div>
    </div>
  );
}
