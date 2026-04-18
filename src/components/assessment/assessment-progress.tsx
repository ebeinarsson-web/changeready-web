import { siteContent } from "@/content/site";
import { theme } from "@/lib/theme";

type AssessmentProgressProps = {
  answeredCount: number;
  totalQuestions: number;
  currentQuestionNumber: number;
};

export function AssessmentProgress({
  answeredCount,
  totalQuestions,
  currentQuestionNumber,
}: AssessmentProgressProps) {
  const progressPercent =
    totalQuestions === 0 ? 0 : (answeredCount / totalQuestions) * 100;

  return (
    <div className="space-y-2">
      <p className={theme.eyebrow}>{siteContent.assessment.progressLabel}</p>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-base font-semibold tracking-tight text-foreground">
          {currentQuestionNumber} / {totalQuestions}
        </p>
        <p className="text-sm text-muted">
          {answeredCount} / {totalQuestions} {siteContent.assessment.answeredLabel}
        </p>
      </div>
      <div className="h-1.5 rounded-full bg-surface-muted">
        <div
          className="h-1.5 rounded-full bg-accent transition-[width] duration-300 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}
