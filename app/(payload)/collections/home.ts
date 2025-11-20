import type { GlobalConfig } from "payload";

const Home: GlobalConfig = {
  slug: "home",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      localized: true,
    },

    {
      name: "short_description",
      type: "textarea",
      localized: true,
    },
    {
      name: "about_description",
      type: "textarea",
      localized: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      localized: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: true,
      access: {
        read: () => true,
      },
    },
    {
      name: "socialLinks",
      type: "array",
      required: true,
      fields: [
        {
          name: "name",
          type: "select",
          required: true,
          options: [
            { label: "Twitter", value: "Twitter" },
            { label: "Bilibili", value: "Bilibili" },
            { label: "Xiaohongshu", value: "Xiaohongshu" },
            { label: "Github", value: "Github" },
            { label: "Email", value: "Email" },
          ],
        },
        {
          name: "icon",
          type: "text",
          required: true,
        },
        {
          name: "url",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

export default Home;
