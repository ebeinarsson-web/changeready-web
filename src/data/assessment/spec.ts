/**
 * ChangeReady assessment specification (target state).
 * Placeholder content may not yet fill every field; routing and scoring
 * follow these constraints so production data can drop in later.
 */
export const assessmentSpec = {
  expectedQuestionCount: 24,
  dimensionCount: 6,
  /** Exactly two items are reverse-scored in the final instrument */
  reverseScoredQuestionCount: 2,
  itemScale: { min: 1, max: 5 } as const,
  /** Final total score presented on the 10–50 band */
  totalScoreRange: { min: 10, max: 50 } as const,
} as const;
