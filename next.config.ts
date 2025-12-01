import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  transpilePackages: ["geist"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "priugjdkvrvoryuqycxy.supabase.co",
        pathname: "/storage/v1/object/public/thumbnails/**",
      },
    ],
  },
};

export default withMDX(nextConfig);
