import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description, faq } from "@/content/home/meta";
import { loadPageFiles } from "@/lib/load-content";
import { escapeHtml, faqPage, jsonLdHtml, social } from "@/lib/seo";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/" },
  ...social(title, description, "/"),
};

const faqHtml = faq
  .map(
    ([q, a]) =>
      `<div class="q"><button><span>${escapeHtml(q)}</span><span class="sign"></span></button><div class="ans"><p>${escapeHtml(a)}</p></div></div>`
  )
  .join("\n");

export default function Page() {
  const { css, html, script } = loadPageFiles("home");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqPage(faq)) }} />
      <LegacyPage
        css={css}
        html={html.replace('<div class="faq-wrap" id="faq"></div>', `<div class="faq-wrap">${faqHtml}</div>`)}
        script={script}
      />
    </>
  );
}
