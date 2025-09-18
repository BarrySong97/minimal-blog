export const revalidate = 0;
import { blogService, homeService, projectService, queryKeys } from "@/service";
import React, { FC } from "react";
import ImageCube from "@/components/demo/ImageCube";
import ResumeCard from "@/components/demo/ResumeCard";
import DescriptionCard from "@/components/demo/DescriptionCard";
import PictureWallCard from "@/components/demo/PictureWallCard";
import ArticleCard from "@/components/demo/ArticleCard";
import { prefetchQueries } from "@/components/tanstack/tanstack-server";
import { HydrationBoundary } from "@tanstack/react-query";

export interface PageProps {}

const Page: FC<PageProps> = async () => {
  const dehydratedState = await prefetchQueries([
    {
      queryKey: queryKeys.home,
      queryFn: homeService.getHome,
    },
    {
      queryKey: queryKeys.blogs.latest,
      queryFn: blogService.getLatestBlog,
    },
    {
      queryKey: queryKeys.projects.latest,
      queryFn: projectService.getLatestProject,
    },
  ]);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen bg-gray-50 p-4 md:p-8 flex items-center justify-center">
        <div className="max-w-4xl mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
            {/* Resume Card */}
            <ResumeCard />

            {/* Description Card */}
            <DescriptionCard
              title="ABOUT ME"
              description="BITRECS GOES BEYOND THE LIMITATIONS OF TRADITIONAL RECOMMENDATION ENGINES, TRANSFORMING HOW ONLINE STORES CONNECT WITH THEIR CUSTOMERS, DRIVING SALES, AND CREATING UNIQUE, PERSONALIZED EXPERIENCES."
            />

            {/* Interactive Image Cube */}
            <ImageCube />

            {/* Article Card */}
            <ArticleCard />

            {/* Picture Wall Card */}
            <PictureWallCard />

            {/* Animated Menu */}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
