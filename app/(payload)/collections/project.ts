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
      name: "slug",
      type: "text",
      required: true,
    },
    {
      name: "github",
      type: "text",
      required: false,
    },

    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      required: false,
      access: {
        read: () => true,
      },
    },
    {
      name: "home_cover",
      type: "upload",
      relationTo: "media",
      required: false,
      access: {
        read: () => true,
      },
    },
    {
      name: "video",
      type: "upload",
      relationTo: "media",
      required: false,
      access: {
        read: () => true,
      },
    },
    {
      name: "description",
      type: "textarea",
      required: false,
    },
    {
      name: "home_cursor",
      type: "text",
      required: false,
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
    {
      name: "status",
      type: "select",
      options: ["working", "running", "archived"],
      defaultValue: "working",
    },
  ],
  timestamps: true,
};

export default Projects;
