import { Profile } from "@/components/home/Profile";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { queryKeys } from "@/service/config";
import { prefetchQueries } from "@/lib/tanstack-server";
import { homeService } from "@/service/home";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectService } from "@/service/projects";
import { experienceService } from "@/service/experiences";
import { skillService } from "@/service/skills";
import { getQueryClient } from "@/components/tanstack/get-query-client";

export default async function Home() {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery({
    queryKey: queryKeys.home,
    queryFn: () => homeService.getHome(),
  });
  void queryClient.prefetchQuery({
    queryKey: queryKeys.projects.all,
    queryFn: () => projectService.getProjects(),
  });
  void queryClient.prefetchQuery({
    queryKey: queryKeys.experiences.all,
    queryFn: () => experienceService.getExperiences(),
  });
  void queryClient.prefetchQuery({
    queryKey: queryKeys.skills.all,
    queryFn: () => skillService.getSkills(),
  });
  void queryClient.prefetchQuery({
    queryKey: queryKeys.skillCategories.all,
    queryFn: () => skillService.getSkillCategories(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
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
