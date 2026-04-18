import { LikertScale } from "@/components/assessment/likert-scale";
import { theme } from "@/lib/theme";
import type { AssessmentQuestion, LikertValue } from "@/types/assessment";

type QuestionPanelProps = {
  question: AssessmentQuestion;
  questionNumber: number;
  totalQuestions: number;
  value?: LikertValue;
  transitionClassName?: string;
  onChange: (value: LikertValue) => void;
  disabled?: boolean;
};

export function QuestionPanel({
  question,
  questionNumber,
  totalQuestions,
  value,
  transitionClassName = "",
  onChange,
  disabled,
}: QuestionPanelProps) {
  return (
    <div
      className={`rounded-[22px] border border-border bg-surface/95 p-4 shadow-[0_18px_60px_rgba(0,0,0,0.35)] sm:p-6 ${transitionClassName}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className={theme.brandMark}>#{questionNumber}</span>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
            Vídd {question.dimensionKey.slice(1)}
            {question.reverseScored ? " · andhverft skorun" : ""}
          </p>
        </div>
        <div className="inline-flex items-center rounded-full border border-border bg-surface-muted/80 px-3 py-1 text-sm font-semibold text-foreground">
          <span>{questionNumber}</span>
          <span className="px-1 text-muted">/</span>
          <span className="text-muted">{totalQuestions}</span>
        </div>
      </div>

      <p className="mt-5 text-lg font-medium leading-relaxed text-foreground sm:text-xl">
        {question.prompt}
      </p>

      <div className="mt-6">
        <LikertScale value={value} onChange={onChange} disabled={disabled} />
      </div>
    </div>
  );
}
