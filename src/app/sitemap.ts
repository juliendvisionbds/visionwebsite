import type { MetadataRoute } from "next";
import { pageUrl } from "@/lib/seo";

// Les cas clients (/cas/*) sont exclus tant qu'ils sont masqués du site (noindex).
const PAGES: Array<[path: string, priority: number, changeFrequency: "weekly" | "monthly"]> = [
  ["/", 1, "weekly"],
  ["/ia-btp", 0.9, "monthly"],
  ["/commencer", 0.8, "monthly"],
  ["/a-propos", 0.7, "monthly"],
  ["/contact", 0.6, "monthly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return PAGES.map(([path, priority, changeFrequency]) => ({
    url: pageUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
