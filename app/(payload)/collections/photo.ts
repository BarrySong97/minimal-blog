import type { CollectionConfig } from "payload";

const Photo: CollectionConfig = {
  slug: "photos",
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
      name: "image",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      defaultValue: "",
    },
    {
      name: "date",
      type: "date",
      required: true,
      hooks: {
        beforeChange: [
          (args) => {
            if (args.operation == "create" && !args.value) {
              return new Date().getTime();
            }
          },
        ],
      },
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
  ],
  timestamps: true,
};

export default Photo;
