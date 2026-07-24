import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Codex in-app preview opens the local server through 127.0.0.1.
  // This is a development-only asset origin allowance; static output is unchanged.
  allowedDevOrigins: ["127.0.0.1"],
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
