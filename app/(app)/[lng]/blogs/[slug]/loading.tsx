import { DefaultLayout } from "@/components/layouts/DefaultLayout";
import React, { FC } from "react";
export interface LoadingProps {}
const Loading: FC<LoadingProps> = () => {
  return (
    <DefaultLayout>
      <div>Hello Loading</div>
    </DefaultLayout>
  );
};

export default Loading;
