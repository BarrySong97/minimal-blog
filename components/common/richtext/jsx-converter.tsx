import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { Heading as HeadingComponent } from "@/components/common/richtext/Heading";
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { CustomUploadComponent } from "@/components/blogs/detail/Content";
import { YoutubeJSXConverter } from "./YoutubeJSXConverter";
import { BlogRelationship } from "@/components/blogs/BlogRelationship";
import { isObject } from "@/lib/utils";
import { CodeBlock } from "@/blocks/Code/Component";
import HorizentalImages from "@/blocks/hotizental-image/horizental-image";
import { GithubLinkCard } from "@/blocks/github-link/github-link";

const jsxConverters: (args: {
  toc?: boolean;
}) => JSXConvertersFunction<DefaultNodeTypes> =
  ({ toc }) =>
  ({ defaultConverters }) => {
    if (defaultConverters.heading) {
      defaultConverters.heading = HeadingComponent as any;
    }
    return {
      ...defaultConverters,
      ...YoutubeJSXConverter,
      relationship: ({ node }) => {
        if (
          node.relationTo === "blogs" &&
          isObject(node.value) &&
          "id" in node.value
        ) {
          return <BlogRelationship blog={node.value} />;
        }
        return null;
      },
      upload: ({ node }) => {
        return <CustomUploadComponent node={node} />;
      },
      blocks: {
        // @ts-ignore
        code: ({ node }) => (
          <CodeBlock className={`col-start-2`} {...node.fields} />
        ),
        // @ts-ignore
        "hotizontal-image": ({ node }) => <HorizentalImages {...node.fields} />,
        // @ts-ignore
        "github-link": ({ node }) => <GithubLinkCard {...node.fields} />,
      },
    };
  };

export default jsxConverters;
