"use client";
import { homeService, queryKeys } from "@/service";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Fa6BrandsSquareGithub,
  AntDesignBilibiliFilled,
  Fa6BrandsSquareXTwitter,
  SimpleIconsXiaohongshu,
  MaterialSymbolsAttachEmail,
} from "../home/icon";
import { motion } from "motion/react";

interface ResumeCardProps {
  className?: string;
}

const ResumeCard: React.FC<ResumeCardProps> = ({ className = "" }) => {
  const { data } = useQuery({
    queryKey: queryKeys.home,
    queryFn: homeService.getHome,
  });
  const iconMap = {
    "fa6-brands:square-x-twitter": <Fa6BrandsSquareXTwitter />,
    "simple-icons:xiaohongshu": <SimpleIconsXiaohongshu />,
    "ant-design:bilibili-filled": <AntDesignBilibiliFilled />,
    "fa6-brands:square-github": <Fa6BrandsSquareGithub />,
    "material-symbols:attach-email": <MaterialSymbolsAttachEmail />,
  };
  return (
    <div
      className={`bg-white border border-gray-200  p-8 relative overflow-hidden md:col-span-2 lg:col-span-1 shadow-sm ${className}`}
    >
      <div className="relative z-10">
        {/* Header with accent line */}
        <div className="border-l-4 border-[#1F1F1F] pl-4 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {data?.name}
          </h1>
          <p className="text-lg text-gray-600">什么都会一点工程师</p>
        </div>

        {/* Contact Info with resume-style layout */}
        <div className="grid grid-cols-1 gap-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <span>524000659@qq.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span>微信 - BarrySong97</span>
          </div>
          <div className="flex items-center gap-2">
            <span>贵州, 贵阳</span>
          </div>
          <div className="flex items-center gap-4 mt-1">
            {data?.socialLinks.map((social) => (
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

        {/* Decorative accent */}
      </div>
    </div>
  );
};

export default ResumeCard;
