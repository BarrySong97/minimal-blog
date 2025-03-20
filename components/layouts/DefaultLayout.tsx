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
      console.log("isBlogDetail", pathname);
      console.log("isBlogDetail", isScroll && isBlogDetail);
      setIsBlogDetail(true);
    } else {
      setIsBlogDetail(false);
    }
  }, [pathname]);
  console.log("isBlogDetail", isScroll && isBlogDetail, isScroll, isBlogDetail);
  return (
    <main
      className={cn(
        "h-screen py-8 md:py-8 2xl:py-16",
        isScroll ? "overflow-auto" : "overflow-hidden",
        isBlogDetail ? "overflow-auto" : "",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
