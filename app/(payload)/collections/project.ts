import type { CollectionConfig } from "payload";

const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title"],
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
      name: "video",
      type: "text",
      required: true,
      admin: {
        description: "Video URL for the project (e.g. Cloudinary URL)",
      },
    },
    {
      name: "href",
      type: "text",
      required: true,
      admin: {
        description: "Project link URL",
      },
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Order in which the project should appear",
      },
    },
  ],
  timestamps: true,
};

export default Projects;
