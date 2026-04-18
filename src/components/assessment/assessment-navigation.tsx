import { theme } from "@/lib/theme";

type AssessmentNavigationProps = {
  previousLabel: string;
  nextLabel: string;
  finishLabel: string;
  resetLabel: string;
  canGoBack: boolean;
  isLastQuestion: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
  onReset: () => void;
  validationMessage?: string;
};

export function AssessmentNavigation({
  previousLabel,
  nextLabel,
  finishLabel,
  resetLabel,
  canGoBack,
  isLastQuestion,
  onPrevious,
  onNext,
  onFinish,
  onReset,
  validationMessage,
}: AssessmentNavigationProps) {
  return (
    <div className="sticky bottom-3 z-10 space-y-3 rounded-[22px] border border-border/80 bg-surface/95 p-3 shadow-soft backdrop-blur">
      {validationMessage ? (
        <p className="text-sm font-medium text-accent">{validationMessage}</p>
      ) : null}

      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoBack}
          className={`${theme.secondaryButton} w-full disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto`}
        >
          {previousLabel}
        </button>

        {isLastQuestion ? (
          <button type="button" onClick={onFinish} className={`${theme.primaryButton} w-full sm:w-auto`}>
            {finishLabel}
          </button>
        ) : (
          <button type="button" onClick={onNext} className={`${theme.secondaryButton} w-full sm:w-auto`}>
            {nextLabel}
          </button>
        )}

        <button type="button" onClick={onReset} className={`${theme.ghostButton} col-span-2 sm:col-span-1`}>
          {resetLabel}
        </button>
      </div>
    </div>
  );
}
