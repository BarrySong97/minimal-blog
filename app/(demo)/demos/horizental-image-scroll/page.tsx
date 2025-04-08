import { FC } from "react";
import { Locations } from "@/components/gallary/Locations";
import { ScrollablePhotoList } from "@/components/gallary/ScrollablePhotoList";
import { models } from "@/data/models";
import Workshop from "@/components/gallary/workshop";

const GallaryPage: FC = () => {
  return (
    <div className=" w-full">
      {/* 确保有足够的滚动空间 */}
      <div className="container mx-auto px-4 sticky top-0 py-20">
        <Locations className="mb-8" />
        <ScrollablePhotoList models={models} />
        <Workshop />
      </div>
    </div>
  );
};

export default GallaryPage;
