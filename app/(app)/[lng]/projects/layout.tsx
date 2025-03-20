import { cn } from "@/lib/utils";
import { SectionHeader } from "@/components/ui/section-header";
import React, { FC } from "react";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import Loading from "../loading";
export interface ProjectsProps {
  children: React.ReactNode;
}
const Projects: FC<ProjectsProps> = ({ children }) => {
  return (
    <DefaultLayout isScroll={false}>
      <div className="space-y-8">
        <div className="flex items-center justify-between container mx-auto px-6 2xl:px-0 ">
          <SectionHeader
            title={"项目"}
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
