"use client";

import { useEffect, useMemo, useState } from "react";
import {
  clearAssessmentSession,
  createEmptyAssessmentSession,
  loadAssessmentSession,
  saveAssessmentSession,
} from "@/lib/assessment/storage";
import {
  clampQuestionIndex,
  getAnsweredCount,
  getNextUnansweredQuestionIndex,
  getRemainingCount,
  isAssessmentComplete,
} from "@/lib/assessment/validation";
import type { AssessmentQuestion, AssessmentSession, LikertValue } from "@/types/assessment";

type UseAssessmentSessionOptions = {
  questions: AssessmentQuestion[];
};

export function useAssessmentSession({ questions }: UseAssessmentSessionOptions) {
  const [session, setSession] = useState<AssessmentSession>(() =>
    createEmptyAssessmentSession()
  );
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const stored = loadAssessmentSession();
    const nextSession = stored
      ? {
          ...stored,
          currentQuestionIndex: clampQuestionIndex(
            stored.currentQuestionIndex,
            questions.length
          ),
        }
      : createEmptyAssessmentSession();
    const timeoutId = window.setTimeout(() => {
      setSession(nextSession);
      setIsHydrated(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [questions.length]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    saveAssessmentSession(session);
  }, [isHydrated, session]);

  const progress = useMemo(() => {
    const answeredCount = getAnsweredCount(questions, session.answers);
    const remainingCount = getRemainingCount(questions, session.answers);
    const isComplete = isAssessmentComplete(questions, session.answers);

    return {
      answeredCount,
      remainingCount,
      isComplete,
      totalQuestions: questions.length,
    };
  }, [questions, session.answers]);

  const currentQuestion = questions[session.currentQuestionIndex] ?? null;
  const currentAnswer = currentQuestion ? session.answers[currentQuestion.id] : undefined;

  function updateSession(
    updater: (currentSession: AssessmentSession) => AssessmentSession
  ) {
    setSession((currentSession) => ({
      ...updater(currentSession),
      updatedAt: new Date().toISOString(),
    }));
  }

  function setAnswer(questionId: string, value: LikertValue) {
    updateSession((currentSession) => ({
      ...currentSession,
      answers: {
        ...currentSession.answers,
        [questionId]: value,
      },
    }));
  }

  function goToQuestion(questionIndex: number) {
    updateSession((currentSession) => ({
      ...currentSession,
      currentQuestionIndex: clampQuestionIndex(questionIndex, questions.length),
    }));
  }

  function resetSession() {
    clearAssessmentSession();
    setSession(createEmptyAssessmentSession());
  }

  function jumpToNextIncompleteQuestion() {
    updateSession((currentSession) => ({
      ...currentSession,
      currentQuestionIndex: getNextUnansweredQuestionIndex(
        questions,
        currentSession.answers
      ),
    }));
  }

  return {
    session,
    isHydrated,
    currentQuestion,
    currentAnswer,
    progress,
    setAnswer,
    goToQuestion,
    resetSession,
    jumpToNextIncompleteQuestion,
  };
}
