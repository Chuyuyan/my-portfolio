import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // 确保无论有没有尾随斜杠都能正常工作
  trailingSlash: false,
};

export default nextConfig;
