"use client";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "payloadcms-lexical-ext/client/client.css";
import type { SerializedUploadNode } from "@payloadcms/richtext-lexical";

import { RichText } from "@payloadcms/richtext-lexical/react";
import { Blog as BlogType, Media } from "@/payload-types";
import {
  AddHeading,
  Heading,
  RichTextContext,
  IContext,
} from "@/components/common/richtext/context";
import React, { FC, useCallback, useState } from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import jsxConverters from "@/components/common/richtext/jsx-converter";
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
    return (
      <PhotoProvider>
        <PhotoView src={url}>
          <ImageWithFallback
            className="cursor-pointer"
            alt={alt ?? "img"}
            height={height}
            image={uploadDoc as Media}
            width={width}
            size="tablet"
          />
        </PhotoView>
      </PhotoProvider>
    );
  }

  return null;
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
    <div className=" md:max-w-md lg:max-w-2xl 2xl:max-w-4xl prose prose-md !text-primary">
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
