"use client";

import { Blog, Journal, Media } from "@/payload-types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Heading } from "@/components/common/richtext/context";
import "@/styles/shiki.css";
import "react-photo-view/dist/react-photo-view.css";
import BlogContent from "../blogs/detail/Content";
import { getHeadings, HeadingNode } from "../common/richtext/get-headings";
import { useEffect } from "react";
import { ImageWithFallback } from "../common/ImageWithFallback";
import { useTranslation } from "@/app/(app)/i18n/client";

interface JournalContentProps extends React.HTMLAttributes<HTMLDivElement> {
  journal: Journal | null;
  isLoading?: boolean;
  toc?: Map<string, Heading>;
  lng: string;
}

export function JournalContent({
  journal,
  isLoading,
  toc: initialToc,
  className,
  lng,
  ...props
}: JournalContentProps) {
  const headings = getHeadings(
    journal?.content?.root?.children as unknown as HeadingNode[]
  );
  const { t } = useTranslation(lng);
  useEffect(() => {
    // Remove overflow-hidden from body element
    document.body.classList.remove("overflow-hidden");

    // Cleanup function to restore overflow-hidden when component unmounts
    return () => {
      document.body.classList.add("overflow-hidden");
    };
  }, []);

  return (
    <div
      className={cn(
        className,
        "min-h-screen shadow-md border border-zinc-200/70"
      )}
      {...props}
    >
      {/* Hero Section with Background Image */}
      <div className="relative 2xl:h-[300px] shadow-md h-[200px] w-full overflow-hidden mb-0">
        <ImageWithFallback
          className="size-full object-cover "
          image={journal?.coverImage as Media}
          alt={journal?.title || ""}
          width={1000}
          height={600}
        />

        {/* Content overlay - positioned at bottom */}
        <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end items-start text-center px-8 pb-8">
          <h1 className="text-3xl  md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl leading-tight">
            {journal?.title}
          </h1>

          {/* Meta information */}
          <div className="flex flex-col sm:flex-row items-center gap-4 text-white/90">
            <div className="flex items-center gap-4">
              <time dateTime={journal?.date} className="text-sm">
                {format(new Date(journal?.date || ""), "yyyy年M月d日")}
              </time>

              {journal?.readingTime && (
                <>
                  <span className="text-white/60">·</span>
                  <span className="text-sm">
                    {journal?.readingTime} {t("common.blog.readingTime")}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-8">
        <BlogContent
          blog={journal as unknown as Blog}
          toc={
            new Map(headings.map((heading) => [heading.anchor, heading])) as any
          }
        />
      </div>
    </div>
  );
}
