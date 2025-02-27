"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SkillsPopover } from "./SkillsPopover";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "@/app/(app)/i18n/client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { homeService } from "@/service/home";
import { Media } from "@/payload-types";
import { experienceService, skillService } from "@/service";

export function Profile() {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
  const { home } = data ?? {};
  return (
    <section className="flex items-start gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden"
      >
        <img
          src={(home?.avatar as Media)?.url ?? ""}
          alt="Profile picture"
          className="object-cover w-full h-full"
        />
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-medium"
          >
            {home?.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            <SkillsPopover />
          </motion.p>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          {home?.description}
        </motion.p>

        <div className="flex items-center gap-4 mt-2">
          {home?.socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon
                icon={social.icon}
                className={cn(
                  "w-6 h-6",
                  social.name === "Twitter" && "w-[1.35rem] h-[1.35rem]"
                )}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
