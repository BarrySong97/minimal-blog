"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { Suspense, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

// Import the NavItem interface
interface NavItem {
  key: string;
  title: string;
  href: (lng: string) => string;
}

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
  navItems: NavItem[];
}

export function MobileNavbar({
  lng,
  isOpen,
  onClose,
  activeItem,
  onItemClick,
  t,
  navItems,
}: MobileNavbarProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="block sm:hidden" ref={menuRef}>
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
                {navItems.map((item) => (
                  <MobileNavItem
                    key={item.key}
                    href={item.href(lng)}
                    isActive={activeItem === item.key}
                    itemKey={item.key}
                    onItemClick={onItemClick}
                  >
                    {item.title}
                  </MobileNavItem>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
