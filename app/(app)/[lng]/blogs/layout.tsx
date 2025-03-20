import { DefaultLayout } from "@/components/layouts/DefaultLayout";

export default async function Blogs({
  children,
  pathname,
}: {
  children: React.ReactNode;
  pathname: string;
}) {
  return <DefaultLayout isScroll={false}>{children}</DefaultLayout>;
}
