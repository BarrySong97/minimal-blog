"use client";

import { ProcessedHeading } from "@/components/common/richtext/get-headings";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface JournalTocProps extends React.HTMLAttributes<HTMLDivElement> {
  headings: ProcessedHeading[];
}

export function JournalToc({ headings, className, ...props }: JournalTocProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0% -70% 0%",
        threshold: 0,
      }
    );

    const headingElements = headings
      .map((heading) => document.getElementById(heading.anchor))
      .filter(Boolean);

    headingElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      headingElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    anchor: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      const yOffset = -80; // Adjust this value based on your header height
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveId(anchor);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className={cn("sticky top-24", className)} {...props}>
      <nav className="w-64">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4">
          On this page
        </h3>
        <ul className="space-y-2 text-sm">
          {headings.map((heading) => {
            const isActive = activeId === heading.anchor;
            const isH3 = heading.tag === "h3";

            return (
              <li key={heading.anchor} className={cn(isH3 && "ml-4")}>
                <a
                  href={`#${heading.anchor}`}
                  onClick={(e) => handleClick(e, heading.anchor)}
                  className={cn(
                    "block py-1 px-3 -ml-3 rounded-md transition-colors duration-200",
                    "hover:bg-gray-100 dark:hover:bg-gray-800",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
