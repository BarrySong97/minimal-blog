"use client";
import { experienceService, homeService } from "@/service";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { Icon } from "@iconify/react";

export function Experience() {
  const { data: experiences } = useQuery({
    queryKey: queryKeys.experiences.all,
    queryFn: experienceService.getExperiences,
  });

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-medium">Work Experience</h2>

      <div className="space-y-6">
        {experiences?.docs.map((exp, index) => (
          <div key={exp.company} className="group space-y-1.5">
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
          </div>
        ))}
      </div>
    </section>
  );
}
