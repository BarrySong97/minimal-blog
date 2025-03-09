"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, Suspense } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/app/(app)/i18n/client";

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

export function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const pathname = usePathname();
  const [activeItemRect, setActiveItemRect] = useState<{
    width: number;
    left: number;
  } | null>(null);
  const navRef = useRef<HTMLElement>(null);

  const updateActiveRect = () => {
    const activeLink = navRef.current?.querySelector(
      `a[href="/${pathname.split("/")[2] ?? ""}"]`
    );

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
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90 ",
        "motion-translate-x-in-[0%] motion-translate-y-in-[-36%] motion-opacity-in-[0%] motion-ease-spring-snappy"
      )}
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-0">
        <div className="flex h-14 items-center justify-end">
          <nav
            ref={navRef}
            className="flex items-center space-x-6 text-sm font-medium relative"
          >
            <NavItem href="/" isActive={pathname === "/"}>
              {t("common.nav.home")}
            </NavItem>
            <NavItem href="/blogs" isActive={pathname === "/blogs"}>
              {t("common.nav.blog")}
            </NavItem>
            <NavItem href="/projects" isActive={pathname === "/projects"}>
              {t("common.nav.projects")}
            </NavItem>
            <NavItem href="/about" isActive={pathname === "/about"}>
              {t("common.nav.about")}
            </NavItem>
            <Suspense>
              <LanguageSelector />
            </Suspense>
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
