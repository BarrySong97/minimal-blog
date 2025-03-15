import { prefetchQuery } from "@/components/tanstack/tanstack-server";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";
import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import { HydrationBoundary } from "@tanstack/react-query";
import React from "react";
import PhotoList from "@/components/photo/list";

const PhotoPage = async () => {
  const state = await prefetchQuery({
    queryKey: queryKeys.photos.all,
    queryFn: photoService.getPhotos,
  });
  return (
    <HydrationBoundary state={state}>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
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
    </HydrationBoundary>
  );
};

export default PhotoPage;
