import { useTranslation } from "next-i18next";
import { usePathname, useSearchParams } from "next/navigation";
import { ReactNode } from "react";
import {
  TwemojiFlagChina,
  TwemojiFlagForFlagJapan,
  TwemojiFlagForFlagSouthKorea,
  TwemojiFlagUnitedKingdom,
} from "@/components/layout/icon";

export interface LanguageOption {
  locale: string;
  label: string;
  icon: ReactNode;
}

export const languages: LanguageOption[] = [
  {
    locale: "en",
    label: "English",
    icon: <TwemojiFlagUnitedKingdom className="h-5 w-5" />,
  },
  {
    locale: "zh",
    label: "中文",
    icon: <TwemojiFlagChina className="h-5 w-5" />,
  },
  {
    locale: "ja",
    label: "日本語",
    icon: <TwemojiFlagForFlagJapan className="h-5 w-5" />,
  },
  {
    locale: "ko",
    label: "한국어",
    icon: <TwemojiFlagForFlagSouthKorea className="h-5 w-5" />,
  },
];

export function useLanguage() {
  const { t } = useTranslation("common");
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get current locale from pathname
  const currentLocale = pathname.split("/")[1] || "en";
  const currentLanguage = languages.find(
    (lang) => lang.locale === currentLocale
  );

  const switchLanguage = (locale: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const redirectPath = `${pathname}${
      params.size ? "?" + params.toString() : ""
    }`;
    const path = redirectPath.replace(/^\/[a-z]{2}(-[A-Z]{2})?/, `/${locale}`);
    window.location.href = path;
  };

  return {
    languages,
    currentLocale,
    currentLanguage,
    switchLanguage,
    t,
  };
}
