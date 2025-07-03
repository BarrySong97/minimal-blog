import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string | React.ReactNode;
  className?: string;
}

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <h2
      className={cn(
        "text-3xl font-bold tracking-tight text-foreground/90",
        className
      )}
    >
      {title}
    </h2>
  );
}
