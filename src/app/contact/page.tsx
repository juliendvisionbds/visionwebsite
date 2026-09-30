import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/contact/meta";
import { loadPageFiles } from "@/lib/load-content";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
};

export default function Page() {
  const { css, html, script } = loadPageFiles("contact");
  return <LegacyPage css={css} html={html} script={script} />;
}
