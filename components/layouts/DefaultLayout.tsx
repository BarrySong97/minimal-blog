"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { useEffect, useState, type HTMLAttributes } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  isScroll?: boolean;
}

export function DefaultLayout({
  children,
  className,
  isScroll = true,
  ...props
}: DefaultLayoutProps) {
  const pathname = usePathname();
  const [isBlogDetail, setIsBlogDetail] = useState(false);
  useEffect(() => {
    if (pathname.includes("/blogs/")) {
      setIsBlogDetail(true);
    } else {
      setIsBlogDetail(false);
    }
  }, [pathname]);
  return (
    <main
      className={cn(
        "py-8 md:py-8 2xl:py-16",
        isBlogDetail
          ? "px-6 2xl:px-0"
          : isScroll
          ? "overflow-auto"
          : "overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
