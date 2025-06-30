"use client";
import "payloadcms-lexical-ext/client/client.css";
import { aboutService } from "@/service/about";
import { queryKeys } from "@/service/config";
import { useQuery } from "@tanstack/react-query";
import { FC, useCallback, useState } from "react";
import { RichTextContext } from "../common/richtext/context";
import { IContext } from "../common/richtext/context";
import { AddHeading } from "../common/richtext/context";
import { Heading } from "../common/richtext/context";
import {
  JSXConvertersFunction,
  RichText,
} from "@payloadcms/richtext-lexical/react";
import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { CustomUploadComponent } from "../blogs/detail/Content";
import { Heading as HeadingComponent } from "@/components/common/richtext/Heading";
import { JSXConverters } from "payloadcms-lexical-ext";
export interface AboutContentProps {}

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
      ...JSXConverters,
      upload: ({ node }) => {
        return <CustomUploadComponent node={node} />;
      },
    };
  };
const AboutContent: FC<AboutContentProps> = () => {
  const { data: about } = useQuery({
    queryKey: queryKeys.about,
    queryFn: aboutService.getAbout,
  });
  if (!about) {
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
    <div className="max-w-4xl mx-auto prose prose-md !text-primary ">
      <RichTextContext.Provider value={context}>
        <RichText
          converters={jsxConverters({ toc: false })}
          data={about?.content as unknown as any}
        />
      </RichTextContext.Provider>
    </div>
  );
};

export default AboutContent;
