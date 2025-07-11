import { Journal } from "@/payload-types";
import { JournalList } from "@/components/journal/JournalList";
import { JournalContent } from "@/components/journal/JournalContent";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import Toc from "@/components/blogs/detail/Toc";
import MobileToc from "@/components/blogs/detail/MobileToc";
import { journalService } from "@/service/journal";

export default async function JournalPage({
  params,
}: {
  params: Promise<{ slug: string; lng: string }>;
}) {
  const { slug, lng } = await params;
  const journal = await journalService.getJournalBySlug(slug);
  const currentJournal = journal?.docs?.[0];
  const headings = currentJournal
    ? getHeadings(
        (currentJournal?.content?.root?.children as unknown as HeadingNode[]) ||
          []
      )
    : [];

  // Fetch the selected journal details
  // const { data: journalDetail, isLoading: isLoadingDetail } = ({
  //   queryKey: queryKeys.journals.bySlug(selectedJournal?.slug || ""),
  //   queryFn: () => journalService.getJournalBySlug(selectedJournal!.slug),
  //   enabled: !!selectedJournal?.slug,
  // });

  return (
    <div className="container mx-auto px-6 2xl:px-20 pt-8 pb-8 ">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-2">
          <JournalList slug={slug} lng={lng} className="mb-8" />
        </div>
        <main className="col-span-8">
          <JournalContent journal={currentJournal} />
        </main>
        <div className="hidden lg:block col-span-2 ">
          <Toc headings={headings} />
        </div>
      </div>
    </div>
  );
}
