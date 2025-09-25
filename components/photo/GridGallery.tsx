"use client";
import type { GridItem as GridItemType } from "@/types/grid";
import { GridItem } from "./GridItem";
import { VList } from "virtua";
import { useRef, useState, useEffect } from "react";
import { useResponsive } from "ahooks";

interface GridGalleryProps {
  items: GridItemType[];
}

export function GridGallery({ items }: GridGalleryProps) {
  const vListRef = useRef<any>(null);
  const responsive = useResponsive();
  const [columnCount, setColumnCount] = useState(3);

  // 根据屏幕宽度确定列数
  useEffect(() => {
    if (responsive?.sm && !responsive?.md) {
      setColumnCount(3);
    } else if (responsive?.md && !responsive?.lg) {
      setColumnCount(4);
    } else if (responsive?.lg) {
      setColumnCount(6);
    } else {
      // 默认情况（小屏幕）
      setColumnCount(3);
    }
  }, [responsive?.sm, responsive?.md, responsive?.lg]);

  // 将图片数据分组为行
  const rows: GridItemType[][] = [];
  for (let i = 0; i < items.length; i += columnCount) {
    rows.push(items.slice(i, i + columnCount) as GridItemType[]);
  }

  return (
    <div className="w-full h-full">
      <VList ref={vListRef} className="w-full h-full p-4" overscan={5}>
        {rows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-4 pb-4"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
            }}
          >
            {row.map((item) => (
              <GridItem key={item.id} item={item} />
            ))}
          </div>
        ))}
      </VList>
    </div>
  );
}
