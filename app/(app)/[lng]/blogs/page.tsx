import { BlogList } from "@/components/blogs/BlogList";
import { SectionHeader } from "@/components/ui/section-header";
import { useTranslation } from "@/app/(app)/i18n";
import { generateBlogPosts } from "@/lib/blog-data";
import { LayoutToggle } from "@/components/blogs/LayoutToggle";

export default async function Blogs({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { t } = await useTranslation(lng);
  const posts = generateBlogPosts(20);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <SectionHeader title={t("common.nav.blog")} className="pl-4" />
      </div>
      <BlogList posts={posts} />
    </div>
  );
}
