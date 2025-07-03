import { dir } from "i18next";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { PageLoading } from "@/components/layout/PageLoading";
import { Metadata } from "next";
import { GlobalProviders } from "@/components/common/providers";
import { Inter } from "next/font/google";
import Script from "next/script";
export const metadata: Metadata = {
  title: {
    default: "Barry Song's blog",
    template: "%s | 4Real · explore the world",
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
  verification: {
    google: "tddB2AD5Icy6qgVQwdDbcIXmfvpD4d3qsZLnpKaBmZc",
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
const font = Inter({ subsets: ["latin"] });

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
        className={`bg-background overflow-hidden  antialiased min-h-screen flex flex-col relative ${font.className}`}
      >
        <PageLoading />
        <GlobalProviders>
          <Navbar lng={lng} />
          {children}
        </GlobalProviders>
        <Script
          src="https://4realrybbit.zeabur.app/api/script.js"
          data-site-id="1"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
