import { assessmentSpec } from "@/data/assessment/spec";
import type {
  AnswerMap,
  AssessmentQuestion,
  AssessmentScoreSnapshot,
  DimensionKey,
  DimensionScoreMap,
  LikertValue,
} from "@/types/assessment";
import { dimensionKeys } from "@/types/assessment";
import { isAssessmentComplete, isQuestionAnswered } from "@/lib/assessment/validation";

function adjustedValue(question: AssessmentQuestion, value: LikertValue): number {
  if (!question.reverseScored) {
    return value;
  }

  return assessmentSpec.itemScale.min + assessmentSpec.itemScale.max - value;
}

function emptyDimensionScores(questions: AssessmentQuestion[]): DimensionScoreMap {
  const counts = dimensionKeys.reduce(
    (accumulator, key) => {
      accumulator[key] = 0;
      return accumulator;
    },
    {} as Record<DimensionKey, number>
  );

  for (const question of questions) {
    counts[question.dimensionKey] += 1;
  }

  return dimensionKeys.reduce((accumulator, key) => {
    const questionCount = counts[key];
    const minPossible = questionCount * assessmentSpec.itemScale.min;
    const maxPossible = questionCount * assessmentSpec.itemScale.max;

    accumulator[key] = {
      sum: 0,
      minPossible,
      maxPossible,
    };

    return accumulator;
  }, {} as DimensionScoreMap);
}

function mapRawSumToDisplayScale(rawSum: number, questionCount: number): number {
  if (questionCount === 0) {
    return assessmentSpec.totalScoreRange.min;
  }

  const minRaw = questionCount * assessmentSpec.itemScale.min;
  const maxRaw = questionCount * assessmentSpec.itemScale.max;
  const rawBandWidth =
    questionCount * (assessmentSpec.itemScale.max - assessmentSpec.itemScale.min);
  const clamped = Math.min(Math.max(rawSum, minRaw), maxRaw);
  const displayBandWidth =
    assessmentSpec.totalScoreRange.max - assessmentSpec.totalScoreRange.min;

  // Formula: ROUND(10 + (raw - 24) * 40 / 96)
  // Generalized from spec so the same rule stays consistent with config.
  const display =
    assessmentSpec.totalScoreRange.min +
    ((clamped - minRaw) * displayBandWidth) / rawBandWidth;

  return Math.round(display);
}

export function scoreAssessment(
  questions: AssessmentQuestion[],
  answers: AnswerMap
): AssessmentScoreSnapshot {
  const dimensions = emptyDimensionScores(questions);
  let rawSum = 0;
  let answeredQuestionCount = 0;

  for (const question of questions) {
    const value = answers[question.id];

    if (!isQuestionAnswered(question.id, answers) || typeof value !== "number") {
      continue;
    }

    answeredQuestionCount += 1;
    const adjusted = adjustedValue(question, value as LikertValue);
    rawSum += adjusted;
    dimensions[question.dimensionKey].sum += adjusted;
  }

  const isComplete = isAssessmentComplete(questions, answers);
  const totalOnDisplayScale = isComplete
    ? mapRawSumToDisplayScale(rawSum, questions.length)
    : null;

  return {
    rawSum,
    totalOnDisplayScale,
    dimensions,
    answeredQuestionCount,
    totalQuestionCount: questions.length,
    isComplete,
  };
}
