import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { GridGallery } from "@/components/photo/GridGallery";
import { Metadata } from "next";
import React, { FC } from "react";
import { GridItem } from "@/types/grid";
export interface PhotesProps {}
export const metadata: Metadata = {
  title: "Photos",
  description: "My photos",
};
export const gridItems: GridItem[] = [
  { id: "1", imageUrl: "https://picsum.photos/300/400?random=1" },
  { id: "2", text: "Discover our world" },
  { id: "3", empty: true },
  { id: "4", imageUrl: "https://picsum.photos/300/400?random=2" },
  { id: "5", empty: true },
  {
    id: "6",
    text: "Electra is a European specialist in fast charging for electric vehicles",
  },
  { id: "7", imageUrl: "https://picsum.photos/300/400?random=3" },
  { id: "8", empty: true },
  { id: "9", text: "Book your spot anywhere you like" },
  { id: "10", imageUrl: "https://picsum.photos/300/400?random=4" },
  { id: "11", empty: true },
  { id: "12", empty: true },
  { id: "13", imageUrl: "https://picsum.photos/300/400?random=5" },
  { id: "14", text: "Fast charging stations" },
  { id: "15", empty: true },
  { id: "16", imageUrl: "https://picsum.photos/300/400?random=6" },
  { id: "17", empty: true },
  { id: "18", text: "Clean energy future" },
  { id: "19", imageUrl: "https://picsum.photos/300/400?random=7" },
  { id: "20", empty: true },
  { id: "21", imageUrl: "https://picsum.photos/300/400?random=8" },
  { id: "22", text: "Electric mobility" },
  { id: "23", empty: true },
  { id: "24", imageUrl: "https://picsum.photos/300/400?random=9" },
  { id: "25", empty: true },
  { id: "26", empty: true },
  { id: "27", text: "Sustainable transport" },
  { id: "28", imageUrl: "https://picsum.photos/300/400?random=10" },
  { id: "29", empty: true },
  { id: "30", imageUrl: "https://picsum.photos/300/400?random=11" },
  { id: "31", text: "Charging network" },
  { id: "32", empty: true },
  { id: "33", imageUrl: "https://picsum.photos/300/400?random=12" },
  { id: "34", empty: true },
  { id: "35", text: "Electric vehicles" },
  { id: "36", imageUrl: "https://picsum.photos/300/400?random=13" },
];
const Photes: FC<PhotesProps> = () => {
  return (
    <DefaultLayout className="p-0 h-screen">
      <GridGallery items={gridItems} />
    </DefaultLayout>
  );
};

export default Photes;
