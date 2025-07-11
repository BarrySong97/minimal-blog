"use client";

import React, { useState } from "react";
import { toast } from "sonner";

export function CopyButton({
  code,
  language = "TypeScript",
  filename,
}: {
  code: string;
  language?: string;
  filename?: string;
}) {
  const [copied, setCopied] = useState(false);
  function updateCopyStatus() {
    if (!copied) {
      setCopied(() => true);
      toast("Code copied to clipboard!");
      setTimeout(() => setCopied(() => false), 5000);
    }
  }

  return (
    <div
      className={`w-full text-emerald-50/75 not-prose flex ${
        filename ? "justify-between" : "justify-end"
      } font-sans items-center flex-wrap  `}
    >
      {filename && <p>{filename}</p>}
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(code);
          updateCopyStatus();
        }}
        disabled={copied}
        className={`flex my-4 gap-4 ${
          !copied ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div
          className={`flex gap-2 items-center ${
            !copied ? "opacity-100" : "opacity-50"
          }`}
        >
          {language && !copied ? language : "copied!"}
          {copied ? "copied!" : "copy"}
        </div>
      </button>
    </div>
  );
}
