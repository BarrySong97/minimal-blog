"use client";
import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import { useInfiniteQuery } from "@tanstack/react-query";
import React, { FC, useRef, useEffect, useState, useCallback } from "react";
import PhotoCard from "./card";
import { Photo } from "@/payload-types";
import { useResponsive } from "ahooks";
import { VList } from "virtua";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export interface PhotoListProps extends React.HTMLAttributes<HTMLDivElement> {
  lang: string;
}

const PhotoList: FC<PhotoListProps> = ({ className, lang, ...props }) => {
  const {
    data: photosData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: queryKeys.photos.infinite,
    queryFn: ({ pageParam = 1 }) =>
      photoService.getPhotosPaginated({ page: pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.nextPage : undefined,
    initialPageParam: 1,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const vListRef = useRef<any>(null);
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(3);
  const totalItemsRef = useRef<number>(0);

  // 根据屏幕宽度确定列数
  useEffect(() => {
    if (responsive?.sm && !responsive?.md) {
      setColumnCount(1);
    } else if (responsive?.md && !responsive?.lg) {
      setColumnCount(2);
    } else if (responsive?.lg && !responsive?.xl) {
      setColumnCount(3);
    } else if (responsive?.xl) {
      setColumnCount(3); // 在更大的屏幕上显示3列
    } else {
      // 默认情况（小屏幕）
      setColumnCount(1);
    }
  }, [responsive?.sm, responsive?.md, responsive?.lg, responsive?.xl]);

  // 将所有页面的照片合并为一个数组
  const allPhotos = photosData?.pages.flatMap((page) => page.docs) || [];

  // 更新总项目数
  useEffect(() => {
    totalItemsRef.current = allPhotos.length;
  }, [allPhotos.length]);

  // 处理滚动加载更多
  const handleScroll = useCallback(async () => {
    if (!vListRef.current) return;

    // 如果有下一页并且不在加载中，并且当前查看的索引接近末尾
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      !isFetching &&
      vListRef.current.findEndIndex() + 10 >
        Math.ceil(allPhotos.length / columnCount)
    ) {
      fetchNextPage();
    }
  }, [
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    allPhotos.length,
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
        <p className="mt-4 text-gray-500">加载照片中...</p>
      </div>
    );
  }

  // 空状态
  if (!allPhotos.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Icon
          icon="mdi:image-off-outline"
          className="w-16 h-16 text-gray-400"
        />
        <p className="mt-4 text-gray-500">暂无照片</p>
      </div>
    );
  }

  // 将照片数据分组为行
  const rows: Photo[][] = [];
  for (let i = 0; i < allPhotos.length; i += columnCount) {
    rows.push(allPhotos.slice(i, i + columnCount) as Photo[]);
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "w-full h-[calc(100vh-9.5rem)] relative",
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
            className="grid w-full pb-4 container mx-auto px-6 2xl:px-0"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: "0.5rem",
            }}
          >
            {row.map((photo) => (
              <div key={photo.id} className="aspect-[4/3] w-full">
                <PhotoCard photo={photo} lang={lang} />
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

export default PhotoList;
