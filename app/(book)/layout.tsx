import "./globals.css";

import { Metadata } from "next";
import { GlobalProviders } from "@/components/common/providers";

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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={"en"} className="bg-background">
      <body className={`bg-background overflow-hidden   relative`}>
        <GlobalProviders>{children}</GlobalProviders>
      </body>
    </html>
  );
}
