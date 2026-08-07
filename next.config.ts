import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  // Static HTML export — serves the legacy HTML/CSS/JS pages as plain files on Vercel.
  output: "export",
  trailingSlash: true,
};

export default nextConfig;
