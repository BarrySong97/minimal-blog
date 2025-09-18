"use client";
import React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { blogService, queryKeys } from "@/service";
import { useQuery } from "@tanstack/react-query";
import { ImageWithFallback } from "../common/ImageWithFallback";

interface ArticleCardProps {
  className?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ className = "" }) => {
  const { data } = useQuery({
    queryKey: queryKeys.blogs.latest,
    queryFn: blogService.getLatestBlog,
  });
  const blog = data?.docs[0];
  return (
    <div
      className={cn(
        "bg-white rounded-md aspect-square lg:row-span-2 p-6 text-black flex flex-col justify-between border border-gray-200 ",
        className
      )}
    >
      {/* Top badges */}
      <div className="flex justify-between items-start">
        <div className="flex-1 ">
          <div className="relative w-full h-[100px]">
            <ImageWithFallback
              image={blog?.coverImage!}
              alt={blog?.title!}
              fill
              className="object-cover rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="flex-1 flex flex-col justify-end mb-4 ">
        <h3 className=" font-bold leading-tight mb-2 truncate">
          {blog?.title}
        </h3>
        <p className="line-clamp-3 text-xs">{blog?.excerpt}</p>
      </div>

      {/* Bottom metadata */}
      <div className="space-y-1">
        <div className="text-sm text-gray-700">
          {format(new Date(blog?.date!), "MMM d, yyyy")}
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
