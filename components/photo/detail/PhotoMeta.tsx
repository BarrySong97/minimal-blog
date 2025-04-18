"use clients";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { format } from "date-fns";
import { Media, Photo } from "@/payload-types";
import {
  DefaultNodeTypes,
  SerializedUploadNode,
} from "@payloadcms/richtext-lexical";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import React, { FC } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
export interface PhotoMetaProps {
  className?: string;
  photo: Photo;
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
      <ImageWithFallback
        alt={alt ?? "img"}
        height={height}
        image={uploadDoc as Media}
        width={width}
      />
    );
  }

  return null;
};

const jsxConverters: (args: {
  toc?: boolean;
}) => JSXConvertersFunction<DefaultNodeTypes> =
  () =>
  ({ defaultConverters }) => {
    return {
      ...defaultConverters,
      upload: ({ node }) => {
        return <CustomUploadComponent node={node} />;
      },
    };
  };
const PhotoMeta: FC<PhotoMetaProps> = ({ photo, className }) => {
  return (
    <div
      className={cn(
        "p-12 max-w-3xl flex flex-col justify-center h-full mx-auto",
        className
      )}
    >
      <div className="text-sm text-gray-600 line-clamp-2 mb-4 overflow-hidden">
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: "0%",
          }}
          transition={{
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          <span>{format(new Date(photo.createdAt), "yyyy-MM-dd")}</span>
          <span className=""> • </span>
          <span>{photo.location}</span>
        </motion.div>
      </div>
      <div className="text-3xl font-semibold overflow-hidden">
        <motion.div
          initial={{
            y: "100%",
          }}
          animate={{
            y: "0%",
          }}
          transition={{
            delay: 0.2,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >
          {photo.title}
        </motion.div>
      </div>
      <div className="prose prose-md !text-primary ">
        <motion.div
          initial={{ maskPosition: "0% 100%" }}
          style={{
            transform: "none",
            maskClip: "border-box",
            maskComposite: "xor",
            maskImage:
              "linear-gradient(180deg, #000, #000 15%, transparent 30%)",
            maskMode: "match-source",
            maskOrigin: "border-box",
            maskRepeat: "revert",
            maskSize: "100% 800%",
          }}
          whileInView={{ maskPosition: "0% 0%" }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          <RichText
            converters={jsxConverters({})}
            data={photo?.content as unknown as any}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default PhotoMeta;
