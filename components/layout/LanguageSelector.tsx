"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";
import { CarbonLanguage } from "./icon";
import { useLanguage } from "@/hooks/useLanguage";

export function LanguageSelector() {
  const { languages, currentLocale, currentLanguage, switchLanguage, t } =
    useLanguage();

  return (
    <Popover
      trigger={
        <button
          className="inline-flex gap-2 items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground focus:outline-none"
          aria-label="Select language"
        >
          <CarbonLanguage className="h-5 w-5" />
          {currentLanguage?.icon}
        </button>
      }
      className="w-[200px] p-2 text-popover-foreground"
      offsetX={-20}
      offsetY={8}
    >
      <div className="grid gap-1">
        {languages.map((lang) => (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            key={lang.locale}
            className={cn(
              "flex w-full items-center gap-2  px-2 py-1.5 text-sm relative",
              "hover:bg-gray-100 hover:text-gray-900",
              "transition-colors duration-200",
              currentLocale === lang.locale
                ? [
                    "bg-primary/10 text-primary",
                    "rounded-r-md",
                    "after:absolute after:inset-y-0.5 after:left-0 after:w-0.5 after:bg-primary",
                  ]
                : "rounded-md"
            )}
            onClick={() => switchLanguage(lang.locale)}
          >
            {lang.icon}
            {t(`language.${lang.locale}`)}
          </motion.button>
        ))}
      </div>
    </Popover>
  );
}
