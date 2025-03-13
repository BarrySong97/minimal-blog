"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { FC } from "react";
export interface LinkWithLocProps {
  href: string;
  children: React.ReactNode;
}
const LinkWithLoc: FC<LinkWithLocProps> = ({ href, children }) => {
  const { lng } = useParams();
  return <Link href={`/${lng}${href}`}>{children}</Link>;
};

export default LinkWithLoc;
