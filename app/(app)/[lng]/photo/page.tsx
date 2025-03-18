import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";
import React from "react";
import PhotoList from "@/components/photo/list";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";

const PhotoPage = async () => {
  // 针对无限查询正确预加载第一页数据
  const state = await prefetchInfiniteQuery({
    queryKey: queryKeys.photos.infinite,
    queryFn: ({ pageParam = 1 }) =>
      photoService.getPhotosPaginated({ page: pageParam }),
    initialPageParam: 1,
  });

  return (
    <HydrationBoundary state={state}>
      <DefaultLayout isScroll={false}>
        <div className="space-y-8">
          <div className="flex items-center justify-between container mx-auto px-6 2xl:px-0">
            <SectionHeader
              title={"照片"}
              className={cn(
                "pl-0",
                "motion-scale-in-[0.37] motion-opacity-in-[0%]"
              )}
            />
          </div>

          <PhotoList />
        </div>
      </DefaultLayout>
    </HydrationBoundary>
  );
};

export default PhotoPage;
