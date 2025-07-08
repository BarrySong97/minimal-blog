import type { Block } from "payload";

export const GithubLink: Block = {
  slug: "github-link",
  interfaceName: "GithubLinkBlock",
  fields: [
    {
      name: "url",
      type: "text",
      required: true,
    },
    {
      name: "processedUrl",
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "title",
      type: "text",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "description",
      type: "textarea",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "avatar",
      type: "text",
      label: "Avatar URL",
      admin: {
        readOnly: true,
      },
    },
    {
      name: "stars",
      type: "number",
      admin: {
        readOnly: true,
      },
    },
  ],
};
