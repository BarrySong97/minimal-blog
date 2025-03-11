import { fallbackLng, languages } from "@/app/(app)/i18n/settings";
import { useTranslation } from "@/app/(app)/i18n";
import { dir } from "i18next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import TanstackProvider from "@/components/tanstack/TanstackProvider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>;
}) {
  let { lng } = await params;
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng);
  return {
    title: t("common.title"),
    content:
      "A playground to explore new Next.js 13/14/15 app directory features such as nested layouts, instant loading states, streaming, and component level data fetching.",
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)} className="bg-background">
      <body
        className={`bg-background antialiased min-h-screen flex flex-col relative overflow-autp`}
      >
        <TanstackProvider>
          <NuqsAdapter>
            <Navbar lng={lng} />
            <DefaultLayout>{children}</DefaultLayout>
          </NuqsAdapter>
        </TanstackProvider>
      </body>
    </html>
  );
}
