"use client";

import { ViewHover } from "@/components/blogs/ViewHover";
import Image from "next/image";

export default function DemoPage() {
  return (
    <div className="min-h-screen p-8 flex items-center justify-center">
      <div className="space-y-8">
        <div className="text-center mb-4">
          <p>👇 把鼠标移到图片上试试 👇</p>
        </div>

        {/* 这是一个可以hover的卡片示例 */}
        <div className="relative w-80 h-80 group">
          <Image
            src="https://images.unsplash.com/photo-1682687220742-aba13b6e50ba"
            alt="Demo image"
            fill
            className="object-cover rounded-2xl"
          />
          {/* ViewHover 默认是隐藏的，只有在父元素被hover时才显示 */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ViewHover text="查看详情" />
          </div>
        </div>
      </div>
    </div>
  );
}
