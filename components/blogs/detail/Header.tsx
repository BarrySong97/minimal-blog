import { Blog } from "@/payload-types";
import React, { FC } from "react";
export interface HeaderProps {
  blog: Blog;
}
const Header: FC<HeaderProps> = () => {
  return <div></div>;
};

export default Header;
