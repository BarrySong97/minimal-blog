"use client";
import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useRef, useEffect, useState, useMemo } from "react";
import PhotoCard from "./card";
import { Photo } from "@/payload-types";
import { useResponsive } from "ahooks";
import { VList } from "virtua";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

export interface PhotoListProps extends React.HTMLAttributes<HTMLDivElement> {}

const PhotoList: FC<PhotoListProps> = ({ className, ...props }) => {
  const { data: photosData, isLoading } = useQuery({
    queryKey: queryKeys.photos.all,
    queryFn: photoService.getPhotos,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(3);

  // 根据屏幕宽度确定列数
  useEffect(() => {
    if (responsive?.sm && !responsive?.md) {
      setColumnCount(1);
    } else if (responsive?.md && !responsive?.lg) {
      setColumnCount(2);
    } else if (responsive?.lg && !responsive?.xl) {
      setColumnCount(3);
    } else if (responsive?.xl) {
      setColumnCount(3); // 在更大的屏幕上显示4列
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
        <p className="mt-4 text-gray-500">加载照片中...</p>
      </div>
    );
  }

  // 空状态
  if (!photosData?.docs.length) {
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
  for (let i = 0; i < photosData.docs.length; i += columnCount) {
    rows.push(photosData.docs.slice(i, i + columnCount) as Photo[]);
  }

  return (
    <div
      ref={containerRef}
      className={cn("w-full h-[calc(100vh-9.5rem)]  ", className)}
      {...props}
    >
      <VList className="w-full h-full pb-12 scrollbar-hide " overscan={5}>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid w-full pb-4"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
              gap: "0.5rem",
            }}
          >
            {row.map((photo) => (
              <div key={photo.id} className="aspect-[4/3] w-full">
                <PhotoCard photo={photo} />
              </div>
            ))}
          </div>
        ))}
      </VList>
    </div>
  );
};

export default PhotoList;
