export const revalidate = 0;
import {
  blogService,
  experienceService,
  homeService,
  projectService,
  queryKeys,
} from "@/service";
import React, { FC } from "react";
import ImageCube from "@/components/demo/ImageCube";
import ResumeCard from "@/components/demo/ResumeCard";
import DescriptionCard from "@/components/demo/DescriptionCard";
import PictureWallCard from "@/components/demo/PictureWallCard";
import ArticleCard from "@/components/demo/ArticleCard";
import { prefetchQueries } from "@/components/tanstack/tanstack-server";
import { HydrationBoundary } from "@tanstack/react-query";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Profile } from "@/components/home/Profile";
import { Projects } from "@/components/home/Projects";
import { Experience } from "@/components/home/Experience";

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
      queryKey: queryKeys.experiences.all,
      queryFn: experienceService.getExperiences,
    },
    {
      queryKey: queryKeys.projects.latest,
      queryFn: projectService.getLatestProject,
    },
  ]);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="min-h-screen hidden p-4 md:p-8 sm:flex items-center justify-center">
        <div className="max-w-4xl   mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-fit">
            {/* Resume Card */}
            <ResumeCard />

            {/* Description Card */}
            <DescriptionCard title="关于我" description="" />

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
      <DefaultLayout className="px-6 h-screen pb-20 2xl:px-0 container mx-auto block sm:hidden">
        <div className="space-y-12 sm:space-y-16">
          <div className="space-y-12 sm:space-y-16">
            <Profile />
            <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-12 sm:gap-24">
              <Projects />
              <Experience />
            </div>
          </div>
        </div>
      </DefaultLayout>
    </HydrationBoundary>
  );
};

export default Page;
