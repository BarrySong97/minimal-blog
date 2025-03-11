import { Profile } from "@/components/home/Profile";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { queryKeys } from "@/service/config";
import { prefetchQueries } from "@/lib/tanstack-server";
import { homeService } from "@/service/home";
import { HydrationBoundary } from "@tanstack/react-query";
import { projectService } from "@/service/projects";
import { experienceService } from "@/service/experiences";
import { skillService } from "@/service/skills";

export default async function Home() {
  const dehydratedState = await prefetchQueries([
    {
      queryKey: queryKeys.home,
      queryFn: homeService.getHome,
    },
    {
      queryKey: queryKeys.projects.all,
      queryFn: projectService.getProjects,
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
  ]);
  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="space-y-16">
        <Profile />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-24">
          <Projects />
          <Experience />
        </div>
      </div>
    </HydrationBoundary>
  );
}
