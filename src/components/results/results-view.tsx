"use client";

import { useEffect, useMemo, useState } from "react";
import { ResultEmailForm } from "@/components/results/result-email-form";
import { ButtonLink } from "@/components/ui/button-link";
import { assessmentDimensionsIs, assessmentQuestionsIs, pickResultBand } from "@/data/assessment";
import { siteContent } from "@/content/site";
import { theme } from "@/lib/theme";
import { scoreAssessment } from "@/lib/assessment/score-assessment";
import {
  createEmptyAssessmentSession,
  loadAssessmentSession,
} from "@/lib/assessment/storage";
import type { AnswerMap, AssessmentScoreSnapshot, DimensionKey } from "@/types/assessment";

function DimensionMeter({
  label,
  sum,
  minPossible,
  maxPossible,
}: {
  label: string;
  sum: number;
  minPossible: number;
  maxPossible: number;
}) {
  const width =
    maxPossible === minPossible ? 0 : ((sum - minPossible) / (maxPossible - minPossible)) * 100;

  return (
    <div className="space-y-2 rounded-2xl border border-border bg-surface-muted/45 px-4 py-3">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="text-xs font-medium text-muted">
          {sum} / {maxPossible}
        </p>
      </div>
      <div className="h-2 rounded-full bg-background/40">
        <div
          className="h-2 rounded-full bg-accent/80 transition-[width] duration-500 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, width))}%` }}
        />
      </div>
    </div>
  );
}

export function ResultsView() {
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [snapshot, setSnapshot] = useState<AssessmentScoreSnapshot>(() =>
    scoreAssessment(assessmentQuestionsIs, createEmptyAssessmentSession().answers)
  );

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const session = loadAssessmentSession() ?? createEmptyAssessmentSession();
      setAnswers(session.answers);
      setSnapshot(scoreAssessment(assessmentQuestionsIs, session.answers));
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const band = useMemo(() => {
    if (!snapshot?.totalOnDisplayScale) {
      return undefined;
    }

    return pickResultBand(snapshot.totalOnDisplayScale);
  }, [snapshot]);

  const dimensionLabels = useMemo(() => {
    return assessmentDimensionsIs.reduce(
      (accumulator, dimension) => {
        accumulator[dimension.key] = dimension.label;
        return accumulator;
      },
      {} as Record<DimensionKey, string>
    );
  }, []);

  if (!snapshot.isComplete || snapshot.totalOnDisplayScale === null) {
    return (
      <div className={`${theme.panel} space-y-4 px-4 py-6 sm:px-6`}>
        <p className={theme.eyebrow}>{siteContent.results.eyebrow}</p>
        <h1 className={theme.sectionTitle}>{siteContent.results.incompleteTitle}</h1>
        <p className={theme.bodySm}>{siteContent.results.incompleteBody}</p>
        <p className="text-sm text-muted">
          Staða: {snapshot.answeredQuestionCount}/{snapshot.totalQuestionCount} svör.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/mat">{siteContent.results.resumeCta}</ButtonLink>
          <ButtonLink href="/" variant="secondary">
            Forsíða
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className={`${theme.panel} space-y-6 px-4 py-6 sm:px-8 sm:py-8`}>
        <div className="space-y-2">
          <p className={theme.eyebrow}>{siteContent.results.eyebrow}</p>
          <h1 className={theme.sectionTitle}>{siteContent.results.title}</h1>
          <p className={theme.bodySm}>{siteContent.results.dimensionHint}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-surface-muted/55 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
              {siteContent.results.totalScoreLabel}
            </p>
            <p className="mt-3 text-5xl font-semibold text-foreground">{snapshot.totalOnDisplayScale}</p>
            <p className="mt-2 text-sm font-medium text-muted">
              {siteContent.results.rawSumLabel}: {snapshot.rawSum}
            </p>
          </div>

          <div className="rounded-3xl border border-accent/45 bg-accent/12 p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {siteContent.results.bandLabel}
            </p>
            <p className="mt-3 text-xl font-semibold text-foreground">{band?.title ?? "—"}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted">{band?.summary}</p>
          </div>
        </div>

        {band ? (
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-surface-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Það sem einkennir þig
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {band.characteristics.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Það sem er styrkur
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {band.strengths.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-surface-muted/40 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                Það sem þarf að passa
              </p>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                {band.watchouts.map((item) => (
                  <li key={item}>- {item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <p className="text-sm font-semibold text-foreground">{siteContent.results.dimensionLabel}</p>
          <div className="grid gap-3">
            {(Object.keys(snapshot.dimensions) as DimensionKey[]).map((key) => {
              const dimensionScore = snapshot.dimensions[key];
              return (
                <DimensionMeter
                  key={key}
                  label={dimensionLabels[key]}
                  sum={dimensionScore.sum}
                  minPossible={dimensionScore.minPossible}
                  maxPossible={dimensionScore.maxPossible}
                />
              );
            })}
          </div>
        </div>

        <p className="text-xs text-muted/90">{siteContent.results.footnote}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/mat" variant="secondary">
          {siteContent.results.restartCta}
        </ButtonLink>
        <ButtonLink href="/" variant="secondary">
          Forsíða
        </ButtonLink>
      </div>

      <ResultEmailForm
        answers={answers}
        content={siteContent.results.emailSection}
      />
    </div>
  );
}
