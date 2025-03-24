import React, { FC } from "react";

export interface LoadingProps {}

const Loading: FC<LoadingProps> = () => {
  return (
    <div className="mx-auto">
      <div className="flex gap-12 justify-center relative">
        <div className="max-w-4xl w-full">
          {/* Header Skeleton */}
          <div className="w-full mb-12">
            <div className="mx-auto container">
              <div className="flex justify-between items-end">
                <div className="flex flex-col justify-center">
                  {/* Title skeleton */}
                  <div className="h-9 w-[70%] bg-foreground/10 rounded-md animate-pulse mb-1"></div>

                  {/* Meta info skeleton */}
                  <div className="h-5 w-40 bg-foreground/10 rounded-md animate-pulse"></div>
                </div>

                {/* Back button skeleton */}
                <div className="flex items-center gap-1 h-9 w-24 bg-foreground/10 rounded-md animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className="space-y-6 mb-12">
            {/* Paragraph skeletons */}
            <div className="h-5 w-full bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-[90%] bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-[95%] bg-foreground/10 rounded-md animate-pulse"></div>

            {/* Image skeleton */}
            <div className="h-64 w-full bg-foreground/10 rounded-md animate-pulse"></div>

            {/* More paragraph skeletons */}
            <div className="h-5 w-full bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-[92%] bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-[88%] bg-foreground/10 rounded-md animate-pulse"></div>

            {/* Heading skeleton */}
            <div className="h-7 w-[60%] bg-foreground/10 rounded-md animate-pulse mt-8 mb-4"></div>

            {/* More paragraph skeletons */}
            <div className="h-5 w-full bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-[93%] bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-[97%] bg-foreground/10 rounded-md animate-pulse"></div>
          </div>
        </div>

        {/* Desktop TOC Skeleton */}
        <div className="hidden lg:block sticky top-8 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-5 w-24 bg-foreground/10 rounded-md animate-pulse"></div>
            <div className="h-5 w-5 rounded-full bg-foreground/10 animate-pulse"></div>
          </div>
          <div className="space-y-3 w-64">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-4 bg-foreground/10 rounded-md animate-pulse ${
                  i === 1
                    ? "w-full"
                    : i === 2
                    ? "w-[90%] ml-2"
                    : i === 3
                    ? "w-[85%] ml-2"
                    : i === 4
                    ? "w-[88%]"
                    : "w-[92%]"
                }`}
              ></div>
            ))}
          </div>
        </div>

        {/* Mobile TOC Skeleton - Fixed button */}
        <div className="block lg:hidden fixed right-4 bottom-4 z-50">
          <div className="h-12 w-12 rounded-full bg-foreground/10 animate-pulse flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-foreground/20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
