"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { JournalList } from "./JournalList";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/(app)/i18n/client";

interface JournalMobileDrawerProps {
  slug: string;
  lng: string;
}

export function JournalMobileDrawer({ slug, lng }: JournalMobileDrawerProps) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(lng);

  return (
    <div className="lg:hidden">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            className={cn(
              "fixed bottom-6 right-6 z-50",
              "w-12 h-12 rounded-full",
              "bg-primary text-primary-foreground",
              "shadow-lg hover:shadow-xl",
              "transition-all duration-200 hover:scale-110",
              "flex items-center justify-center"
            )}
            aria-label="Open journal list"
          >
            <Icon icon="mdi:format-list-bulleted" className="w-6 h-6" />
          </button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[80vh]">
          <DrawerHeader className="pb-4">
            <DrawerTitle>{t('common.nav.journal')}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-6">
            <JournalList slug={slug} lng={lng} />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}