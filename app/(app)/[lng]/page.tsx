import { Profile } from "@/components/home/Profile";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { queryKeys } from "@/service/config";
import { prefetchQueries } from "@/components/tanstack/tanstack-server";
import { homeService } from "@/service/home";
import { HydrationBoundary } from "@tanstack/react-query";
import { projectService } from "@/service/projects";
import { experienceService } from "@/service/experiences";
import { skillService } from "@/service/skills";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";

export default async function Home({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const dehydratedState = await prefetchQueries([
    {
      queryKey: queryKeys.home,
      queryFn: homeService.getHome,
    },
    {
      queryKey: queryKeys.projects.all,
      queryFn: projectService.getHomeProjects,
    },
    {
      queryKey: queryKeys.experiences.all,
      queryFn: experienceService.getExperiences,
    },
    {
      queryKey: queryKeys.skills.all,
      queryFn: skillService.getSkills,
    },
    {
      queryKey: queryKeys.skillCategories.all,
      queryFn: skillService.getSkillCategories,
    },
    {
      queryKey: queryKeys.projects.home,
      queryFn: projectService.getHomeProjects,
    },
  ]);
  return (
    <HydrationBoundary state={dehydratedState}>
      <DefaultLayout className="px-6 min-h-screen 2xl:px-0 container mx-auto">
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
}
