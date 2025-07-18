import type { CollectionConfig } from "payload";

const Rewatch: CollectionConfig = {
  slug: "rewatch",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "type"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "description",
      type: "textarea",
      localized: true,
    },
    {
      name: "link",
      type: "text",
      required: true,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        {
          label: "书籍",
          value: "book",
        },
        {
          label: "电影",
          value: "movie",
        },
        {
          label: "电视剧",
          value: "tv",
        },
      ],
      defaultValue: "book",
    },
  ],
  timestamps: true,
};

export default Rewatch;