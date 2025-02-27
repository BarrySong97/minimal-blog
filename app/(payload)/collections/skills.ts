import type { CollectionConfig } from "payload";

const Skills: CollectionConfig = {
  slug: "skills",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "category", "icon"],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "icon",
      type: "text",
      required: true,
      admin: {
        description:
          "Icon name from @iconify/react (e.g., 'skill-icons:react-dark')",
      },
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "skill-categories",
      required: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "order",
      type: "number",
      required: true,
      admin: {
        description:
          "Used to determine the display order within the category. Lower numbers appear first.",
        position: "sidebar",
      },
    },
  ],
};

export default Skills;
