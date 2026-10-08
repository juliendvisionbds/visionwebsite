import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegacyPage from "@/components/LegacyPage";
import { crumbsOf, getPost, listPosts, renderPost, shareImage, type Kind } from "@/lib/posts";
import { loadPageFiles } from "@/lib/load-content";
import { ORG_ID, SITE, breadcrumb, faqPage, jsonLdHtml, pageUrl, social } from "@/lib/seo";

const KIND: Kind = "blog";

// Une page = un fichier src/content/<KIND>/<slug>.md ; toute autre adresse renvoie une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return listPosts(KIND).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const p = getPost(KIND, (await params).slug);
  if (!p) return {};
  const title = `${p.seoTitle ?? p.title} | vision`;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/${KIND}/${p.slug}` },
    ...social(
      title,
      p.description,
      `/${KIND}/${p.slug}`,
      "article",
      shareImage(p) ? { url: shareImage(p)!, alt: p.coverAlt ?? p.title } : undefined
    ),
  };
}

export default async function Page({ params }: PageProps<"/blog/[slug]">) {
  const p = getPost(KIND, (await params).slug);
  if (!p) notFound();

  const { css, html, script } = loadPageFiles("blog/_template");
  const url = pageUrl(`/${KIND}/${p.slug}`);
  const jsonLd = [
    breadcrumb(crumbsOf(p)),
    {
      "@context": "https://schema.org",
      "@type": KIND === "blog" ? "BlogPosting" : "Article",
      headline: p.title,
      description: p.description,
      url,
      mainEntityOfPage: url,
      image: `${SITE}${shareImage(p) ?? "/og.jpg"}`,
      inLanguage: "fr-FR",
      ...(p.date && { datePublished: p.date, dateModified: p.date }),
      author: p.author ? { "@type": "Person", name: p.author, ...(p.authorRole && { jobTitle: p.authorRole }) } : { "@id": ORG_ID },
      publisher: { "@id": ORG_ID },
    },
    ...(p.faq.length ? [faqPage(p.faq)] : []),
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage css={css} html={html.replace(/<!-- POST \(.*?\) -->/, () => renderPost(p))} script={script} />
    </>
  );
}
