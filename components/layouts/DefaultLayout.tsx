import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

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
  return (
    <main
      className={cn(
        "h-screen container mx-auto px-6 py-8 2xl:px-0 md:py-8 2xl:py-16 ",
        isScroll ? "overflow-auto" : "overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
}
