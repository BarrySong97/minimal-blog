"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useEffect, useState, Suspense } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { useTranslation } from "@/app/(app)/i18n/client";
import { TimeWeather } from "./TimeWeather";
import { MobileNavbar } from "./MobileNavbar";
import { useResponsive } from "ahooks";
import { MobileLanguageSelector } from "./MobileLanguageSelector";
import { Link, useTransitionState } from "next-transition-router";
import { journalService } from "@/service/journal";
import { useQuery } from "@tanstack/react-query";

// Define a type for navigation items
interface NavItem {
  key: string;
  translationKey: string;
  href: (lng: string) => string;
}

// Create a navigation items array
const navItems: NavItem[] = [
  {
    key: "",
    translationKey: "common.nav.home",
    href: (lng) => `/${lng}`,
  },
  {
    key: "blogs",
    translationKey: "common.nav.blog",
    href: (lng) => `/${lng}/blogs`,
  },
  {
    key: "journal",
    translationKey: "common.nav.journal",
    href: (lng) => `/${lng}/journal`,
  },
  {
    key: "photos",
    translationKey: "common.nav.photos",
    href: (lng) => `/${lng}/photo`,
  },
  {
    key: "projects",
    translationKey: "common.nav.projects",
    href: (lng) => `/${lng}/projects`,
  },
  {
    key: "friends",
    translationKey: "common.nav.friends",
    href: (lng) => `/${lng}/friends`,
  },
  {
    key: "rewatch",
    translationKey: "common.nav.rewatch",
    href: (lng) => `/${lng}/rewatch`,
  },
  {
    key: "about",
    translationKey: "common.nav.about",
    href: (lng) => `/${lng}/about`,
  },
];

interface NavItemProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  isActive?: boolean;
  itemKey: string;
  onItemClick: (key: string) => void;
  onMouseEnter: (key: string) => void;
  onMouseLeave: () => void;
}

const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  (
    {
      href,
      children,
      className,
      isActive,
      itemKey,
      onItemClick,
      onMouseEnter,
      onMouseLeave,
    },
    ref
  ) => {
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
        onMouseEnter={() => onMouseEnter(itemKey)}
        onMouseLeave={onMouseLeave}
        ref={ref}
      >
        {children}
      </Link>
    );
  }
);

NavItem.displayName = "NavItem";

export function Navbar({ lng }: { lng: string }) {
  const { t } = useTranslation(lng);
  const pathname = usePathname();
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string>("");
  const [clickedItem, setClickedItem] = useState<string>("");
  const [activeItemRect, setActiveItemRect] = useState<{
    width: number;
    left: number;
  } | null>(null);
  const [hoveredItemRect, setHoveredItemRect] = useState<{
    width: number;
    left: number;
  } | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const navItemRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  // 使用 useResponsive 替代手动检测
  const responsive = useResponsive();

  const { data: latestJournal } = useQuery({
    queryKey: ["latest-journal"],
    queryFn: () => journalService.getLatestJournal(),
  });
  const journalHref = `/${lng}/journal/${latestJournal?.docs?.[0]?.slug}`;
  navItems[2].href = () => journalHref;
  const updateActiveRect = (itemKey?: string) => {
    // If itemKey is provided, use it; otherwise extract from pathname
    const currentPath =
      itemKey !== undefined ? itemKey : pathname.split("/")[2] || "";
    // Set the active item
    setActiveItem(currentPath);

    // Only update the indicator if not in mobile view
    if (!isMobile && navRef.current) {
      // Find the active link element
      let selector =
        currentPath === ""
          ? `a[href="/${lng}"]`
          : `a[href="/${lng}/${currentPath}"]`;
      if (currentPath === "journal") {
        selector = `a[href="${journalHref}"]`;
      }

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
    }
  };

  const updateHoveredRect = (key: string) => {
    if (!isMobile && navRef.current) {
      const navItem = navItemRefs.current.get(key);

      if (navItem) {
        const textNode = navItem.firstChild as Text;
        const range = document.createRange();
        range.selectNodeContents(textNode);
        const textRect = range.getBoundingClientRect();

        setHoveredItemRect({
          width: textRect.width,
          left: navItem.offsetLeft,
        });
      }
    }
  };

  const handleItemClick = (key: string) => {
    setClickedItem(key);
    setActiveItem(key);
    // Close mobile menu when an item is clicked
    setMobileMenuOpen(false);
    // Use setTimeout to ensure the DOM has updated before measuring
    setTimeout(() => updateActiveRect(key), 0);
  };

  const handleItemHover = (key: string) => {
    setHoveredItem(key);
    updateHoveredRect(key);
  };

  const handleItemLeave = () => {
    setHoveredItem("");
    setHoveredItemRect(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    // Initialize active item based on current path
    const currentPath = pathname.split("/")[2] || "";
    setActiveItem(currentPath);
    setClickedItem(currentPath);

    // 等待下一帧以确保DOM完全更新
    requestAnimationFrame(() => {
      updateActiveRect();
    });
  }, []);

  useEffect(() => {
    // Update active item when pathname changes (for navigation not triggered by clicks)
    const currentPath = pathname.split("/")[2] || "";
    if (activeItem !== currentPath) {
      setClickedItem(currentPath);
      updateActiveRect();
    }
    // Close mobile menu when navigating
    setMobileMenuOpen(false);
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

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 当响应式状态变化时更新指示器
  useEffect(() => {
    updateActiveRect();
  }, [responsive]);

  // Close mobile menu when escape key is pressed
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [mobileMenuOpen]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // 决定使用哪个指示器位置
  const showHoverIndicator =
    hoveredItem !== undefined && hoveredItem !== clickedItem;

  const { scrollY } = useScroll();
  const x = useTransform(scrollY, [0, 60], ["0", "100px"]);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsLargeScreen(window.innerWidth < 1680 && window.innerWidth >= 1512);
    setIsMobile(window.innerWidth < 768);
  }, []);
  const { stage } = useTransitionState();
  const isJournal = pathname.includes("journal");

  return (
    <header
      className={cn(
        "sticky top-0 z-[99] w-full ",
        "motion-translate-x-in-[0%] motion-translate-y-in-[-36%] motion-opacity-in-[0%] motion-ease-spring-snappy",
        scrolled && "border-b border-border/40 shadow-sm",
        stage === "none" || isJournal
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
          : ""
      )}
    >
      <div className="mx-auto container px-6 2xl:px-0">
        <div className="flex h-14 items-center justify-between">
          <TimeWeather lng={lng} isLargeScreen={isLargeScreen} />

          {/* Desktop Navigation */}
          <motion.nav
            ref={navRef}
            style={{ x: isLargeScreen ? x : "0" }}
            className={cn(
              "items-center space-x-6 text-sm font-medium relative hidden sm:flex"
            )}
          >
            {navItems.map((item) => (
              <NavItem
                key={item.key}
                href={item.href(lng)}
                isActive={activeItem === item.key}
                itemKey={item.key}
                onItemClick={handleItemClick}
                onMouseEnter={handleItemHover}
                onMouseLeave={handleItemLeave}
                ref={(el) => {
                  if (el) navItemRefs.current.set(item.key, el);
                }}
              >
                {t(item.translationKey)}
              </NavItem>
            ))}
            <Suspense>
              <LanguageSelector />
            </Suspense>

            {/* Active/Clicked Indicator */}
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

            {/* Hover Indicator */}
            {showHoverIndicator && hoveredItemRect && (
              <motion.div
                className="absolute bottom-0 !m-0 h-[2px] bg-foreground/60 origin-center"
                initial={{
                  width: 0,
                  x: hoveredItemRect.left + hoveredItemRect.width / 2,
                  opacity: 0,
                }}
                animate={{
                  width: hoveredItemRect.width,
                  x: hoveredItemRect.left,
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                }}
              />
            )}
          </motion.nav>

          {/* Mobile Navigation */}
          {isMobile && (
            <div className="flex items-center gap-2  sm:hidden">
              <MobileLanguageSelector />
              <MobileNavbar
                lng={lng}
                isOpen={mobileMenuOpen}
                onClose={toggleMobileMenu}
                activeItem={activeItem}
                onItemClick={handleItemClick}
                t={t}
                navItems={navItems}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
