import { JournalList } from "@/components/journal/JournalList";
import { JournalContent } from "@/components/journal/JournalContent";
import {
  getHeadings,
  HeadingNode,
} from "@/components/common/richtext/get-headings";
import Toc from "@/components/blogs/detail/Toc";
import { journalService } from "@/service/journal";
import { JournalMobileDrawer } from "@/components/journal/JournalMobileDrawer";

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

  return (
    <>
      <div className="container mx-auto px-6 2xl:px-16 pt-8 pb-8 ">
        <div className="grid grid-cols-12 gap-8">
          <div className="hidden lg:block col-span-2">
            <JournalList slug={slug} lng={lng} className="mb-8" />
          </div>
          <main className="col-span-12 lg:col-span-8">
            <JournalContent lng={lng} journal={currentJournal} />
          </main>
          <div className="hidden lg:block col-span-2 ">
            <Toc headings={headings} />
          </div>
        </div>
      </div>
      <JournalMobileDrawer slug={slug} lng={lng} />
    </>
  );
}
