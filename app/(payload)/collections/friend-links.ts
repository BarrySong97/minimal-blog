import type { CollectionConfig } from "payload";

const FriendLinks: CollectionConfig = {
  slug: "friend-links",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "url"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      admin: {
        description: "Friend's name or website name",
      },
    },
    {
      name: "url",
      type: "text",
      required: true,
      admin: {
        description: "Friend's website URL",
      },
    },
    {
      name: "description",
      type: "textarea",
      required: false,
      admin: {
        description: "Brief description of the friend or website",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: false,
      admin: {
        description: "Friend's avatar or website logo",
      },
      access: {
        read: () => true,
      },
    },
    {
      name: "order",
      type: "number",
      admin: {
        description: "Order in which the friend link should appear",
      },
      defaultValue: 0,
    },
    {
      name: "status",
      type: "select",
      options: ["active", "inactive"],
      defaultValue: "active",
      admin: {
        description: "Whether to display this friend link",
      },
    },
  ],
  timestamps: true,
};

export default FriendLinks;