"use client";
import { experienceService } from "@/service";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { Media } from "@/payload-types";

import { motion } from "motion/react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { useTranslation } from "@/app/(app)/i18n/client";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export function Experience({ lng }: { lng: string }) {
  const { data: experiences } = useQuery({
    queryKey: queryKeys.experiences.all,
    queryFn: experienceService.getExperiences,
    staleTime: Infinity,
  });
  const { t } = useTranslation(lng);
  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-medium">{t("common.experience")}</h2>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {experiences?.docs.map((exp, index) => (
          <motion.div
            key={exp.company}
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.5,
                  ease: "easeOut",
                },
              },
            }}
            className="group space-y-2"
          >
            <div className="flex items-center justify-between">
              <a
                href={exp.companyWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base flex items-center gap-2 font-medium hover:underline transition-colors"
              >
                {exp.companyLogo && (
                  <ImageWithFallback
                    image={exp.companyLogo as Media}
                    alt={exp.company}
                    width={12}
                    height={12}
                  />
                )}

                <div className=" min-[1025px]:max-w-full min-[1024px]:max-w-[160px] truncate">
                  {exp.company}
                </div>
              </a>
              <span className="text-sm text-muted-foreground">
                {exp.period}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span className="flex items-end gap-1.5 text-xs">
                {exp.position}
              </span>
              <span className="flex items-end gap-1 text-xs">
                {exp.companyLocation}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
