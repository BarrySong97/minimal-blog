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
import { RichText } from "@payloadcms/richtext-lexical/react";
import jsxConverters from "../common/richtext/jsx-converter";

export interface AboutContentProps {}

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
