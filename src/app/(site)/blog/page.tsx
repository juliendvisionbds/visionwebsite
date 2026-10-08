import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { allPosts, renderIndex } from "@/lib/posts";
import { loadPageFiles } from "@/lib/load-content";
import { breadcrumb, jsonLdHtml, social } from "@/lib/seo";

const title = "Le blog de vision : l'IA et l'automatisation dans le BTP | vision";
const description =
  "Ce qu'on voit sur le terrain, ce qu'on construit et ce qu'on en retient : articles de vision sur l'automatisation et l'IA dans les entreprises du bâtiment.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  ...social(title, description, "/blog"),
};

const jsonLd = breadcrumb([
  ["Accueil", "/"],
  ["Blog", "/blog"],
]);

export default function Page() {
  const { css, html, script } = loadPageFiles("blog/_template");
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }} />
      <LegacyPage css={css} html={html.replace(/<!-- POST \(.*?\) -->/, () => renderIndex(allPosts("blog")))} script={script} />
    </>
  );
}
