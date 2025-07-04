"use client";
import React from "react";
import { DynamicCodeBlock } from "./dynamic-codeblock";

type Props = {
  code: string;
  language?: string;
  filename?: string;
};

export const Code: React.FC<Props> = ({ code, language = "", filename }) => {
  if (!code) return null;

  return (
    <DynamicCodeBlock
      lang={language}
      code={code}
      filename={filename}
      options={{
        themes: {
          light: "catppuccin-latte",
          dark: "catppuccin-mocha",
        },
      }}
    />
  );
};
