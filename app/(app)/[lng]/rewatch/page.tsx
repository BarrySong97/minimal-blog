import { FC } from "react";
import { RewatchItem } from "@/components/rewatch/RewatchScrollView";
import { RewatchGrid } from "@/components/rewatch/RewatchGrid";
import { Metadata } from "next";
import { rewatchService } from "@/service/rewatch";
import { Media } from "@/payload-types";
import { useTranslation } from "@/app/(app)/i18n";

export const metadata: Metadata = {
  title: "正在看 | Barry Song",
  description: "我想要重新观看和阅读的书籍、电影、电视剧清单",
  openGraph: {
    title: "正在看",
    description: "我想要重新观看和阅读的书籍、电影、电视剧清单",
  },
  twitter: {
    card: "summary",
    title: "正在看 | Barry Song",
    description: "我想要重新观看和阅读的书籍、电影、电视剧清单",
  },
};

interface RewatchPageProps {
  params: Promise<{ lng: string }>;
}

const RewatchPage: FC<RewatchPageProps> = async ({ params }) => {
  const { lng } = await params;
  const { t } = await useTranslation(lng);

  try {
    const data = await rewatchService.getAllRewatch();

    // Transform the data to match RewatchItem interface
    const rewatchItems: RewatchItem[] =
      data?.docs?.map((item: any) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        cover: item.cover as Media,
        link: item.link,
        type: item.type,
      })) || [];

    // Group items by type
    const groupedItems = rewatchItems.reduce((acc, item) => {
      if (!acc[item.type]) {
        acc[item.type] = [];
      }
      acc[item.type].push(item);
      return acc;
    }, {} as Record<string, RewatchItem[]>);

    return (
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">
            {t("common.rewatch.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {t("common.rewatch.description")}
          </p>
        </div>

        {/* Grouped Grid Layout */}
        <RewatchGrid groupedItems={groupedItems} lng={lng} />
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch rewatch data:", error);
    return (
      <div className="container mx-auto px-4 py-8 md:px-8 lg:px-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("common.rewatch.title")}
          </h1>
          <p className="text-gray-500">{t("common.rewatch.errorLoading")}</p>
        </div>
      </div>
    );
  }
};

export default RewatchPage;
