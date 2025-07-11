import { Journal } from "@/payload-types";
import { JournalList } from "@/components/journal/JournalList";
import { JournalContent } from "@/components/journal/JournalContent";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import Toc from "@/components/blogs/detail/Toc";
import MobileToc from "@/components/blogs/detail/MobileToc";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string; lng: string }>;
}) {
  const { slug, lng } = await params;

  // Fetch the selected journal details
  // const { data: journalDetail, isLoading: isLoadingDetail } = ({
  //   queryKey: queryKeys.journals.bySlug(selectedJournal?.slug || ""),
  //   queryFn: () => journalService.getJournalBySlug(selectedJournal!.slug),
  //   enabled: !!selectedJournal?.slug,
  // });

  return (
    <div className="container mx-auto px-6 2xl:px-0 pt-8 ">
      <div className="flex gap-8 relative">
        {/* Middle: Content */}
        <main className="flex-1 min-w-0 ">
          {/* <JournalContent
            journal={currentJournal}
            isLoading={isLoadingDetail}
          /> */}
        </main>

        {/* Right: TOC */}

        <div className="hidden lg:block">
          {/* <Toc headings={headings} /> */}
        </div>
        <div className="block lg:hidden absolute">
          {/* <MobileToc headings={headings} /> */}
        </div>
      </div>

      {/* Mobile Journal List - Could be implemented as a drawer or modal */}
      <div className="lg:hidden">
        {/* <JournalList
          onJournalSelect={handleJournalSelect}
          selectedJournalId={selectedJournal?.id}
          className="mb-8"
        /> */}
      </div>
    </div>
  );
}
