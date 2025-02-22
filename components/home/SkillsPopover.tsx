"use client";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Popover } from "@/components/ui/Popover";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/i18n/client";

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
    { name: "PostgreSQL", icon: "skill-icons:postgresql-dark" },
    { name: "MongoDB", icon: "skill-icons:mongodb" },
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
        {Object.entries(skillsWithIcons).map(([category, items]) => (
          <div key={category}>
            <h3 className="font-medium mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(({ name, icon }) => (
                <motion.span
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={name}
                  className="px-2 py-1 rounded-md bg-muted text-sm flex items-center gap-1"
                >
                  <Icon icon={icon} />
                  {name}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Popover>
  );
}
