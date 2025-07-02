"use client";
import { useParams, useRouter } from "next/navigation";
import React, { FC } from "react";
export interface CdProps {}
const Cd: FC<CdProps> = () => {
  const navigate = useRouter();
  const { lng } = useParams<{ lng: string }>();
  return (
    <div
      className="underline text-lg cursor-pointer"
      onClick={() => navigate.push(`/${lng}/blogs`)}
    >
      cd..
    </div>
  );
};

export default Cd;
