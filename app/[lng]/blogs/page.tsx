import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import { BlogList } from "@/components/blogs/BlogList";
import { SectionHeader } from "@/components/ui/section-header";
import { useTranslation } from "@/app/i18n";
import { generateBlogPosts } from "@/lib/blog-data";
import { LayoutToggle } from "@/components/blogs/LayoutToggle";

export default async function Blogs({
  params: { lng },
}: {
  params: { lng: string };
}) {
  const { t } = await useTranslation(lng);
  const posts = generateBlogPosts(20);

  return (
    <DefaultLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <SectionHeader title={t("common.nav.blog")} />
          <LayoutToggle />
        </div>
        <BlogList posts={posts} />
      </div>
    </DefaultLayout>
  );
}
