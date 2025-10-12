import { MetadataRoute } from "next";
import { blogService } from "@/service/blogs";
import { Blog } from "@/payload-types";

const siteUrl = process.env.DOMAIN_URL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 静态页面
  const staticRoutes = ["", "/blogs"];
  const staticUrls: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : 0.8,
  }));

  // 动态页面 (博客)
  try {
    const { docs: blogs } = await blogService.getBlogs({
      limit: 0,
      status: "published",
    });
    const blogUrls: MetadataRoute.Sitemap = (blogs as Blog[]).map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: new Date(blog.updatedAt),
      changeFrequency: "weekly",
      priority: 0.5,
    }));
    return [...staticUrls, ...blogUrls];
  } catch (error) {
    return [];
  }
}
