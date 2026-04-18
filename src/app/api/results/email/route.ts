import {
  assessmentDimensionsIs,
  assessmentQuestionsIs,
  pickResultBand,
} from "@/data/assessment";
import { scoreAssessment } from "@/lib/assessment/score-assessment";
import { isAssessmentComplete } from "@/lib/assessment/validation";
import { createMailClient } from "@/lib/email/client";
import { getMailConfig } from "@/lib/email/config";
import { isValidEmailAddress } from "@/lib/email/email-address";
import { buildResultEmailPayload } from "@/lib/email/result-email";
import { likertValues, type AnswerMap, type LikertValue } from "@/types/assessment";

export const runtime = "nodejs";

type EmailRequestBody = {
  email?: unknown;
  answers?: unknown;
};

function sanitizeAnswers(value: unknown): AnswerMap {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).filter(
      ([questionId, answer]) =>
        typeof questionId === "string" &&
        typeof answer === "number" &&
        likertValues.includes(answer as LikertValue)
    )
  ) as AnswerMap;
}

export async function POST(request: Request) {
  let body: EmailRequestBody;

  try {
    body = (await request.json()) as EmailRequestBody;
  } catch {
    return Response.json({ message: "Ógilt beiðniform." }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const answers = sanitizeAnswers(body.answers);

  if (!isValidEmailAddress(email)) {
    return Response.json({ message: "Netfangið er ekki gilt." }, { status: 400 });
  }

  if (!isAssessmentComplete(assessmentQuestionsIs, answers)) {
    return Response.json(
      { message: "Mati þarf að vera lokið áður en niðurstöður eru sendar." },
      { status: 400 }
    );
  }

  try {
    const result = scoreAssessment(assessmentQuestionsIs, answers);

    if (result.totalOnDisplayScale === null) {
      return Response.json(
        { message: "Niðurstaða er ekki til staðar fyrir sendingu." },
        { status: 400 }
      );
    }

    const band = pickResultBand(result.totalOnDisplayScale);

    if (!band) {
      return Response.json(
        { message: "Ekki tókst að para niðurstöðu við flokk." },
        { status: 400 }
      );
    }

    const mailConfig = getMailConfig();
    const mailClient = createMailClient();
    const payload = buildResultEmailPayload({
      result,
      band,
      dimensions: assessmentDimensionsIs,
    });

    const { error } = await mailClient.emails.send({
      from: mailConfig.from,
      to: email,
      replyTo: mailConfig.replyTo,
      subject: payload.subject,
      html: payload.html,
      text: payload.text,
    });

    if (error) {
      throw error;
    }

    return Response.json({
      message: "Niðurstöður hafa verið sendar á netfangið.",
    });
  } catch (error) {
    console.error("Failed to send ChangeReady result email", error);
    return Response.json(
      {
        message: "Ekki tókst að senda niðurstöður í þetta sinn. Vinsamlegast reyndu aftur.",
      },
      { status: 500 }
    );
  }
}
