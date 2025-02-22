import { Profile } from "@/components/home/Profile";
import { Experience } from "@/components/home/Experience";
import { Projects } from "@/components/home/Projects";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container max-w-6xl mx-auto px-6 xl:px-0 py-12">
        <div className="space-y-16">
          <Profile />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr,1fr] gap-24">
            <Projects />
            <Experience />
          </div>
        </div>
      </main>
    </div>
  );
}
