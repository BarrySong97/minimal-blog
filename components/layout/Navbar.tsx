"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Popover } from "@/components/ui/Popover";
import { useTranslation } from "next-i18next";

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
}

function NavItem({
  href,
  children,
  className,
  isActive,
  ...props
}: NavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-sm transition-colors relative py-1",
        "hover:text-foreground/80 text-foreground/60",
        isActive && "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}

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

function LanguageSelector() {
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
              // router.locale === lang.locale && "bg-gray-100 text-gray-900"
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

export function Navbar() {
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const [activeItemRect, setActiveItemRect] = useState<{
    width: number;
    left: number;
  } | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const updateActiveRect = () => {
    const activeLink = navRef.current?.querySelector(`a[href="${pathname}"]`);
    if (activeLink && navRef.current) {
      const textNode = activeLink.firstChild as Text;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const textRect = range.getBoundingClientRect();

      setActiveItemRect({
        width: textRect.width,
        left: (activeLink as HTMLElement).offsetLeft,
      });
    }
  };

  useEffect(() => {
    // 等待下一帧以确保DOM完全更新
    requestAnimationFrame(() => {
      updateActiveRect();
    });
  }, []);

  useEffect(() => {
    updateActiveRect();
  }, [pathname]);

  useEffect(() => {
    window.addEventListener("resize", updateActiveRect);
    return () => window.removeEventListener("resize", updateActiveRect);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex h-14 items-center justify-end">
          <nav
            ref={navRef}
            className="flex items-center space-x-6 text-sm font-medium relative"
          >
            <NavItem href="/" isActive={pathname === "/"}>
              {t("nav.home")}
            </NavItem>
            <NavItem href="/blogs" isActive={pathname === "/blogs"}>
              {t("nav.blog")}
            </NavItem>
            <NavItem href="/projects" isActive={pathname === "/projects"}>
              {t("nav.projects")}
            </NavItem>
            <NavItem href="/about" isActive={pathname === "/about"}>
              {t("nav.about")}
            </NavItem>
            <LanguageSelector />
            {activeItemRect && (
              <motion.div
                className="absolute bottom-0 !m-0 h-[2px] bg-foreground"
                initial={false}
                animate={{
                  width: activeItemRect.width,
                  x: activeItemRect.left,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              />
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
