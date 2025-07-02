import { MetadataRoute } from "next";
import { blogService } from "@/service/blogs";
import { languages } from "@/app/(app)/i18n/settings";
import { Blog } from "@/payload-types";

const siteUrl = process.env.DOMAIN_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静态页面
  const staticRoutes = [
    "",
    "/about",
    "/blogs",
    "/projects",
    "/books",
    "/photo",
  ];
  const staticUrls: MetadataRoute.Sitemap = languages.flatMap((lng) =>
    staticRoutes.map((route) => ({
      url: `${siteUrl}/${lng}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1 : 0.8,
    }))
  );

  // 动态页面 (博客)
  try {
    const { docs: blogs } = await blogService.getBlogs({
      limit: 99,
      status: "published",
    });
    const blogUrls: MetadataRoute.Sitemap = (blogs as Blog[])
      .filter((blog) => blog.slug)
      .flatMap((blog) =>
        languages.map((lng) => ({
          url: `${siteUrl}/${lng}/blogs/${blog.slug}`,
          lastModified: new Date(blog.updatedAt),
          changeFrequency: "weekly",
          priority: 0.5,
        }))
      );
    return [...staticUrls, ...blogUrls];
  } catch (error) {
    return [];
  }
}
