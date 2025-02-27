import type { CollectionConfig } from "payload";

const SkillCategories: CollectionConfig = {
  slug: "skill-categories",
  admin: {
    useAsTitle: "name",
  },
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
      name: "order",
      type: "number",
      required: true,
      admin: {
        description:
          "Used to determine the display order of categories. Lower numbers appear first.",
      },
    },
  ],
};

export default SkillCategories;
