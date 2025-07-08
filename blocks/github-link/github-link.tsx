import { Icon } from "@iconify/react";
import React from "react";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { cn } from "@/lib/utils";

export interface GithubLinkProps {
  id?: string;
  blockType?: "github-link";
  url: string;
  processedUrl?: string;
  title?: string;
  description?: string;
  avatar?: string;
  stars?: number;
}
type Props = GithubLinkProps & { className?: string };

export const GithubLinkCard: React.FC<Props> = ({
  url,
  title,
  description,
  avatar,
  stars,
  className,
}) => {
  return (
    <div className="flex justify-center not-prose">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "flex items-center justify-between my-4 max-w-xs md:max-w-md lg:mx-w-xl 2xl:max-w-2xl gap-4",
          "border bg-slate-100/50 p-4 shadow-sm transition-shadow hover:shadow-md",
          className
        )}
      >
        <div className="flex flex-col items-end gap-2">
          {avatar && (
            <div className="h-12 w-12 flex-shrink-0">
              <img
                src={avatar}
                alt={title || "avatar"}
                width={48}
                height={48}
                className="object-cover"
              />
            </div>
          )}
        </div>
        <div className="flex-1 ">
          <div className="flex items-center justify-between">
            <div className="font-semibold truncate max-w-[250px]">{title}</div>
            <div className="hidden md:flex flex-shrink-0 items-center">
              <Icon icon="ph:star-duotone" className="text-orange-400" />
              <span className="ml-1 text-sm font-medium text-gray-800 dark:text-gray-300">
                {stars}
              </span>
            </div>
          </div>
          <p className=" truncate w-[230px] md:w-[300px]  text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        </div>
      </a>
    </div>
  );
};
