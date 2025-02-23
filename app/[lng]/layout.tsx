import { Geist, Geist_Mono } from "next/font/google";
import { fallbackLng, languages } from "@/app/i18n/settings";
import { useTranslation } from "@/app/i18n";
import { dir } from "i18next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

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
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}>) {
  const { lng } = await params;
  return (
    <html lang={lng} dir={dir(lng)}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <NuqsAdapter>
          <Navbar />
          {children}
        </NuqsAdapter>
      </body>
    </html>
  );
}
