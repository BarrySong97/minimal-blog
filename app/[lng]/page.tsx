import { Profile } from "@/components/home/Profile";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";

export default function Home() {
  return (
    <DefaultLayout>
      <div className="space-y-16">
        <Profile />
        <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-24">
          <Projects />
          <Experience />
        </div>
      </div>
    </DefaultLayout>
  );
}
