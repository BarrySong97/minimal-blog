import { Media } from "@/payload-types";
import { PhotoProvider, PhotoView } from "react-photo-view";
import React, { FC, useRef, useState, useEffect } from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";

export interface HorizentalImagesProps {
  filename: string;
  images: {
    image: Media;
  }[];
  className?: string;
}

const HorizentalImages: FC<HorizentalImagesProps> = ({
  filename,
  images,
  className,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [needsScroll, setNeedsScroll] = useState(true);

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      const hasOverflow = scrollWidth > clientWidth;
      setNeedsScroll(hasOverflow);
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    if (container) {
      const handleScroll = () => {
        checkScrollButtons();
      };
      container.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", checkScrollButtons);

      // 使用 ResizeObserver 监听容器大小变化
      const resizeObserver = new ResizeObserver(checkScrollButtons);
      resizeObserver.observe(container);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", checkScrollButtons);
        resizeObserver.disconnect();
      };
    }
  }, [images]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      const targetScroll =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <div className={cn("relative group", className)}>
      <div className="py-4">
        {/* 左侧滚动按钮 */}
        {needsScroll && (
          <button
            onClick={() => scroll("left")}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-10",
              "bg-white/80 dark:bg-black/80 backdrop-blur-sm",
              "rounded-full p-2 shadow-lg",
              "transition-all duration-200",
              "hover:bg-white dark:hover:bg-black",
              "disabled:opacity-0 disabled:pointer-events-none",
              "md:opacity-0 md:group-hover:opacity-100"
            )}
            disabled={!canScrollLeft}
            aria-label="Scroll left"
          >
            <Icon icon="lucide:chevron-left" className="w-5 h-5" />
          </button>
        )}

        {/* 右侧滚动按钮 */}
        {needsScroll && (
          <button
            onClick={() => scroll("right")}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-10",
              "bg-white/80 dark:bg-black/80 backdrop-blur-sm",
              "rounded-full p-2 shadow-lg",
              "transition-all duration-200",
              "hover:bg-white dark:hover:bg-black",
              "disabled:opacity-0 disabled:pointer-events-none",
              "md:opacity-0 md:group-hover:opacity-100"
            )}
            disabled={!canScrollRight}
            aria-label="Scroll right"
          >
            <Icon icon="lucide:chevron-right" className="w-5 h-5" />
          </button>
        )}

        {/* 图片容器 */}
        <div
          ref={scrollContainerRef}
          className={cn(
            "flex gap-4 overflow-x-auto items-center",
            "scroll-smooth scrollbar-hide",
            needsScroll ? "snap-x snap-mandatory" : "",
            !needsScroll && "justify-center" // 当不需要滚动时居中
          )}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {images.map((item, index) => {
            const image = item.image;
            const isPortrait = (image.height || 0) > (image.width || 0);

            return (
              <div
                key={image.id || index}
                className={cn(
                  "flex-shrink-0",
                  needsScroll && "snap-start",
                  "relative overflow-hidden ",
                  "bg-gray-100 dark:bg-gray-800",
                  "flex items-center justify-center", // 添加flex居中
                  isPortrait ? "h-[400px]" : "h-[300px]"
                )}
                style={{
                  aspectRatio: `${image.width || 1} / ${image.height || 1}`,
                }}
              >
                <PhotoProvider>
                  <PhotoView src={image.url!}>
                    <ImageWithFallback
                      image={image}
                      alt={image.alt || `Image ${index + 1}`}
                      width={image.width || 0}
                      height={image.height || 0}
                      className="w-full h-full object-contain cursor-pointer" // 改为object-contain保持比例
                      loading="lazy"
                    />
                  </PhotoView>
                </PhotoProvider>
              </div>
            );
          })}
        </div>
      </div>

      {/* 文件名显示 */}
      {filename && (
        <div className="text-center mt-2 text-sm text-gray-600 dark:text-gray-400">
          {filename}
        </div>
      )}
    </div>
  );
};

export default HorizentalImages;
