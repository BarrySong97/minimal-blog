"use client";
import { motion } from "motion/react";
import { SkillsPopover } from "./SkillsPopover";
import { cn } from "@/lib/utils";
import React from "react";
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
  MaterialSymbolsAttachEmail,
} from "./icon";
import { ImageWithFallback } from "../common/ImageWithFallback";

export function Profile() {
  const { data: home } = useQuery({
    queryKey: queryKeys.home,
    queryFn: () => homeService.getHome(),
    staleTime: Infinity,
  });
  const iconMap = {
    "fa6-brands:square-x-twitter": <Fa6BrandsSquareXTwitter />,
    "simple-icons:xiaohongshu": <SimpleIconsXiaohongshu />,
    "ant-design:bilibili-filled": <AntDesignBilibiliFilled />,
    "fa6-brands:square-github": <Fa6BrandsSquareGithub />,
    "material-symbols:attach-email": <MaterialSymbolsAttachEmail />,
  };
  return (
    <section className="flex flex-col sm:flex-row items-start gap-0 sm:gap-12">
      <div className="flex items-start gap-4">
        <ImageWithFallback
          image={home?.avatar as Media}
          alt="Profile picture"
          enableTransition={false}
          width={96}
          height={96}
          priority
          className={cn(
            "object-cover w-24 h-24 ",
            "motion-scale-in-[0.5] motion-opacity-in-[0%] motion-ease-spring-smooth"
          )}
        />
        <div className=" flex flex-col -mt-1 h-[96px] justify-between  sm:hidden">
          <div>
            <h1 className="mb-1 text-2xl font-medium">{home?.name}</h1>
            <p className="text-sm text-muted-foreground">
              {home?.short_description}
            </p>
          </div>

          <div className="flex items-center gap-2 mt-1">
            {home?.socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target={social.name === "Email" ? "_self" : "_blank"}
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
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-4 hidden sm:block">
          <h1 className="text-4xl font-medium">{home?.name}</h1>

          <SkillsPopover />
        </div>

        <div className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
          {home?.description}
        </div>

        <div className=" items-center gap-4 mt-2 hidden sm:flex">
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
