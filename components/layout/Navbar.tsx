"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useRef, useEffect, useState, Suspense } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/app/(app)/i18n/client";
import { TimeWeather } from "./TimeWeather";

interface NavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  itemKey: string;
  onItemClick: (key: string) => void;
}

function NavItem({
  href,
  children,
  className,
  isActive,
  itemKey,
  onItemClick,
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
      onClick={() => onItemClick(itemKey)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [activeItemRect, setActiveItemRect] = useState<{
    width: number;
    left: number;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const updateActiveRect = (itemKey?: string) => {
    // If itemKey is provided, use it; otherwise extract from pathname
    const currentPath =
      itemKey !== undefined ? itemKey : pathname.split("/")[2] || "";

    // Set the active item
    setActiveItem(currentPath);

    // Find the active link element
    let selector =
      currentPath === ""
        ? `a[href="/${lng}"]`
        : `a[href="/${lng}/${currentPath}"]`;

    const activeLink = navRef.current?.querySelector(selector);

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

  const handleItemClick = (key: string) => {
    setActiveItem(key);
    // Use setTimeout to ensure the DOM has updated before measuring
    setTimeout(() => updateActiveRect(key), 0);
  };

  useEffect(() => {
    // Initialize active item based on current path
    const currentPath = pathname.split("/")[2] || "";
    setActiveItem(currentPath);

    // 等待下一帧以确保DOM完全更新
    requestAnimationFrame(() => {
      updateActiveRect();
    });
  }, []);

  useEffect(() => {
    // Update active item when pathname changes (for navigation not triggered by clicks)
    const currentPath = pathname.split("/")[2] || "";
    if (activeItem !== currentPath) {
      updateActiveRect();
    }
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => updateActiveRect());

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", () => updateActiveRect());
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-[99] w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90",
        "motion-translate-x-in-[0%] motion-translate-y-in-[-36%] motion-opacity-in-[0%] motion-ease-spring-snappy",
        scrolled && "border-b border-border/40 shadow-sm"
      )}
    >
      <div className="mx-auto container px-5 sm:px-0">
        <div className="flex h-14 items-center justify-between">
          <TimeWeather lng={lng} />
          <nav
            ref={navRef}
            className="flex items-center space-x-6 text-sm font-medium relative"
          >
            <NavItem
              href={`/${lng}`}
              isActive={activeItem === ""}
              itemKey=""
              onItemClick={handleItemClick}
            >
              {t("common.nav.home")}
            </NavItem>
            <NavItem
              href={`/${lng}/blogs`}
              isActive={activeItem === "blogs"}
              itemKey="blogs"
              onItemClick={handleItemClick}
            >
              {t("common.nav.blog")}
            </NavItem>
            <NavItem
              href={`/${lng}/projects`}
              isActive={activeItem === "projects"}
              itemKey="projects"
              onItemClick={handleItemClick}
            >
              {t("common.nav.projects")}
            </NavItem>
            <NavItem
              href={`/${lng}/about`}
              isActive={activeItem === "about"}
              itemKey="about"
              onItemClick={handleItemClick}
            >
              {t("common.nav.about")}
            </NavItem>
            <Suspense>
              <LanguageSelector />
            </Suspense>
            {activeItemRect && (
              <motion.div
                className="absolute bottom-0 !m-0 h-[2px] bg-foreground origin-center"
                initial={{
                  width: 0,
                  x: activeItemRect.left + activeItemRect.width / 2,
                  opacity: 0,
                }}
                animate={{
                  width: activeItemRect.width,
                  x: activeItemRect.left,
                  opacity: 1,
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
