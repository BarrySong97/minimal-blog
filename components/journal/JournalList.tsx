"use client";

import { cn } from "@/lib/utils";
import { Journal } from "@/payload-types";
import { useQuery } from "@tanstack/react-query";
import { journalService } from "@/service/journal";
import { queryKeys } from "@/service/config";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface JournalListProps extends React.HTMLAttributes<HTMLDivElement> {
  onJournalSelect: (journal: Journal) => void;
  selectedJournalId?: number;
}

export function JournalList({
  onJournalSelect,
  selectedJournalId,
  className,
  ...props
}: JournalListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useQuery({
    queryKey: [...queryKeys.journals.list, currentPage],
    queryFn: () => journalService.getJournals({ page: currentPage, limit: 10 }),
  });

  const journals = data?.docs || [];

  // Adjust page when a journal is selected to keep it visible in the window
  useEffect(() => {
    if (selectedJournalId && data) {
      const selectedGlobalIndex = journals.findIndex(
        (j) => j.id === selectedJournalId
      );

      if (selectedGlobalIndex === -1 && data.hasNextPage) {
        setCurrentPage((prev) => prev + 1);
      } else if (selectedGlobalIndex === -1 && data.hasPrevPage) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    }
  }, [selectedJournalId, data, journals]);

  const handlePrevious = () => {
    if (data?.hasPrevPage) {
      setCurrentPage((prev) => Math.max(1, prev - 1));
    }
  };

  const handleNext = () => {
    if (data?.hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

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
    <div className={cn("w-80 space-y-4", className)} {...props}>
      <div className="space-y-4">
        {journals.map((journal) => (
          <div key={journal.id} className="space-y-2">
            <button
              onClick={() => onJournalSelect(journal)}
              className={cn(
                "w-full text-left transition-colors duration-200",
                "hover:text-blue-600 dark:hover:text-blue-400",
                selectedJournalId === journal.id
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-900 dark:text-gray-100"
              )}
            >
              <h3 className="font-medium text-base leading-relaxed">
                {journal.title}
              </h3>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
