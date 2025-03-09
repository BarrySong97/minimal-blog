import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.google.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(config);
