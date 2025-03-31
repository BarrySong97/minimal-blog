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

      {children}
    </DefaultLayout>
  );
};

export default PhotoPage;
