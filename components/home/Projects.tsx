"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IcSharpArrowOutward } from "./icon";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { projectService } from "@/service/projects";
import ProjectItem from "../projects/ProjectItem";
import { Project } from "@/payload-types";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  show: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      duration: 0.5,
    },
  },
};

export function Projects() {
  const { data: projects } = useQuery({
    queryKey: queryKeys.projects.home,
    queryFn: projectService.getHomeProjects,
  });

  return (
    <section className="space-y-6">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-2xl font-medium flex items-end justify-between"
      >
        <div>Projects</div>
        <div className="text-base ">
          <Link
            href="/projects"
            className="flex items-center gap-1 hover:underline"
          >
            <div className="">View All</div>
            <IcSharpArrowOutward className="w-4 h-4" />
          </Link>
        </div>
      </motion.h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8"
      >
        {projects?.docs.map((project) => (
          <motion.div key={project.title} variants={item} className="block">
            <ProjectItem
              project={project as unknown as Project}
              href={project.href}
              className="rounded-lg"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
