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
    { name: "cover", type: "upload", relationTo: "media" },
    {
      name: "images",
      type: "array",
      required: false,
      fields: [
        {
          name: "title",
          type: "text",
        },
        {
          name: "location",
          type: "text",
        },
        { name: "image", type: "upload", relationTo: "media" },
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
        {
          name: "date",
          type: "date",
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
