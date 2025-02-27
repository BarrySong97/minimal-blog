import { Profile } from "@/components/home/Profile";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { queryKeys } from "@/service/config";
import { prefetchQuery } from "@/lib/tanstack-server";
import { homeService } from "@/service/home";
import { HydrationBoundary } from "@tanstack/react-query";

export default async function Home() {
  const dehydratedState = await prefetchQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
  });
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
