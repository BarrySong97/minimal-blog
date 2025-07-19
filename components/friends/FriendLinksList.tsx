"use client";
import { FriendLink } from "@/payload-types";
import React, { FC } from "react";
import FriendLinkCard from "./FriendLinkCard";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/(app)/i18n/client";

export interface FriendLinksListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  friendLinks: FriendLink[];
  lng: string;
}

const FriendLinksList: FC<FriendLinksListProps> = ({
  friendLinks,
  lng,
  className,
  ...props
}) => {
  const { t } = useTranslation(lng);
  if (!friendLinks || friendLinks.length === 0) {
    return (
      <div className={cn("text-center py-12", className)} {...props}>
        <p className="text-gray-500 dark:text-gray-400">
          {t("common.friends.noLinks")}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12",
        className
      )}
      {...props}
    >
      {friendLinks.map((friendLink) => (
        <FriendLinkCard key={friendLink.id} friendLink={friendLink} />
      ))}
    </div>
  );
};

export default FriendLinksList;
