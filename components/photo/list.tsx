"use client";
import { queryKeys } from "@/service/config";
import { photoService } from "@/service/photo";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import PhotoCard from "./card";

export interface PhotoListProps {}

const PhotoList: FC<PhotoListProps> = () => {
  const { data: photos } = useQuery({
    queryKey: queryKeys.photos.all,
    queryFn: photoService.getPhotos,
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {photos?.docs.map((photo) => <PhotoCard key={photo.id} photo={photo} />)}
    </div>
  );
};

export default PhotoList;
