import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/lib/site";

/** Sitemaps need absolute URLs, so entries are only emitted once the real domain is configured. */
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.url) return [];
  const base = site.url;
  return [
    { url: new URL("/", base).toString(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: new URL(`/work/${p.slug}`, base).toString(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
