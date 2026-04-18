import { assessmentStorage } from "@/data/assessment/config";
import type { AnswerMap, AssessmentSession } from "@/types/assessment";
import { likertValues } from "@/types/assessment";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isLikertValue(value: unknown): value is (typeof likertValues)[number] {
  return typeof value === "number" && likertValues.includes(value as never);
}

export function createEmptyAssessmentSession(): AssessmentSession {
  return {
    answers: {},
    currentQuestionIndex: 0,
    updatedAt: new Date().toISOString(),
  };
}

export function loadAssessmentSession(): AssessmentSession | null {
  if (!canUseStorage()) {
    return null;
  }

  const raw = window.localStorage.getItem(assessmentStorage.key);

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<AssessmentSession>;

    if (!parsed || typeof parsed !== "object") {
      return null;
    }

    const sanitizedAnswers = Object.fromEntries(
      Object.entries((parsed.answers as AnswerMap | undefined) ?? {}).filter(
        ([, value]) => isLikertValue(value)
      )
    ) as AnswerMap;

    return {
      answers: sanitizedAnswers,
      currentQuestionIndex:
        typeof parsed.currentQuestionIndex === "number"
          ? parsed.currentQuestionIndex
          : 0,
      updatedAt:
        typeof parsed.updatedAt === "string"
          ? parsed.updatedAt
          : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function saveAssessmentSession(session: AssessmentSession): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(assessmentStorage.key, JSON.stringify(session));
}

export function clearAssessmentSession(): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(assessmentStorage.key);
}
