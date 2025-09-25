import type { GridItem } from "@/types/grid";

interface GridItemProps {
  item: GridItem;
}

export function GridItem({ item }: GridItemProps) {
  // 空格子 - 透明占位
  if (item.empty) {
    return <div />;
  }

  // 图片格子
  if (item.imageUrl) {
    return (
      <div className="aspect-[3/4] overflow-hidden ">
        <img
          src={item.imageUrl}
          alt=""
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
    );
  }

  // 文字格子
  if (item.text) {
    return (
      <div className="aspect-[3/4] flex items-start justify-start   ">
        <p className="text-center font-medium text-sm leading-relaxed">
          {item.text}
        </p>
      </div>
    );
  }

  return null;
}
