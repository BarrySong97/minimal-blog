import { Metadata } from "next";
import { prefetchQueries } from "@/components/tanstack/tanstack-server";
import { journalService } from "@/service/journal";
import { queryKeys } from "@/service/config";
import { HydrationBoundary } from "@tanstack/react-query";

export const metadata: Metadata = {
  title: "Journal",
  description: "Barry Song's journal, share his thoughts and experiences.",
};

export default async function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Prefetch initial journal list
  const state = await prefetchQueries([
    {
      queryKey: [...queryKeys.journals.list, 1],
      queryFn: () => journalService.getJournals({ page: 1, limit: 10 }),
    },
  ]);

  return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
