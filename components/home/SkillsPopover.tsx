"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Popover } from "@/components/ui/Popover";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/(app)/i18n/client";
import { homeService } from "@/service/home";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { skillService } from "@/service";
import React from "react";

const skillsWithIcons = {
  Frontend: [
    { name: "React", icon: "skill-icons:react-dark" },
    { name: "Next.js", icon: "skill-icons:nextjs-dark" },
    { name: "TypeScript", icon: "skill-icons:typescript" },
    { name: "Tailwind CSS", icon: "skill-icons:tailwindcss-dark" },
  ],
  Backend: [
    { name: "Node.js", icon: "skill-icons:nodejs-dark" },
    { name: "Nest.js", icon: "skill-icons:nestjs-dark" },
  ],
  Mobile: [
    { name: "iOS", icon: "skill-icons:swift" },
    { name: "Android", icon: "skill-icons:androidstudio-dark" },
  ],
  Others: [
    { name: "Git", icon: "skill-icons:git" },
    { name: "Docker", icon: "skill-icons:docker" },
    { name: "AWS", icon: "skill-icons:aws-light" },
    { name: "CI/CD", icon: "skill-icons:jenkins-light" },
  ],
};

export function SkillsPopover() {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const { skills, skillCategories: categories } = data ?? {};

  // Group skills by category
  const skillsByCategory = React.useMemo(() => {
    if (!skills || !categories) return {};
    return skills.reduce(
      (acc, skill) => {
        const category = categories.find(
          (cat) =>
            cat.id ===
            (typeof skill.category === "number"
              ? skill.category
              : skill.category.id)
        );
        if (category) {
          if (!acc[category.name]) {
            acc[category.name] = [];
          }
          acc[category.name].push(skill);
        }
        return acc;
      },
      {} as Record<string, typeof skills>
    );
  }, [skills, categories]);

  return (
    <Popover
      triggerClassName="inline-flex items-center gap-[2px]"
      className="w-[320px] p-4 text-popover-foreground"
      offsetX={-100}
      trigger={
        <>
          {t("common.home.full")}
          <span className="mt-[0.5px] cursor-pointer hover:!text-gray-500 underline decoration-dashed underline-offset-4">
            {t("common.home.stack")}
          </span>
          {t("common.home.engineer")}
        </>
      }
    >
      <div className="space-y-4">
        {categories?.map((category) => (
          <div key={category.id}>
            <h3 className="font-medium mb-2">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {skillsByCategory[category.name]?.map((skill) => (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={skill.id}
                  className="px-2 py-1 rounded-md bg-muted text-sm flex items-center gap-1"
                >
                  <Icon icon={skill.icon} />
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Popover>
  );
}
