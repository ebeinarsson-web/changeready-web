"use client";

import { useState } from "react";
import { theme } from "@/lib/theme";
import { isValidEmailAddress } from "@/lib/email/email-address";
import type { AnswerMap } from "@/types/assessment";

type EmailSectionContent = {
  eyebrow: string;
  title: string;
  intro: string;
  placeholder: string;
  helper: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  errorMessage: string;
  invalidEmailMessage: string;
};

type ResultEmailFormProps = {
  answers: AnswerMap;
  content: EmailSectionContent;
};

type SubmissionState = "idle" | "success" | "error";

export function ResultEmailForm({ answers, content }: ResultEmailFormProps) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmissionState>("idle");
  const [message, setMessage] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmailAddress(email)) {
      setState("error");
      setMessage(content.invalidEmailMessage);
      return;
    }

    setIsSubmitting(true);
    setState("idle");
    setMessage(undefined);

    try {
      const response = await fetch("/api/results/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          answers,
        }),
      });

      const payload = (await response.json()) as { message?: string };

      if (!response.ok) {
        setState("error");
        setMessage(payload.message ?? content.errorMessage);
        return;
      }

      setState("success");
      setMessage(payload.message ?? content.successMessage);
      setEmail("");
    } catch {
      setState("error");
      setMessage(content.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className={`${theme.panel} px-4 py-5 sm:px-6 sm:py-6`}>
      <div className="space-y-4">
        <div className="space-y-2">
          <p className={theme.eyebrow}>{content.eyebrow}</p>
          <h2 className={theme.sectionTitle}>{content.title}</h2>
          <p className={theme.bodySm}>{content.intro}</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div className="space-y-2">
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);

                if (state !== "idle") {
                  setState("idle");
                  setMessage(undefined);
                }
              }}
              placeholder={content.placeholder}
              className="w-full rounded-[16px] border border-border bg-surface px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-ring/40"
            />
            <p className={theme.bodySm}>{content.helper}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`${theme.primaryButton} disabled:cursor-not-allowed disabled:opacity-70`}
            >
              {isSubmitting ? content.sendingLabel : content.submitLabel}
            </button>

            {message ? (
              <p
                className={`text-sm leading-6 ${
                  state === "success" ? "text-accent" : "text-rose-300"
                }`}
              >
                {message}
              </p>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}
