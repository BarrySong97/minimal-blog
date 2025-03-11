"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SkillsPopover } from "./SkillsPopover";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "@/app/(app)/i18n/client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/service/config";
import { homeService } from "@/service/home";
import { Media } from "@/payload-types";
import {
  Fa6BrandsSquareGithub,
  Fa6BrandsSquareXTwitter,
  SimpleIconsXiaohongshu,
  AntDesignBilibiliFilled,
} from "./icon";

export function Profile() {
  const { lng } = useParams();
  const { data: home } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
    staleTime: Infinity,
  });
  const iconMap = {
    "fa6-brands:square-x-twitter": <Fa6BrandsSquareXTwitter />,
    "simple-icons:xiaohongshu": <SimpleIconsXiaohongshu />,
    "ant-design:bilibili-filled": <AntDesignBilibiliFilled />,
    "fa6-brands:square-github": <Fa6BrandsSquareGithub />,
  };
  return (
    <section className="flex items-start gap-12">
      <Image
        src={(home?.avatar as Media)?.url ?? ""}
        alt="Profile picture"
        width={96}
        height={96}
        priority
        className={cn(
          "object-cover w-24 h-24 rounded-lg",
          "motion-scale-in-[0.5] motion-opacity-in-[0%] motion-ease-spring-smooth"
        )}
      />

      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-medium">{home?.name}</h1>

          <SkillsPopover />
        </div>

        <div className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {home?.description}
        </div>

        <div className="flex items-center gap-4 mt-2">
          {home?.socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-2xl text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {iconMap[social.icon as keyof typeof iconMap]}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
