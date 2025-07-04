"use client";
import { CodeBlock, Pre } from "./codeblock";
import { cn } from "@/lib/utils";
import type {
  HighlightOptionsCommon,
  HighlightOptionsThemes,
} from "fumadocs-core/highlight";
import { useShiki } from "fumadocs-core/highlight/client";

const components = {
  pre(props) {
    return (
      <CodeBlock {...props} className={cn("my-0", props.className)}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    );
  },
} satisfies HighlightOptionsCommon["components"];

export function DynamicCodeBlock({
  lang,
  code,
  filename,
  options,
}: {
  lang: string;
  code: string;
  filename?: string;
  options?: Omit<HighlightOptionsCommon, "lang"> & HighlightOptionsThemes;
}) {
  const componentsWithTitle = {
    pre(props) {
      return (
        <CodeBlock
          {...props}
          className={cn("my-0", props.className)}
          title={filename}
        >
          <Pre>{props.children}</Pre>
        </CodeBlock>
      );
    },
  } satisfies HighlightOptionsCommon["components"];

  return useShiki(code, {
    lang,
    ...options,
    components: {
      ...(filename ? componentsWithTitle : components),
      ...options?.components,
    },
    withPrerenderScript: true,
  });
}
