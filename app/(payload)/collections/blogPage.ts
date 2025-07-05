import type { GlobalConfig } from "payload";

const BlogPage: GlobalConfig = {
  slug: "blogPage",
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
      name: "banners",
      type: "relationship",
      relationTo: "blogs",
      hasMany: true,
      admin: {
        description: "Related blog posts that should be read before this one",
      },
    },
  ],
};

export default BlogPage;
