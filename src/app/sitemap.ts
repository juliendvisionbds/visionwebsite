import type { MetadataRoute } from "next";
import { allPosts } from "@/lib/posts";
import { pageUrl } from "@/lib/seo";

// Les cas clients (/clients/*) restent exclus tant qu'ils sont masqués (noindex).
// Les articles du blog et les cas d'usage en Markdown (src/content/{blog,cas}/*.md) sont ajoutés automatiquement.
const PAGES: Array<[path: string, priority: number, changeFrequency: "weekly" | "monthly"]> = [
  ["/", 1, "weekly"],
  ["/ia-btp", 0.9, "monthly"],
  ["/commencer", 0.8, "monthly"],
  ["/outils", 0.7, "monthly"],
  ["/outils/relance-impayes", 0.8, "monthly"],
  ["/a-propos", 0.7, "monthly"],
  ["/equipe", 0.6, "monthly"],
  ["/contact", 0.6, "monthly"],
  ["/devenir-partenaire", 0.5, "monthly"],
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (path: string, priority: number, changeFrequency: "weekly" | "monthly", lastModified: Date = now) => ({
    url: pageUrl(path),
    lastModified,
    changeFrequency,
    priority,
  });
  // Les articles et cas d'usage déclarent leur propre date de publication.
  const posts = (kind: "blog" | "cas", priority: number) =>
    allPosts(kind).map((p) => entry(`/${kind}/${p.slug}`, priority, "monthly", p.date ? new Date(`${p.date}T12:00:00`) : now));
  return [
    ...PAGES.map(([path, priority, freq]) => entry(path, priority, freq)),
    entry("/blog", 0.6, "weekly"),
    ...posts("blog", 0.6),
    ...posts("cas", 0.7),
  ];
}
