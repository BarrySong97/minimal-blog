"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { IcSharpArrowOutward } from "./icon";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { projectService } from "@/service/projects";
import Image from "next/image";
import { Media } from "@/payload-types";

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

export function Projects() {
  const { data: projects } = useQuery({
    queryKey: queryKeys.projects.home,
    queryFn: projectService.getHomeProjects,
  });

  const project = projects?.docs[0];
  return (
    <section className="space-y-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid md:grid-cols-2 gap-8"
      >
        <div
          className={`bg-white  relative overflow-hidden shadow-sm aspect-square `}
        >
          <div className="absolute  left-0 right-0 flex justify-between items-start z-10">
            <div className="space-y-1">
              <div className=" font-bold">{project?.title}</div>
              <div className="text-xs text-gray-500">
                {project?.description}
              </div>
            </div>
            <Link
              href="https://apps.apple.com/cn/app/%E6%B5%81%E8%AE%B0flowm/id6748300092"
              target="_blank"
              className="flex items-center gap-1 hover:underline text-sm"
            >
              查看
              <IcSharpArrowOutward className="w-4 h-4" />
            </Link>
          </div>
          <Image
            src={(project?.home_cover! as Media)?.url ?? ""}
            fill
            alt={project?.title ?? ""}
            className="object-cover"
          />
        </div>
      </motion.div>
    </section>
  );
}
