import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import { prefetchInfiniteQuery } from "@/components/tanstack/tanstack-server";
import PhotoList from "@/components/photo/list";

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
      <PhotoList />
    </HydrationBoundary>
  );
};

export default PhotoPage;
