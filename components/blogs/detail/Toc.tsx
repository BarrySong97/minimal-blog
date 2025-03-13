"use client";
import { ProcessedHeading } from "@/components/common/richtext/get-headings";

import { cn } from "@/lib/utils";
import { useParams, usePathname } from "next/navigation";
import { FC } from "react";

export interface TocProps {
  headings: ProcessedHeading[];
  className?: string;
}

const Toc: FC<TocProps> = ({ headings, className }) => {
  const { lng } = useParams();
  const pathname = usePathname();
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(`#${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // 更新 URL，但不触发新的导航
    window.history.pushState({}, "", `${pathname}#${id}`);
  };
  return (
    <div className={cn("w-full sticky top-16", className)}>
      <div className="text-sm font-medium mb-2 relative">
        <span className="absolute -left-[2px] top-0 h-full w-[3px] bg-gray-900 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top rounded-full" />
        <div className="font-semibold">目录</div>
      </div>
      <nav className="space-y-2">
        {headings.map((heading, index) => (
          <a
            key={index}
            href={`#${heading.anchor}`}
            onClick={(e) => handleClick(e, heading.anchor)}
            className={cn(
              "block text-sm  hover:text-gray-900 transition-colors duration-200 relative group",
              {
                "pl-0": heading.level === 1,
                "pl-4": heading.level === 2,
                "pl-8": heading.level === 3,
              }
            )}
          >
            <span className="absolute -left-[2px] top-0 h-full w-[3px] bg-gray-900 scale-y-0 group-hover:scale-y-100 transition-transform duration-200 origin-top rounded-full" />
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Toc;
