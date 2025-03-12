import { Blog } from "@/payload-types";
import React, { FC } from "react";
export interface TocProps {
  blog: Blog;
}
const Toc: FC<TocProps> = () => {
  return <div>Hello Toc</div>;
};

export default Toc;
