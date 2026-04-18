import type { Metadata } from "next";
import { ResultsView } from "@/components/results/results-view";
import { siteContent } from "@/content/site";

export const metadata: Metadata = {
  title: siteContent.navigation.results,
};

export default function ResultsPage() {
  return <ResultsView />;
}
