"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { Icon } from "@iconify/react";

interface MobileNavItemProps extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
  itemKey: string;
  onItemClick: (key: string) => void;
}

function MobileNavItem({
  href,
  children,
  className,
  isActive,
  itemKey,
  onItemClick,
  ...props
}: MobileNavItemProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-base py-3 w-full block transition-colors relative",
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

interface MobileNavbarProps {
  lng: string;
  isOpen: boolean;
  onClose: () => void;
  activeItem: string | null;
  onItemClick: (key: string) => void;
  t: (key: string) => string;
}

export function MobileNavbar({
  lng,
  isOpen,
  onClose,
  activeItem,
  onItemClick,
  t,
}: MobileNavbarProps) {
  return (
    <div className="block sm:hidden">
      {/* Mobile Menu Button */}
      <button
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-foreground flex"
        onClick={onClose}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        <Icon icon={isOpen ? "lucide:x" : "lucide:menu"} className="w-5 h-5" />
      </button>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-14 left-0 right-0 z-50 border-t border-border/40 bg-white shadow-lg"
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex flex-col space-y-1">
                <MobileNavItem
                  href={`/${lng}`}
                  isActive={activeItem === ""}
                  itemKey=""
                  onItemClick={onItemClick}
                >
                  {t("common.nav.home")}
                </MobileNavItem>
                <MobileNavItem
                  href={`/${lng}/blogs`}
                  isActive={activeItem === "blogs"}
                  itemKey="blogs"
                  onItemClick={onItemClick}
                >
                  {t("common.nav.blog")}
                </MobileNavItem>
                <MobileNavItem
                  href={`/${lng}/projects`}
                  isActive={activeItem === "projects"}
                  itemKey="projects"
                  onItemClick={onItemClick}
                >
                  {t("common.nav.projects")}
                </MobileNavItem>
                <MobileNavItem
                  href={`/${lng}/about`}
                  isActive={activeItem === "about"}
                  itemKey="about"
                  onItemClick={onItemClick}
                >
                  {t("common.nav.about")}
                </MobileNavItem>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
