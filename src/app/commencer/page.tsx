import type { Metadata } from "next";
import LegacyPage from "@/components/LegacyPage";
import { title, description } from "@/content/commencer/meta";
import { loadPageFiles } from "@/lib/load-content";

export const metadata: Metadata = {
  title,
  description,
};

export default function Page() {
  const { css, html, script } = loadPageFiles("commencer");
  return <LegacyPage css={css} html={html} script={script} />;
}
