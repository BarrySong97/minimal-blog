import type {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";

import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText,
} from "@payloadcms/richtext-lexical/react";

import Image from "next/image";
import { Blog as BlogType } from "@/payload-types";

import React, { FC } from "react";
export interface BlogProps {
  blog?: BlogType;
}
const CustomUploadComponent: React.FC<{
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

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    return <CustomUploadComponent node={node} />;
  },
  ...LinkJSXConverter({ internalDocToHref }),
});

const BlogContent: FC<BlogProps> = ({ blog }) => {
  if (!blog) {
    return null;
  }
  return (
    <div className="max-w-4xl mx-auto prose prose-md !text-primary ">
      <RichText
        converters={jsxConverters}
        data={blog?.content as unknown as any}
      />
    </div>
  );
};

export default BlogContent;
