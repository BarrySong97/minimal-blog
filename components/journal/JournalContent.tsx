"use client";

import { Journal, Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import { RichText } from "@payloadcms/richtext-lexical/react";
import jsxConverters from "@/components/common/richtext/jsx-converter";
import { HeadingNode } from "@/components/common/richtext/get-headings";
import { format } from "date-fns";
import { useEffect } from "react";
import {
  RichTextContext,
  IContext,
  Heading,
  AddHeading,
} from "@/components/common/richtext/context";
import { useState, useCallback } from "react";
import "@/styles/shiki.css";
import "react-photo-view/dist/react-photo-view.css";
import { PhotoProvider } from "react-photo-view";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface JournalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  journal: Journal | null;
  isLoading?: boolean;
  toc?: Map<string, Heading>;
}

export function JournalContent({
  journal,
  isLoading,
  toc: initialToc,
  className,
  ...props
}: JournalContentProps) {
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

  // Reset scroll position when journal changes
  useEffect(() => {
    if (journal) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [journal?.id]);

  if (isLoading) {
    return (
      <div className={cn("", className)} {...props}>
        <div className="animate-pulse space-y-8">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg w-1/4" />
          </div>
          <div className="space-y-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-4 bg-gray-200 dark:bg-gray-800 rounded-lg"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!journal) {
    return (
      <div className={cn("", className)} {...props}>
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
          <p className="text-lg">Select a journal entry to read</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("", className)} {...props}>
      {/* Hero Section with Background Image */}
      <div className="relative 2xl:h-[300px] h-[200px] w-full overflow-hidden mb-12">
        <div
          className="size-full rounded-[var(--ifm-pagination-nav-border-radius)] bg-cover bg-center bg-no-repeat"
          style={{
            maskImage:
              "linear-gradient(rgb(255, 255, 255) 0%, rgb(255, 255, 255) 60%, rgba(0, 0, 0, 0) 100%)",
            backgroundImage: `url(${
              (journal?.coverImage as Media)?.sizes?.card?.url
            })`,
          }}
        ></div>
        {/* <ImageWithFallback
          image={journal?.coverImage as Media}
          alt={journal?.title || ""}
          width={1000}
          height={600}
          className="w-full h-full object-cover"
        /> */}

        {/* Bottom gradient overlay */}
        {/* <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" /> */}

        {/* Content overlay - positioned at bottom */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end items-start text-center px-8 pb-8">
          <h1 className="text-3xl  md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
            {journal.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/90">
            <div className="flex items-center gap-4">
              <time dateTime={journal.date} className="text-sm">
                {format(new Date(journal.date), "yyyy年M月d日")}
              </time>

              {journal.readingTime && (
                <>
                  <span className="text-white/60">·</span>
                  <span className="text-sm">阅读需 {journal.readingTime}</span>
                </>
              )}
            </div>

            {journal.tags && journal.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {journal.tags.map(
                  (tag, index) =>
                    tag?.tag && (
                      <span
                        key={tag.id || index}
                        className="px-3 py-1 text-xs font-medium bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-full"
                      >
                        {tag.tag}
                      </span>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <RichTextContext.Provider value={context}>
          <PhotoProvider>
            <RichText
              converters={jsxConverters({ toc: !!initialToc })}
              data={journal?.content as unknown as any}
            />
          </PhotoProvider>
        </RichTextContext.Provider>
      </article>
    </div>
  );
}
