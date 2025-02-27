"use client";
import { homeService } from "@/service";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { Icon } from "@iconify/react";

export function Experience() {
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
    staleTime: 5 * 60 * 1000,
  });
  const { experiences } = data ?? {};
  return (
    <section className="space-y-8">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-medium"
      >
        Work Experience
      </motion.h2>

      <div className="space-y-6">
        {experiences?.map((exp, index) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group space-y-1.5"
          >
            <div className="flex items-center justify-between">
              <a
                href={exp.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium hover:underline transition-colors"
              >
                {exp.company}
              </a>
              <span className="text-sm text-muted-foreground">
                {exp.period}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{exp.position}</span>
              <span className="flex items-center gap-1 text-xs">
                {exp.companyLocation}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
