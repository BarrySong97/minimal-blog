"use client";
import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";

import {
  type JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { Heading as HeadingComponent } from "@/components/common/richtext/Heading";
import Image from "next/image";
import { Blog as BlogType } from "@/payload-types";
import {
  AddHeading,
  Heading,
  RichTextContext,
  IContext,
} from "@/components/common/richtext/context";
import React, { FC, useCallback, useState } from "react";
export interface BlogProps {
  blog?: BlogType;
  toc: Map<string, Heading>;
}
export const CustomUploadComponent: React.FC<{
  node: SerializedUploadNode;
}> = ({ node }) => {
  if (node.relationTo === "media") {
    const uploadDoc = node.value;
    if (typeof uploadDoc !== "object") {
      return null;
    }
    const { alt, height, url, width } = uploadDoc as any;
    return <Image alt={alt ?? "img"} height={height} src={url} width={width} />;
  }

  return null;
};
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!;
  if (typeof value !== "object") {
    throw new Error("Expected value to be an object");
  }
  const slug = value.slug;
  return relationTo === "posts" ? `/posts/${slug}` : `/${slug}`;
};

const jsxConverters: (args: {
  toc?: boolean;
}) => JSXConvertersFunction<DefaultNodeTypes> =
  ({ toc }) =>
  ({ defaultConverters }) => {
    if (defaultConverters.heading) {
      defaultConverters.heading = HeadingComponent as any;
    }
    return {
      ...defaultConverters,
      upload: ({ node }) => {
        return <CustomUploadComponent node={node} />;
      },
    };
  };

const BlogContent: FC<BlogProps> = ({ blog, toc: initialToc }) => {
  if (!blog) {
    return null;
  }
  const [toc, setTOC] = useState<Map<string, Heading>>(new Map());
  const addHeading: AddHeading = useCallback(
    (anchor, heading, type) => {
      if (!toc.has(anchor)) {
        const newTOC = new Map(toc);
        newTOC.set(anchor, { type, anchor, heading });
        setTOC(newTOC);
      }
    },
    [toc]
  );
  const context: IContext = {
    addHeading,
    toc: Array.from(toc).reverse(),
  };
  return (
    <div className="max-w-4xl  prose prose-md !text-primary ">
      <RichTextContext.Provider value={context}>
        <RichText
          converters={jsxConverters({ toc: !!initialToc })}
          data={blog?.content as unknown as any}
        />
      </RichTextContext.Provider>
    </div>
  );
};

export default BlogContent;
