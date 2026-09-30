import type { Metadata } from "next";
import QuizPage from "@/components/QuizPage";
import { title } from "@/content/quiz-plan/meta";
import { loadPageFiles } from "@/lib/load-content";

export const metadata: Metadata = {
  title,
  robots: { index: false },
};

export default function Page() {
  const { css, html, script } = loadPageFiles("quiz-plan");
  return <QuizPage css={css} html={html} script={script} />;
}
