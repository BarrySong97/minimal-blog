import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { BlocksFeature } from "@payloadcms/richtext-lexical";
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
      name: "location",
      type: "text",
    },

    {
      name: "images",
      type: "array",
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
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
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          BlocksFeature({
            blocks: [],
          }),
          FixedToolbarFeature(),
        ],
      }),
    },
  ],
  timestamps: true,
};

export default Photo;
