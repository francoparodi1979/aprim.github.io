import type { MetadataRoute } from "next";

import { getAllStudies } from "@/lib/content/studies";
import { env } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/studies",
    "/patients",
    "/physicians",
    "/contact",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));

  const studies = await getAllStudies();
  const studyRoutes: MetadataRoute.Sitemap = studies.map((s) => ({
    url: `${base}/studies/${s.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...studyRoutes];
}
