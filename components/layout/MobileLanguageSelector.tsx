"use client";

import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useSearchParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";

interface MobileLanguageItemProps {
  locale: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}

function MobileLanguageItem({
  locale,
  label,
  icon,
  isActive,
  onClick,
}: MobileLanguageItemProps) {
  const { t } = useLanguage();

  return (
    <motion.button
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex w-full items-center gap-3 px-2 py-3 text-base relative",
        "hover:text-foreground/80 text-foreground/60",
        "transition-colors duration-200",
        isActive && [
          "text-primary font-medium",
          "after:absolute after:inset-y-2 after:left-0 after:w-0.5 after:bg-primary",
        ]
      )}
      onClick={onClick}
    >
      {icon}
      {t(`language.${locale}`)}
    </motion.button>
  );
}

interface MobileLanguageSelectorProps {
  className?: string;
}

export function MobileLanguageSelector({
  className,
}: MobileLanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { languages, currentLocale, currentLanguage, switchLanguage } =
    useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  // Handle click outside to close the menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    // Add event listener when menu is open
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={cn("block sm:hidden relative", className)} ref={menuRef}>
      {/* Mobile Language Button */}
      <button
        className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background focus:ring-foreground flex items-center gap-2"
        onClick={toggleMenu}
        aria-label="Select language"
      >
        {currentLanguage?.icon}
      </button>

      {/* Mobile Language Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute top-12 right-0 z-50 w-48 border border-border/40 bg-white rounded-md shadow-lg overflow-hidden"
          >
            <div className="py-2">
              <div className="flex flex-col">
                {languages.map((lang) => (
                  <MobileLanguageItem
                    key={lang.locale}
                    locale={lang.locale}
                    label={lang.label}
                    icon={lang.icon}
                    isActive={currentLocale === lang.locale}
                    onClick={() => {
                      switchLanguage(lang.locale);
                      closeMenu();
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
