import { lexicalEditor } from "@payloadcms/richtext-lexical";
import {
  BlocksFeature,
  FixedToolbarFeature,
} from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";

const About: GlobalConfig = {
  slug: "about",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
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
};

export default About;
