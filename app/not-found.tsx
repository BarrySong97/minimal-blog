import "@/styles/globals.css";
import React, { FC } from "react";
import NotFound from "./(app)/[lng]/not-found";
export interface NotFountProps {}
const NotFount: FC<NotFountProps> = () => {
  return <NotFound />;
};

export default NotFount;
