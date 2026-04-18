import type { ResultBand } from "@/data/assessment";
import type {
  AssessmentDimension,
  AssessmentScoreSnapshot,
  DimensionKey,
} from "@/types/assessment";

type BuildResultEmailPayloadArgs = {
  result: AssessmentScoreSnapshot;
  band: ResultBand;
  dimensions: AssessmentDimension[];
};

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function buildResultEmailPayload({
  result,
  band,
  dimensions,
}: BuildResultEmailPayloadArgs) {
  const subject = "ChangeReady | Niðurstöður sjálfsmats";

  const dimensionRows = dimensions
    .map((dimension) => {
      const score = result.dimensions[dimension.key];
      return `- ${dimension.label}: ${score.sum} / ${score.maxPossible}`;
    })
    .join("\n");

  const text = [
    "ChangeReady",
    "Sjálfsmat á breytingastíl",
    "",
    `Heildarskor (10-50): ${result.totalOnDisplayScale}`,
    `Niðurstöðuflokkur: ${band.title}`,
    "",
    "Stutt samantekt:",
    band.summary,
    "",
    "Það sem einkennir þig:",
    ...band.characteristics.map((item) => `- ${item}`),
    "",
    "Það sem er styrkur:",
    ...band.strengths.map((item) => `- ${item}`),
    "",
    "Það sem þarf að passa:",
    ...band.watchouts.map((item) => `- ${item}`),
    "",
    "Víðdaskor:",
    dimensionRows,
    "",
    "Hannað og þróað af einarsson.io",
  ].join("\n");

  const dimensionTableRows = dimensions
    .map((dimension) => {
      const score = result.dimensions[dimension.key as DimensionKey];
      return `<tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e6ee; color: #1a1f2b;">${escapeHtml(
          dimension.label
        )}</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e6ee; color: #1a1f2b; text-align: right; font-weight: 600;">
          ${score.sum} / ${score.maxPossible}
        </td>
      </tr>`;
    })
    .join("");

  const renderList = (items: string[]) =>
    items
      .map(
        (item) =>
          `<li style="margin: 0 0 8px; color: #4d5a70; line-height: 1.6;">${escapeHtml(item)}</li>`
      )
      .join("");

  const html = `
  <div style="margin:0;padding:28px 14px;background:#f3efe8;font-family:Arial,Helvetica,sans-serif;color:#131a25;">
    <div style="max-width:760px;margin:0 auto;background:#fffdf9;border:1px solid #e5ddcf;border-radius:26px;padding:28px;">
      <p style="margin:0 0 10px;font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#8f6241;">ChangeReady</p>
      <h1 style="margin:0;font-size:30px;line-height:1.2;color:#131a25;">Sjálfsmat á breytingastíl</h1>
      <p style="margin:16px 0 0;font-size:15px;line-height:1.7;color:#4d5a70;">Hér er samantekt á niðurstöðum þínum úr ChangeReady.</p>

      <div style="margin-top:22px;padding:18px;border:1px solid #e2d8c8;border-radius:18px;background:#f8f4ed;">
        <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8f6241;">Niðurstaða</p>
        <p style="margin:10px 0 0;font-size:34px;font-weight:700;color:#131a25;">${result.totalOnDisplayScale}</p>
        <p style="margin:8px 0 0;font-size:15px;line-height:1.6;color:#4d5a70;"><strong style="color:#131a25;">${escapeHtml(
          band.title
        )}</strong><br/>${escapeHtml(band.summary)}</p>
      </div>

      <div style="margin-top:24px;">
        <h2 style="margin:0 0 10px;font-size:18px;color:#131a25;">Það sem einkennir þig</h2>
        <ul style="margin:0;padding-left:18px;">${renderList(band.characteristics)}</ul>
      </div>

      <div style="margin-top:16px;">
        <h2 style="margin:0 0 10px;font-size:18px;color:#131a25;">Það sem er styrkur</h2>
        <ul style="margin:0;padding-left:18px;">${renderList(band.strengths)}</ul>
      </div>

      <div style="margin-top:16px;">
        <h2 style="margin:0 0 10px;font-size:18px;color:#131a25;">Það sem þarf að passa</h2>
        <ul style="margin:0;padding-left:18px;">${renderList(band.watchouts)}</ul>
      </div>

      <div style="margin-top:22px;">
        <h2 style="margin:0 0 10px;font-size:18px;color:#131a25;">Víðdaskor</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #e2e6ee;border-radius:14px;overflow:hidden;background:#ffffff;">
          <tbody>${dimensionTableRows}</tbody>
        </table>
      </div>

      <p style="margin:24px 0 0;font-size:13px;color:#6b7285;">Hannað og þróað af einarsson.io</p>
    </div>
  </div>`;

  return { subject, text, html };
}
