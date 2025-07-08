import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { format } from "date-fns";
import { zhCN } from "date-fns/locale";
import { Code } from "@/blocks/Code/config";
import { HotizontalImage } from "@/blocks/hotizental-image/config";
import { GithubLink } from "@/blocks/github-link/config";

export const Blog: CollectionConfig = {
  slug: "blogs",
  hooks: {
    beforeChange: [
      ({ data, originalDoc }) => {
        if (data.status === "published" && !originalDoc?.publishedDate) {
          data.publishedDate = format(new Date(), "yyyy-MM-dd HH:mm:ss", {
            locale: zhCN,
          });
        }
      },
    ],
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "date", "status"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "isBanner(已废弃)",
      type: "checkbox",
      hidden: true,
      required: false,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
    },
    {
      name: "ogImage",
      type: "upload",
      relationTo: "media",
      required: false,
    },
    {
      name: "date",
      type: "date",
      required: true,
      hooks: {
        beforeChange: [
          (args) => {
            if (args.operation == "create" && !args.value) {
              return new Date().getTime();
            }
          },
        ],
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "readingTime",
      type: "text",
      admin: {
        description: "Estimated reading time (e.g. '5 min read')",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      admin: {
        description: "URL-friendly version of the title",
      },
      hooks: {
        beforeValidate: [
          ({
            data,
            originalDoc,
          }: {
            data?: { title?: string; slug?: string };
            originalDoc?: { title?: string; slug?: string };
          }) => {
            if (data?.title && !data.slug) {
              return data.title.toLowerCase().replace(/\s+/g, "-");
            }
            return undefined;
          },
        ],
      },
    },
    {
      name: "coverImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "tags",
      type: "array",
      fields: [
        {
          name: "tag",
          type: "text",
        },
      ],
      admin: {
        description: "Add relevant tags for the blog post",
      },
    },
    {
      name: "prerequisites",
      type: "relationship",
      relationTo: "blogs",
      hasMany: true,
      admin: {
        description: "Related blog posts that should be read before this one",
      },
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        {
          label: "Draft",
          value: "draft",
        },
        {
          label: "Published",
          value: "published",
        },
      ],
    },
    {
      name: "content",
      type: "richText",
      required: true,
      hooks: {
        beforeChange: [
          async ({ data, req }) => {
            if (data?.content) {
              await Promise.all(
                data.content.root.children.map(async (block: any) => {
                  if (block?.fields?.blockType === "github-link") {
                    const { url, processedUrl } = block.fields;

                    // If the url is the same as the one we already processed, do nothing.
                    if (url && url === processedUrl) {
                      return block;
                    }

                    // If URL is empty or cleared, clear related fields
                    if (!url) {
                      return {
                        ...block,
                        title: null,
                        description: null,
                        avatar: null,
                        stars: null,
                        processedUrl: null,
                      };
                    }

                    try {
                      const urlObject = new URL(url as string);
                      if (urlObject.hostname === "github.com") {
                        const pathParts = urlObject.pathname
                          .split("/")
                          .filter(Boolean);
                        if (pathParts.length >= 2) {
                          const owner = pathParts[0];
                          const repo = pathParts[1];
                          const apiResponse = await fetch(
                            `https://api.github.com/repos/${owner}/${repo}`
                          );
                          if (apiResponse.ok) {
                            const repoData = await apiResponse.json();
                            block.fields.title = repoData.full_name;
                            block.fields.description = repoData.description;
                            block.fields.avatar = repoData.owner.avatar_url;
                            block.fields.stars = repoData.stargazers_count;
                            block.fields.processedUrl = url;
                          } else {
                            block.fields.title = "Invalid URL";
                            block.fields.description = null;
                            block.fields.avatar = null;
                            block.fields.stars = null;
                            block.fields.processedUrl = null;
                          }
                        }
                      }
                    } catch (error: any) {
                      req.payload.logger.error(
                        `Error fetching GitHub data for URL ${url}: ${error.message}`
                      );
                    }
                  }
                  return block;
                })
              );
              return data.content;
            }
            return data;
          },
        ],
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [GithubLink, Code, HotizontalImage],
          }),
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
  timestamps: true,
};

export default Blog;
