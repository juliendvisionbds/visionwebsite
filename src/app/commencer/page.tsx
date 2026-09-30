import type { Metadata } from "next";
import QuizPage from "@/components/QuizPage";
import { loadPageFiles } from "@/lib/load-content";
import { social } from "@/lib/seo";

const title = "Diagnostic gratuit d'automatisation BTP | vision";
const description =
  "7 questions, 2 minutes : recevez un plan personnalisé avec vos 3 priorités à automatiser. Gratuit, sans engagement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/commencer" },
  ...social(title, description, "/commencer"),
};

export default function Page() {
  const { css, html, script } = loadPageFiles("quiz-questions");
  return <QuizPage css={css} html={html} script={script} />;
}
