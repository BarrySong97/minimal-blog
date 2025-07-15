import React, { FC } from "react";
export interface LayoutProps {
  children: React.ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
  return <>{children}</>;
};

export default Layout;
