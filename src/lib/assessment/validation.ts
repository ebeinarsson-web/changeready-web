import type { AnswerMap, AssessmentQuestion } from "@/types/assessment";
import { likertValues } from "@/types/assessment";

export function isQuestionAnswered(questionId: string, answers: AnswerMap): boolean {
  const value = answers[questionId];
  return typeof value === "number" && likertValues.includes(value as never);
}

export function getAnsweredCount(
  questions: AssessmentQuestion[],
  answers: AnswerMap
): number {
  return questions.filter((question) => isQuestionAnswered(question.id, answers)).length;
}

export function getRemainingCount(
  questions: AssessmentQuestion[],
  answers: AnswerMap
): number {
  return questions.length - getAnsweredCount(questions, answers);
}

export function isAssessmentComplete(
  questions: AssessmentQuestion[],
  answers: AnswerMap
): boolean {
  return questions
    .filter((question) => question.required)
    .every((question) => isQuestionAnswered(question.id, answers));
}

export function getNextUnansweredQuestionIndex(
  questions: AssessmentQuestion[],
  answers: AnswerMap
): number {
  const index = questions.findIndex(
    (question) => question.required && !isQuestionAnswered(question.id, answers)
  );

  return index === -1 ? questions.length - 1 : index;
}

export function clampQuestionIndex(index: number, questionCount: number): number {
  if (questionCount <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), questionCount - 1);
}
