import type { AssessmentQuestion } from "@/types/assessment";
import { dimensionKeys } from "@/types/assessment";

function buildPlaceholderQuestions(): AssessmentQuestion[] {
  return Array.from({ length: 24 }, (_, index) => {
    const order = index + 1;
    const id = `cr-q${String(order).padStart(2, "0")}`;
    const dimensionKey = dimensionKeys[index % dimensionKeys.length];
    const reverseScored = order === 3 || order === 18;

    return {
      id,
      order,
      dimensionKey,
      reverseScored,
      required: true,
      prompt: `Staðhaldandi spurning ${order} af 24. Hér kemur lokaformúlan við mat á breytingastíl (vídd: ${dimensionKey}).`,
    };
  });
}

export const assessmentQuestionsIs: AssessmentQuestion[] =
  buildPlaceholderQuestions();
