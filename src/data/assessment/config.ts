import { assessmentSpec } from "@/data/assessment/spec";

export const assessmentStorage = {
  key: "changeready-assessment-session-v1",
} as const;

export const assessmentScale = assessmentSpec.itemScale;
