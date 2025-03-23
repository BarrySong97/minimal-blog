import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const config: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    minimumCacheTTL: 2678400,
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
