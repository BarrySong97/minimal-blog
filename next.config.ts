import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

/** @type {import('next').NextConfig} */
const config: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

export default withPayload(config);
