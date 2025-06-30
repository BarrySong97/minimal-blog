import {
  BlocksFeature,
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import {
  BgColorFeature,
  HighlightColorFeature,
  TextColorFeature,
  YoutubeFeature,
} from "payloadcms-lexical-ext";
import type { CollectionConfig } from "payload";

const Blog: CollectionConfig = {
  slug: "blogs",
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
      name: "excerpt",
      type: "textarea",
      required: true,
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
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [],
          }),
          FixedToolbarFeature(),
          YoutubeFeature(),
        ],
      }),
    },
  ],
  timestamps: true,
};

export default Blog;
