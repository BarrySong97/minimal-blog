"use client";
import { useEffect, useState } from "react";
import { useResponsive } from "ahooks";
import { cn } from "@/lib/utils";

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {}

const Loading = ({ className, ...props }: LoadingProps) => {
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(2);

  // 根据屏幕宽度确定列数，与BlogList保持一致
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

  // 创建骨架屏行数
  const skeletonRows = Array.from({ length: 6 }, (_, i) => i);

  return (
    <div
      className={cn(
        "w-full h-screen relative",
        "motion-translate-x-in-[0%] motion-translate-y-in-[2%] motion-opacity-in-[0%] motion-ease-spring-smooth",
        className
      )}
      {...props}
    >
      <div className="w-full h-full pb-12 overflow-auto">
        {skeletonRows.map((rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full pb-4 px-0 container mx-auto"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: "1rem",
            }}
          >
            {Array.from({ length: columnCount }, (_, colIndex) => (
              <div key={colIndex} className="group relative animate-pulse">
                <div className="group relative flex flex-col md:flex-row h-auto md:h-[400px] overflow-hidden border shadow-sm backdrop-blur-sm">
                  {/* 图片区域 */}
                  <div className=" aspect-[1/1] md:w-1/2 md:aspect-[4/3] overflow-hidden relative bg-gray-200 dark:bg-gray-800">
                    {/* Read More 按钮位置 */}
                    <div className="absolute bottom-0 right-0 bg-gray-300 dark:bg-gray-700 z-50 py-2 px-4 hidden"></div>
                  </div>

                  {/* 内容区域 */}
                  <div className="flex flex-1 flex-col justify-between p-4 md:px-6 md:py-4 relative">
                    {/* 日期和阅读时间 */}
                    <div className="flex items-center gap-3 mb-4 text-sm md:absolute md:top-4 md:right-4">
                      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-4 w-2 bg-gray-200 dark:bg-gray-800 rounded"></div>
                      <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded"></div>
                    </div>

                    <div className="flex-1 relative z-10 flex flex-col justify-between sm:mb-4">
                      <div></div>
                      <div>
                        {/* 标题 */}
                        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mb-4"></div>

                        {/* 摘要 */}
                        <div className="space-y-2 mb-4 md:mb-0">
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
                          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
