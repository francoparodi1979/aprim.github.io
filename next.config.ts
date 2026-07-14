import type { NextConfig } from "next";
import path from "node:path";

/**
 * Static export — the site is a fully pre-rendered brochure site deployed to
 * GitHub Pages. Form submissions go to Formspree, so there is no server
 * runtime: no API routes, no ISR, no image optimizer, no response headers
 * (GitHub Pages cannot set them).
 */
const config: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  typedRoutes: true,
  outputFileTracingRoot: path.join(__dirname),
  // GitHub Pages serves plain files; Next's on-demand image optimizer needs a
  // server, so images are emitted as-is.
  images: { unoptimized: true },
  // Emit each route as <route>/index.html so GitHub Pages (which has no
  // rewrite rules) serves clean URLs like /contact/ natively.
  trailingSlash: true,
};

export default config;
