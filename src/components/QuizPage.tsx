'use client';

import LegacyPage from "@/components/LegacyPage";
import * as engine from "@/lib/quiz-engine";

// Les scripts des pages du quiz lisent le moteur sur window.VQ.
// Assigné à l'import pour être prêt avant l'exécution du script de LegacyPage.
if (typeof window !== "undefined") {
  (window as unknown as { VQ: typeof engine }).VQ = engine;
}

type Props = {
  css: string;
  html: string;
  script: string;
};

export default function QuizPage(props: Props) {
  return <LegacyPage {...props} />;
}
