import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import PhotoList from "@/components/photo/list";
import { Metadata } from "next";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { useTranslation } from "../../i18n";

export const metadata: Metadata = {
  title: "Photo",
  description: "Barry Song's photo gallery",
};
const PhotoPage = async ({ params }: { params: Promise<{ lng: string }> }) => {
  const { lng } = await params;
  // 针对无限查询正确预加载第一页数据
  const state = await prefetchInfiniteQuery({
    queryKey: queryKeys.photos.infinite,
    queryFn: ({ pageParam = 1 }) =>
      photoService.getPhotosPaginated({ page: pageParam }),
    initialPageParam: 1,
  });
  const { t } = await useTranslation(lng);
  return (
    <HydrationBoundary state={state}>
      <div className="space-y-8" key={"photo-page"}>
        <div className="flex items-center justify-between container mx-auto px-6 2xl:px-0">
          <SectionHeader
            title={t("common.nav.photos")}
            className={cn(
              "pl-0",
              "motion-scale-in-[0.37] motion-opacity-in-[0%]"
            )}
          />
        </div>
        <PhotoList lang={lng} />
      </div>
    </HydrationBoundary>
  );
};

export default PhotoPage;
