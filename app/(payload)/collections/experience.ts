import type { CollectionConfig } from "payload";

const Experience: CollectionConfig = {
  slug: "experiences",
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "position", "period"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "company",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "companyLogo",
      type: "upload",
      relationTo: "media",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "companyWebsite",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "companyLocation",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "position",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "period",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "order",
      type: "number",
      required: true,
      admin: {
        description:
          "Used to determine the display order of experiences. Lower numbers appear first.",
      },
    },
  ],
  timestamps: true,
};

export default Experience;
