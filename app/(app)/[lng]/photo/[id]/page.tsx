import PhotoDetail from "@/components/photo/detail";
import PhotoItem from "@/components/photo/modal/PhotoItem";
import { prefetchQuery } from "@/components/tanstack/tanstack-server";
import { queryKeys } from "@/service";
import { photoService } from "@/service/photo";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function Photo({
  params,
}: {
  params: Promise<{ id: string; lng: string }>;
}) {
  const id = (await params).id;
  const state = await prefetchQuery({
    queryKey: queryKeys.photos.detail(id),
    queryFn: () => photoService.getPhotoById(id),
  });

  return (
    <HydrationBoundary state={state}>
      <PhotoDetail id={id} />
    </HydrationBoundary>
  );
}
