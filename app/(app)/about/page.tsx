import AboutContent from "@/components/about/content";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { prefetchQuery } from "@/components/tanstack/tanstack-server";
import { aboutService } from "@/service/about";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";
import React, { FC } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Barry Song's about page",
};
export interface AboutProps {}
const About: FC<AboutProps> = async () => {
  const state = await prefetchQuery({
    queryKey: queryKeys.about,
    queryFn: aboutService.getAbout,
  });
  return (
    <HydrationBoundary state={state}>
      <DefaultLayout>
        <AboutContent />
      </DefaultLayout>
    </HydrationBoundary>
  );
};

export default About;
