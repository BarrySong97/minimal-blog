"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import React from "react";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { AnimatePresence } from "framer-motion";

const PhotoPage = ({
  children,
  photo,
}: {
  children: React.ReactNode;
  photo: React.ReactNode;
}) => {
  // 针对无限查询正确预加载第一页数据

  return (
    <DefaultLayout isScroll={false}>
      {/* 通过并行路由显示照片详情 */}

      <AnimatePresence mode="popLayout">{photo}</AnimatePresence>

      <div className="space-y-8" key={"photo-page"}>
        <div className="flex items-center justify-between container mx-auto px-6 2xl:px-0">
          <SectionHeader
            title={"照片"}
            className={cn(
              "pl-0",
              "motion-scale-in-[0.37] motion-opacity-in-[0%]"
            )}
          />
        </div>

        {children}
      </div>
    </DefaultLayout>
  );
};

export default PhotoPage;
