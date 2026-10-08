import type { MetadataRoute } from "next";
import { SITE } from "@/lib/seo";

const PRIVATE = ["/api/", "/commencer/apercu/", "/commencer/plan/", "/admin/", "/portail/"];

// Moteurs de recherche et assistants IA (GEO) : accès explicite au contenu public.
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "MistralAI-User",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_BOTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE}/sitemap.xml`,
  };
}
