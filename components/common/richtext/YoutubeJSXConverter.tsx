import React from "react";
import { JSXConverters } from "@payloadcms/richtext-lexical/react";

export const YoutubeJSXConverter: JSXConverters<any> = {
  youtube: ({ node }) => {
    return (
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${node.id}?modestbranding=1&rel=0`}
        width="100%"
        style={{ aspectRatio: "16/9" }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    );
  },
};
