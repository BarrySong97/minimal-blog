import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import React from "react";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { Metadata } from "next/types";
export interface ProjectsProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Projects",
  description: "Barry Song's projects",
};

const Projects = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) => {
  const { lng } = await params;
  return (
    <DefaultLayout isScroll={false}>
      <div className="space-y-8">
        <div className="flex items-center justify-between container mx-auto px-6 2xl:px-0 ">
          <SectionHeader
            title={"Projects"}
            className={cn(
              "pl-0",
              "motion-scale-in-[0.37] motion-opacity-in-[0%]"
            )}
          />
        </div>
        {children}
      </div>
    </DefaultLayout>
  );
};

export default Projects;
