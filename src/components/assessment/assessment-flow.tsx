"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AssessmentNavigation } from "@/components/assessment/assessment-navigation";
import { AssessmentProgress } from "@/components/assessment/assessment-progress";
import { QuestionPanel } from "@/components/assessment/question-panel";
import { siteContent } from "@/content/site";
import { theme } from "@/lib/theme";
import { useAssessmentSession } from "@/lib/assessment/use-assessment-session";
import type { AssessmentQuestion, LikertValue } from "@/types/assessment";

type AssessmentFlowProps = {
  questions: AssessmentQuestion[];
};

export function AssessmentFlow({ questions }: AssessmentFlowProps) {
  const router = useRouter();
  const [validationMessage, setValidationMessage] = useState<string>();
  const autoAdvanceTimeoutRef = useRef<number | undefined>(undefined);
  const [transitionDirection, setTransitionDirection] = useState<"forward" | "backward" | undefined>();
  const shouldScrollToQuestionRef = useRef(false);
  const questionRef = useRef<HTMLDivElement | null>(null);

  const {
    isHydrated,
    currentQuestion,
    currentAnswer,
    progress,
    setAnswer,
    goToQuestion,
    resetSession,
    jumpToNextIncompleteQuestion,
    session,
  } = useAssessmentSession({ questions });

  useEffect(() => {
    return () => {
      if (autoAdvanceTimeoutRef.current) {
        window.clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, []);

  function scrollQuestionIntoComfortView() {
    const targetElement = questionRef.current;

    if (!targetElement) {
      return;
    }

    const rect = targetElement.getBoundingClientRect();
    const desiredTopOffset = Math.max(88, Math.min(140, window.innerHeight * 0.2));
    const isComfortablyVisible =
      rect.top >= desiredTopOffset - 16 && rect.bottom <= window.innerHeight - 32;

    if (isComfortablyVisible) {
      return;
    }

    const targetTop = Math.max(0, window.scrollY + rect.top - desiredTopOffset);

    window.scrollTo({
      top: targetTop,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    if (!shouldScrollToQuestionRef.current) {
      return;
    }

    shouldScrollToQuestionRef.current = false;
    window.requestAnimationFrame(() => {
      scrollQuestionIntoComfortView();
    });
  }, [session.currentQuestionIndex]);

  if (!isHydrated) {
    return (
      <div className={`${theme.panel} min-h-[280px] animate-pulse bg-surface-muted/40`} />
    );
  }

  if (!currentQuestion) {
    return null;
  }

  function clearPendingAutoAdvance() {
    if (autoAdvanceTimeoutRef.current) {
      window.clearTimeout(autoAdvanceTimeoutRef.current);
      autoAdvanceTimeoutRef.current = undefined;
    }

    setTransitionDirection(undefined);
  }

  function beginTransition(nextQuestionIndex: number, direction: "forward" | "backward", delayMs = 280) {
    clearPendingAutoAdvance();
    setTransitionDirection(direction);

    autoAdvanceTimeoutRef.current = window.setTimeout(() => {
      shouldScrollToQuestionRef.current = true;
      setTransitionDirection(undefined);
      goToQuestion(nextQuestionIndex);
    }, delayMs);
  }

  function handleNext() {
    if (transitionDirection) {
      return;
    }

    if (!currentAnswer) {
      setValidationMessage(siteContent.assessment.selectionRequired);
      return;
    }

    setValidationMessage(undefined);
    beginTransition(
      Math.min(session.currentQuestionIndex + 1, questions.length - 1),
      "forward"
    );
  }

  function handleFinish() {
    if (!progress.isComplete) {
      setValidationMessage(siteContent.assessment.validationIncomplete);
      jumpToNextIncompleteQuestion();
      return;
    }

    setValidationMessage(undefined);
    router.push("/nidurstada");
  }

  function handleReset() {
    clearPendingAutoAdvance();
    resetSession();
    setValidationMessage(undefined);
  }

  function handlePrevious() {
    if (transitionDirection || session.currentQuestionIndex === 0) {
      return;
    }

    setValidationMessage(undefined);
    beginTransition(session.currentQuestionIndex - 1, "backward", 220);
  }

  function handleAnswer(questionIndex: number, questionId: string, value: LikertValue) {
    if (transitionDirection) {
      return;
    }

    setAnswer(questionId, value);
    setValidationMessage(undefined);

    if (questionIndex >= questions.length - 1) {
      return;
    }

    beginTransition(questionIndex + 1, "forward", 420);
  }

  const wrapperClassName =
    transitionDirection === "forward"
      ? "-translate-y-4 opacity-0"
      : transitionDirection === "backward"
        ? "translate-y-4 opacity-0"
        : "translate-y-0 opacity-100";

  return (
    <section className="space-y-4 sm:space-y-5">
      <div className={`${theme.panel} px-4 py-4 sm:px-6 sm:py-6`}>
        <div className="space-y-4">
          <div className="space-y-2">
            <p className={theme.eyebrow}>{siteContent.assessment.eyebrow}</p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {siteContent.assessment.title}
            </h1>
            <p className={theme.bodySm}>{siteContent.assessment.intro}</p>
          </div>

          <AssessmentProgress
            answeredCount={progress.answeredCount}
            totalQuestions={progress.totalQuestions}
            currentQuestionNumber={session.currentQuestionIndex + 1}
          />

          <details className={`${theme.subtlePanel} px-3 py-3 sm:px-4 sm:py-3.5`}>
            <summary className="cursor-pointer text-sm font-semibold text-foreground">
              {siteContent.assessment.instructionsEyebrow}
            </summary>
            <div className="mt-2 space-y-2">
              <p className={theme.bodySm}>{siteContent.assessment.instructionsIntro}</p>
              <ul className="space-y-1.5">
                {siteContent.assessment.instructions.map((instruction) => (
                  <li key={instruction} className={theme.bodySm}>
                    {instruction}
                  </li>
                ))}
              </ul>
            </div>
          </details>
        </div>
      </div>

      <div ref={questionRef} className={`transform-gpu transition-all duration-300 ease-out ${wrapperClassName}`}>
        <QuestionPanel
          question={currentQuestion}
          questionNumber={session.currentQuestionIndex + 1}
          totalQuestions={progress.totalQuestions}
          value={currentAnswer}
          onChange={(value) => {
            handleAnswer(session.currentQuestionIndex, currentQuestion.id, value);
          }}
          disabled={Boolean(transitionDirection)}
        />
      </div>

      <AssessmentNavigation
        previousLabel={siteContent.assessment.previousLabel}
        nextLabel={siteContent.assessment.nextLabel}
        finishLabel={siteContent.assessment.finishLabel}
        resetLabel={siteContent.assessment.resetLabel}
        canGoBack={session.currentQuestionIndex > 0}
        isLastQuestion={session.currentQuestionIndex === questions.length - 1}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onFinish={handleFinish}
        onReset={handleReset}
        validationMessage={validationMessage}
      />
    </section>
  );
}
