import {
  FixedToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import { BlocksFeature } from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";

const Books: CollectionConfig = {
  slug: "books",
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
      name: "author",
      type: "text",
    },

    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "note",
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

export default Books;
