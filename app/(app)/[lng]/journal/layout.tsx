import { DefaultLayout } from "@/components/layouts/DefaultLayout";

export default async function Blogs({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DefaultLayout id="blog-layout" isScroll={false}>
      {children}
    </DefaultLayout>
  );
}
