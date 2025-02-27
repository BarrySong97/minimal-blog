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
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
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
            data?: { title?: string };
            originalDoc?: { title?: string };
          }) => {
            if (data?.title) {
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
      required: true,
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
  ],
  timestamps: true,
};

export default Blog;
