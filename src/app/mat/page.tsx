import type { Metadata } from "next";
import { AssessmentFlow } from "@/components/assessment/assessment-flow";
import { siteContent } from "@/content/site";
import { assessmentQuestionsIs } from "@/data/assessment";

export const metadata: Metadata = {
  title: siteContent.navigation.assessment,
};

export default function AssessmentPage() {
  return <AssessmentFlow questions={assessmentQuestionsIs} />;
}
