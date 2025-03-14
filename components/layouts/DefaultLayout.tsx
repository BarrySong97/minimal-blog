import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

interface DefaultLayoutProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DefaultLayout({
  children,
  className,
  ...props
}: DefaultLayoutProps) {
  return (
    <div className={cn("", className)} {...props}>
      <main className="container  mx-auto px-6 sm:px-0 xl:py-8 2xl:py-16 ">
        {children}
      </main>
    </div>
  );
}
