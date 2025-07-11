"use client";

import { cn } from "@/lib/utils";
import { Journal } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";
import { journalService } from "@/service/journal";
import { queryKeys } from "@/service/config";
import { useState } from "react";
import Link from "next/link";

interface JournalListProps extends React.HTMLAttributes<HTMLDivElement> {
  lng: string;
  slug: string;
}

export function JournalList({
  // onJournalSelect,
  // selectedJournalId,
  className,
  slug,
  lng,
  ...props
}: JournalListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [...queryKeys.journals.list, currentPage],
    queryFn: () => journalService.getJournals({ page: currentPage, limit: 10 }),
  });

  const journals = data?.docs || [];

  if (isLoading) {
    return (
      <div className={cn("w-80 space-y-3", className)} {...props}>
        <div className="animate-pulse space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-6 bg-gray-200 dark:bg-gray-800 rounded" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(" space-y-4 w-full sticky top-[5rem]", className)}
      {...props}
    >
      <div className="space-y-1">
        {journals.map((journal) => (
          <div
            key={journal.id}
            title={journal.title}
            className={cn(
              "space-y-2 hover:bg-accent px-2 py-1",
              slug === journal.slug && "bg-accent"
            )}
          >
            <Link
              href={`/${lng}/journal/${journal.slug}`}
              className={cn("w-full text-left transition-colors duration-200")}
            >
              <h3 className="text-sm leading-relaxed truncate">
                {journal.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
