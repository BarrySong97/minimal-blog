import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
/** @type {import('next').NextConfig} */
const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "4real.ltd",
      },
    ],
  },
};

export default withPayload(config);
