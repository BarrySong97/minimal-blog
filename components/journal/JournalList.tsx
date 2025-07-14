"use client";

import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { journalService } from "@/service/journal";
import { queryKeys } from "@/service/config";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Virtualizer } from "virtua";
import Link from "next/link";
import type { VirtualizerHandle } from "virtua";

interface JournalListProps extends React.HTMLAttributes<HTMLDivElement> {
  lng: string;
  slug: string;
}

// 常量配置
const JOURNAL_ITEM_HEIGHT = 32; // 固定高度
const VISIBLE_ITEMS = 10; // 可见项目数
const OVERSCAN = 5; // 预渲染数量

// 容器样式
const containerStyle = {
  height: `${JOURNAL_ITEM_HEIGHT * VISIBLE_ITEMS}px`, // 固定容器高度
  width: "100%",
  overflowY: "hidden" as const, // 隐藏滚动条，禁用滚动
};

// 计算目标滚动位置
const calculateTargetIndex = (clickedIndex: number, totalCount: number) => {
  // 确保目标位置不超出边界
  const targetIndex = Math.max(0, clickedIndex - 4);
  const maxStartIndex = Math.max(0, totalCount - VISIBLE_ITEMS);

  return Math.min(targetIndex, maxStartIndex);
};

// Journal 项目组件
const JournalItem = React.memo(
  ({
    journal,
    isActive,
    onClick,
    lng,
  }: {
    journal: any;
    isActive: boolean;
    onClick: () => void;
    lng: string;
  }) => {
    return (
      <div
        onClick={onClick}
        className={cn(
          "h-8 px-4 py-1 cursor-pointer transition-colors duration-200 hover:bg-accent flex items-center",
          isActive && "bg-accent"
        )}
      >
        <Link
          href={`/${lng}/journal/${journal.slug}`}
          className="w-full text-left block"
        >
          <h3 className="text-sm leading-relaxed truncate">{journal.title}</h3>
        </Link>
      </div>
    );
  }
);

JournalItem.displayName = "JournalItem";

// 加载组件
const LoadingComponent = ({ className }: { className?: string }) => (
  <div className={cn("w-full", className)} style={containerStyle}>
    <div className="animate-pulse space-y-3 p-4">
      {Array.from({ length: VISIBLE_ITEMS }).map((_, i) => (
        <div key={i} className="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
      ))}
    </div>
  </div>
);

export function JournalList({
  className,
  slug,
  lng,
  ...props
}: JournalListProps) {
  const virtualListRef = useRef<VirtualizerHandle>(null);

  // 获取所有 journal 数据
  const { data: response, isLoading } = useQuery({
    queryKey: [...queryKeys.journals.all],
    queryFn: () => journalService.getJournals({ limit: -1 }),
    placeholderData: (prev) => prev,
  });

  const allJournals = response?.docs || [];

  // 点击处理
  const handleJournalClick = useCallback(
    (clickedJournal: any) => {
      const clickedIndex = allJournals.findIndex(
        (j) => j.slug === clickedJournal.slug
      );
      if (clickedIndex === -1) return;

      const targetScrollIndex = calculateTargetIndex(
        clickedIndex,
        allJournals.length
      );

      virtualListRef.current?.scrollToIndex(targetScrollIndex, {
        align: "start",
        smooth: true,
      });
    },
    [allJournals]
  );

  // 初始化定位
  useEffect(() => {
    if (allJournals.length > 0 && slug) {
      const currentIndex = allJournals.findIndex((j) => j.slug === slug);
      if (currentIndex !== -1) {
        const targetScrollIndex = calculateTargetIndex(
          currentIndex,
          allJournals.length
        );
        // 延迟一帧确保组件完全渲染
        requestAnimationFrame(() => {
          virtualListRef.current?.scrollToIndex(targetScrollIndex);
        });
      }
    }
  }, [allJournals, slug]);

  if (isLoading) {
    return <LoadingComponent className={className} />;
  }

  if (allJournals.length === 0) {
    return (
      <div
        className={cn("w-full flex items-center justify-center", className)}
        style={containerStyle}
      >
        <p className="text-muted-foreground">No journals found</p>
      </div>
    );
  }

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className={cn(
        "w-full sticky top-[5rem] [&::-webkit-scrollbar]:hidden",
        className
      )}
      style={{
        ...containerStyle,
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE
      }}
      onWheel={handleWheel}
      onTouchMove={handleTouchMove}
      {...props}
    >
      <Virtualizer
        ref={virtualListRef}
        count={allJournals.length}
        itemSize={JOURNAL_ITEM_HEIGHT}
        overscan={OVERSCAN}
      >
        {(index: number) => (
          <JournalItem
            key={allJournals[index].id}
            journal={allJournals[index]}
            isActive={slug === allJournals[index].slug}
            onClick={() => handleJournalClick(allJournals[index])}
            lng={lng}
          />
        )}
      </Virtualizer>
    </div>
  );
}
