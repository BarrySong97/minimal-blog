"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { ComponentProps } from "react";

export type LinkWithLocProps = ComponentProps<typeof Link>;

const LinkWithLoc: React.FC<LinkWithLocProps> = ({
  href,
  children,
  ...props
}) => {
  const { lng } = useParams();
  return (
    <Link href={`/${lng}${href}`} {...props}>
      {children}
    </Link>
  );
};

export default LinkWithLoc;
