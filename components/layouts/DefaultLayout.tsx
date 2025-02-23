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
    <div className={cn("bg-background", className)} {...props}>
      <main className="container max-w-6xl mx-auto px-6 xl:px-0 pt-6">
        {children}
      </main>
    </div>
  );
}
