"use client";

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useTranslation } from "next-i18next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover } from "@/components/ui/Popover";
import { cn } from "@/lib/utils";

interface LanguageOption {
  locale: string;
  label: string;
  icon: string;
}

const languages: LanguageOption[] = [
  { locale: "en", label: "English", icon: "emojione:flag-for-united-states" },
  { locale: "zh", label: "中文", icon: "emojione:flag-for-china" },
  { locale: "ja", label: "日本語", icon: "emojione:flag-for-japan" },
  { locale: "ko", label: "한국어", icon: "emojione:flag-for-south-korea" },
];

export function LanguageSelector() {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const switchLanguage = (locale: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const redirectPath = `${pathname}${
      params.size ? "?" + params.toString() : ""
    }`;
    const path = redirectPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, `/${locale}`);
    window.location.href = path;
  };

  return (
    <Popover
      trigger={
        <button
          className="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground focus:outline-none"
          aria-label="Select language"
        >
          <Icon icon="carbon:language" className="h-5 w-5" />
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
              "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm",
              "hover:bg-gray-100 hover:text-gray-900"
            )}
            onClick={() => switchLanguage(lang.locale)}
          >
            <Icon icon={lang.icon} className="h-4 w-4" />
            {t(`language.${lang.locale}`)}
          </motion.button>
        ))}
      </div>
    </Popover>
  );
}
