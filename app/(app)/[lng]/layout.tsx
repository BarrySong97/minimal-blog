import { fallbackLng, languages } from "@/app/(app)/i18n/settings";
import { useTranslation } from "@/app/(app)/i18n";
import { dir } from "i18next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import TanstackProvider from "@/components/tanstack/TanstackProvider";
import { PageLoading } from "@/components/layout/PageLoading";
import { SakuraTree } from "@/components/common/flowers/SakuraTree";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Barry Song's blog",
    template: "%s | 4Real",
  },
  description: "Barry Song's blog, share his thoughts and experiences.",
  keywords: [
    "Barry Song",
    "Barry Song's blog",
    "Barry Song's website",
    "Barry Song's portfolio",
    "Barry Song's projects",
    "Barry Song's thoughts",
    "Barry Song's experiences",
    "Barry Song's life",
    "Barry Song's career",
    "Barry Song's skills",
  ],
  openGraph: {
    title: "4Real | Barry Song's blog",
    description: "Barry Song's blog, share his thoughts and experiences.",
    images: [
      {
        url: "/og.webp",
        width: 1200,
        height: 630,
        alt: "Site preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "4Real | Barry Song's blog",
    description: "Barry Song's blog, share his thoughts and experiences.",
    images: ["/og.webp"],
  },
  authors: [{ name: "4Real" }],
  creator: "4Real",
  publisher: "4Real",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
        className={`bg-background overflow-hidden  antialiased min-h-screen flex flex-col relative`}
      >
        <PageLoading />
        <TanstackProvider>
          <NuqsAdapter>
            <Navbar lng={lng} />
            {children}
          </NuqsAdapter>
        </TanstackProvider>
      </body>
    </html>
  );
}
