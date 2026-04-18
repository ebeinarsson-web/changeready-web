import { assessmentSpec } from "@/data/assessment/spec";

/**
 * Scoring rule placeholders — swap for the final ChangeReady model.
 *
 * Current implementation (see `scoreAssessment`):
 * - Each item uses the Likert scale defined in `assessmentSpec.itemScale`.
 * - Items marked `reverseScored` flip via `min + max - rawValue`.
 * - Dimension scores are simple sums of adjusted item scores per dimension.
 * - Total display score maps linearly from the raw sum across **all** items
 *   to `assessmentSpec.totalScoreRange` once the session is complete.
 *
 * Future hooks to add here:
 * - Mid-scale thresholds per dimension
 * - Non-linear transforms or weighting per item
 * - Reliability checks / consistency flags
 */
export const scoringRules = {
  spec: assessmentSpec,
  notes: [
    "24 items, 6 dimensions, 2 reverse-scored items (see question metadata).",
    "Band thresholds live beside marketing copy in `result-bands.is.ts`.",
  ],
} as const;
