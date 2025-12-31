"use client";
import { cn } from "@/lib/utils";
import { useQueryState } from "nuqs";
import { parseAsString } from "nuqs/server";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useLayoutEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

// Since BlogTag is not a separate collection, we define the type here based on what getBlogTags returns.
// We assume it returns objects with id and name.
interface BlogTag {
  id: string;
  name?: string | null;
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
];

interface TagListProps extends React.HTMLAttributes<HTMLDivElement> {
  tags: string[];
}
export function TagList({ tags: allTags, className, ...props }: TagListProps) {
  const [selectedTag, setSelectedTag] = useQueryState(
    "tags",
    parseAsString.withDefault("")
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const tagsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = tagsRef.current;
    if (!isDesktop || !element) return;

    const observer = new ResizeObserver(() => {
      const hasOverflow = element.scrollHeight > element.clientHeight;
      if (!isExpanded) {
        setIsOverflowing(hasOverflow);
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [isDesktop, allTags, isExpanded]);

  const handleTagClick = (tag: string | null) => {
    if (tag === null) {
      setSelectedTag("");
      return;
    }
    // if click current tag again, deselect it
    setSelectedTag(selectedTag === tag ? "" : tag);
  };

  const isAllSelected = !selectedTag;

  const renderTags = (tagList: string[]) => (
    <>
      <button
        key="all"
        onClick={() => handleTagClick(null)}
        className={cn("border px-3 py-1 text-sm transition-colors", {
          "border-primary bg-primary text-primary-foreground": isAllSelected,
          "border-border bg-transparent hover:bg-muted": !isAllSelected,
        })}
      >
        所有
      </button>
      {tagList.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={cn("border px-3 py-1 text-sm transition-colors", {
            "border-primary bg-primary text-primary-foreground":
              selectedTag === tag,
            "border-border bg-transparent hover:bg-muted": selectedTag !== tag,
          })}
        >
          {tag}
        </button>
      ))}
    </>
  );

  if (isDesktop) {
    return (
      <div className={cn("relative", className)} {...props}>
        <div
          ref={tagsRef}
          className={cn(
            "flex flex-wrap gap-2 overflow-hidden transition-all duration-300",
            {
              "max-h-9": !isExpanded,
            }
          )}
        >
          {renderTags(allTags)}
        </div>
        {isOverflowing && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center mt-2 gap-x-1 text-sm text-muted-foreground"
          >
            {isExpanded ? "收起" : "展开"}
            <Icon
              icon="lucide:arrow-down"
              className={cn("h-4 w-4 transition-transform", {
                "rotate-180": isExpanded,
              })}
            />
          </button>
        )}
      </div>
    );
  }

  // Mobile view with Drawer
  const displayedTags = allTags.slice(0, 7);
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-2 motion-opacity-in-[0%] motion-translate-y-in-[-10px] [animation-delay:0.42s]",
        className
      )}
      {...props}
    >
      <div className="flex flex-wrap gap-2">{renderTags(displayedTags)}</div>
      {allTags.length > 7 && (
        <Drawer>
          <DrawerTrigger asChild>
            <button className="text-sm text-muted-foreground">所有</button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>所有标签</DrawerTitle>
            </DrawerHeader>
            <div className="p-4 pb-32">
              <div className="flex flex-wrap gap-2">{renderTags(allTags)}</div>
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
