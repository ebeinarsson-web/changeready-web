import { siteContent } from "@/content/site";
import type { LikertValue } from "@/types/assessment";
import { likertValues } from "@/types/assessment";

type LikertScaleProps = {
  value?: LikertValue;
  onChange: (value: LikertValue) => void;
  disabled?: boolean;
};

export function LikertScale({ value, onChange, disabled }: LikertScaleProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {likertValues.map((option) => {
          const isActive = value === option;
          return (
            <button
              key={option}
              type="button"
              disabled={disabled}
              onClick={() => onChange(option)}
              className={`rounded-2xl border px-2 py-3 text-center text-sm font-semibold transition-all sm:px-3 ${
                isActive
                  ? "border-accent bg-accent/15 text-foreground shadow-[0_12px_30px_rgba(177,122,82,0.18)]"
                  : "border-border bg-surface-muted/40 text-muted hover:border-accent/40 hover:text-foreground"
              } ${disabled ? "cursor-not-allowed opacity-60" : ""}`}
            >
              <span className="block text-lg text-foreground">{option}</span>
            </button>
          );
        })}
      </div>
      <div className="flex flex-col gap-1 text-xs text-muted sm:flex-row sm:justify-between">
        <span>{siteContent.assessment.likertLabels[1]}</span>
        <span className="hidden text-center sm:block">→</span>
        <span className="text-right">{siteContent.assessment.likertLabels[5]}</span>
      </div>
    </div>
  );
}
