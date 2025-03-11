"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog-data";
import { MaterialSymbolsArrowForwardRounded } from "./icon";
import { ViewHover } from "./ViewHover";
import { useRef, useState, useEffect, useTransition } from "react";
import { useMouse } from "ahooks";

interface BlogListProps extends React.HTMLAttributes<HTMLDivElement> {
  posts: BlogPost[];
}

export function BlogList({ posts, className, ...props }: BlogListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouse = useMouse(ref.current);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [_, startTransition] = useTransition();
  return (
    <div
      className={cn("grid grid-cols-1 xl:grid-cols-2 gap-8", className)}
      ref={ref}
      {...props}
    >
      {posts.map((post) => (
        <div key={post.slug + post.id} className="group relative">
          <Link
            key={post.slug + post.id}
            onMouseEnter={() => {
              setHoverId(post.id);
            }}
            onMouseLeave={() => {
              setHoverId(null);
            }}
            href={`/blog/${post.slug}`}
            className="group relative flex  h-[400px] flex-row overflow-hidden  border   shadow-sm transition-all duration-300 hover:shadow-purple-200/20 hover:shadow-lg hover:-translate-y-1 backdrop-blur-sm"
          >
            <ViewHover isHover={hoverId === post.id} trackMouse />

            <div className="aspect-[16/9] md:aspect-[4/3] w-1/2 overflow-hidden relative">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={800}
                className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
              <div
                className={cn(
                  " absolute bottom-0 right-0 bg-primary z-50 py-2  text-white text-sm px-4 ",
                  "motion-scale-in-[0.5] motion-opacity-in-[0%]",
                  "flex items-center gap-2",
                  "hidden group-hover:flex"
                )}
              >
                <span>Read More</span>
                <MaterialSymbolsArrowForwardRounded className="w-4 h-4" />
              </div>
            </div>
            <div className="flex flex-1 flex-col justify-between px-6 py-0  relative">
              <div className="flex items-center gap-3 mb-4 absolute top-4 right-4 text-sm">
                <span className="">{post.date}</span>
                <span className="">•</span>
                <span className="">{post.readingTime}</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="flex-1 relative z-10 flex flex-col justify-between">
                <div></div>
                <h3 className="text-xl font-semibold leading-tight text-gray-900  transition-colors duration-300 mb-4">
                  {post.title}
                </h3>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
