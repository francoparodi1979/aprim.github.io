import type { MetadataRoute } from "next";

import { getAllStudies } from "@/lib/content/studies";

// Required for `output: "export"` — metadata routes must opt into static.
export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://veritasclinical.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/patients",
    "/physicians",
    "/sponsors",
    "/contact",
  ].map((path) => ({
    // Trailing slash matches what GitHub Pages actually serves (trailingSlash:
    // true) — without it every sitemap URL would 301.
    url: path === "" ? base : `${base}${path}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const studies = await getAllStudies();
  const studyRoutes: MetadataRoute.Sitemap = studies.map((s) => ({
    url: `${base}/studies/${s.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...studyRoutes];
}
