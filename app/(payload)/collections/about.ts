import { GlobalConfig } from "payload";
import {
  lexicalEditor,
  FixedToolbarFeature,
  BlocksFeature,
} from "@payloadcms/richtext-lexical";

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
