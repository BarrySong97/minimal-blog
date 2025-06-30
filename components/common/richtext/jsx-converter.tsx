import { DefaultNodeTypes } from "@payloadcms/richtext-lexical";
import { Heading as HeadingComponent } from "@/components/common/richtext/Heading";
import { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import { CustomUploadComponent } from "@/components/blogs/detail/Content";
import { YoutubeJSXConverter } from "./YoutubeJSXConverter";

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
      upload: ({ node }) => {
        return <CustomUploadComponent node={node} />;
      },
    };
  };

export default jsxConverters;
