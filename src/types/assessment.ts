export const dimensionKeys = ["d1", "d2", "d3", "d4", "d5", "d6"] as const;

export type DimensionKey = (typeof dimensionKeys)[number];

export const likertValues = [1, 2, 3, 4, 5] as const;
export type LikertValue = (typeof likertValues)[number];

export type AnswerMap = Partial<Record<string, LikertValue>>;

export interface AssessmentDimension {
  key: DimensionKey;
  /** Short label shown in progress / results scaffolding */
  label: string;
  /** Longer description placeholder until final copy exists */
  description: string;
}

export interface AssessmentQuestion {
  id: string;
  order: number;
  dimensionKey: DimensionKey;
  reverseScored: boolean;
  required: boolean;
  prompt: string;
}

export interface AssessmentSession {
  answers: AnswerMap;
  currentQuestionIndex: number;
  updatedAt: string;
}

export interface DimensionScore {
  sum: number;
  minPossible: number;
  maxPossible: number;
}

export type DimensionScoreMap = Record<DimensionKey, DimensionScore>;

export interface AssessmentScoreSnapshot {
  rawSum: number;
  /** Mapped to configured total scale (10–50 for ChangeReady) when the session is complete */
  totalOnDisplayScale: number | null;
  dimensions: DimensionScoreMap;
  answeredQuestionCount: number;
  totalQuestionCount: number;
  isComplete: boolean;
}
