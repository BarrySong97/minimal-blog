"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { SkillsPopover } from "./SkillsPopover";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import React from "react";
import { useTranslation } from "@/app/i18n/client";
import { useParams } from "next/navigation";

const socialLinks = [
  {
    name: "Twitter",
    icon: "fa6-brands:square-x-twitter",
    url: "https://twitter.com/your_handle",
  },
  {
    name: "Bilibili",
    icon: "ant-design:bilibili-filled",
    url: "https://space.bilibili.com/your_id",
  },
  {
    name: "Xiaohongshu",
    icon: "simple-icons:xiaohongshu",
    url: "https://www.xiaohongshu.com/user/your_id",
  },
] as const;

export function Profile() {
  const { lng } = useParams();
  const { t } = useTranslation(lng as string);
  return (
    <section className="flex items-start gap-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden"
      >
        <Image
          src="/avatar.jpeg"
          alt="Profile picture"
          fill
          className="object-cover"
          priority
        />
      </motion.div>

      <div className="space-y-6">
        <div className="space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-medium"
          >
            {t("common.home.name")}
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
          Exploring the world with coding. I do react, nextjs, typescript, I'm
          also learning ios and android development.
        </motion.p>

        <div className="flex items-center gap-4 mt-2">
          {socialLinks.map((social) => (
            <motion.a
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors duration-200 cursor-ne-resize"
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
