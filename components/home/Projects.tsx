"use client";
import { motion } from "framer-motion";

interface Project {
  title: string;
  video: string;
  href: string;
}

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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-medium"
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.a
            key={project.title}
            href={project.href}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group block"
          >
            <figure className="space-y-3">
              <div className="aspect-[4/3] overflow-hidden rounded-lg bg-muted">
                <video
                  src={project.video}
                  muted
                  autoPlay
                  loop
                  playsInline
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <figcaption className="font-medium text-lg">
                {project.title}
              </figcaption>
            </figure>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
