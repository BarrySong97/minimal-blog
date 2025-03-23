"use client";

import { Provider } from "jotai";
import TanstackProvider from "../tanstack/TanstackProvider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

export const GlobalProviders = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <Provider>
      <TanstackProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </TanstackProvider>
    </Provider>
  );
};
