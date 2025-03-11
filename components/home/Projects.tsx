"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { IcSharpArrowOutward } from "./icon";
interface Project {
  title: string;
  video: string;
  href: string;
}

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
  const projects: Project[] = [
    {
      title: "Motion Primitives Pro",
      video:
        "https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/newProfileItem/d898be8a-7037-4c71-af0c-8997239b050d.mp4?_a=DATAdtAAZAA0",
      href: "#",
    },
    {
      title: "Motion Primitives",
      video:
        "https://res.cloudinary.com/read-cv/video/upload/t_v_b/v1/1/profileItems/W2azTw5BVbMXfj7F53G92hMVIn32/XSfIvT7BUWbPRXhrbLed/ee6871c9-8400-49d2-8be9-e32675eabf7e.mp4?_a=DATAdtAAZAA0",
      href: "#",
    },
  ];

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
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.href}
            className="group block"
            variants={item}
          >
            <figure className="space-y-3">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                {/* <video
                  src={project.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                /> */}
              </div>
              <figcaption className="font-medium text-lg">
                {project.title}
              </figcaption>
            </figure>
          </motion.a>
        ))}
      </motion.div>
    </section>
  );
}
