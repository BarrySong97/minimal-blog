"use client";
import { useRouter } from "next/navigation";
import React, { FC } from "react";
export interface CdProps {}
const Cd: FC<CdProps> = () => {
  const navigate = useRouter();
  return (
    <div
      className="underline text-lg cursor-pointer"
      onClick={() => navigate.push(`/blogs`)}
    >
      cd..
    </div>
  );
};

export default Cd;
