"use client";
import { FriendLink, Media } from "@/payload-types";
import Link from "next/link";
import React, { FC } from "react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "../common/ImageWithFallback";

export interface FriendLinkCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  friendLink: FriendLink;
}

const FriendLinkCard: FC<FriendLinkCardProps> = ({
  friendLink,
  className,
  ...props
}) => {
  const avatarUrl =
    friendLink.avatar && typeof friendLink.avatar === "object"
      ? (friendLink.avatar as Media).url
      : null;

  return (
    <div
      className={cn(
        "group relative bg-white dark:bg-gray-800 transition-all duration-300 overflow-hidden",
        className
      )}
      {...props}
    >
      <Link
        href={friendLink.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="flex items-start space-x-4">
          {/* Avatar */}
          <div className="flex-shrink-0">
            {avatarUrl ? (
              <ImageWithFallback
                image={friendLink.avatar as Media}
                alt={friendLink.name}
                width={48}
                height={48}
                enableTransition={true}
                className="w-12 h-12  object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                {friendLink.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 truncate">
              {friendLink.name}
            </h3>

            {friendLink.description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                {friendLink.description}
              </p>
            )}

            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400 truncate">
              {friendLink.url.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </div>
          </div>
        </div>

        {/* Hover effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </Link>
    </div>
  );
};

export default FriendLinkCard;
