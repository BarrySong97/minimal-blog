import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Journal",
  description: "Barry Song's journal, share his thoughts and experiences.",
};

export default async function JournalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
