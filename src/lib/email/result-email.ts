import type { ResultBand } from "@/data/assessment";
import type { AssessmentDimension, AssessmentScoreSnapshot } from "@/types/assessment";

type BuildResultEmailPayloadArgs = {
  result: AssessmentScoreSnapshot;
  band: ResultBand;
  dimensions: AssessmentDimension[];
};

function describeDimensionStrength(sum: number): string {
  if (sum >= 18) {
    return "Mjög sterk";
  }

  if (sum >= 16) {
    return "Sterk";
  }

  if (sum >= 13) {
    return "Góð";
  }

  if (sum >= 11) {
    return "Í meðallagi";
  }

  if (sum >= 9) {
    return "Hófleg";
  }

  return "Varkár";
}

function formatTotalScoreLine(total: number): string {
  return `${total} af 50`;
}

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
  const totalOnDisplayScale = result.totalOnDisplayScale;

  if (typeof totalOnDisplayScale !== "number") {
    throw new Error("Cannot build ChangeReady result email without a completed score.");
  }

  const dimensionLines = dimensions
    .map((dimension) => {
      const score = result.dimensions[dimension.key];
      return `- ${dimension.label} — ${describeDimensionStrength(score.sum)}`;
    })
    .join("\n");

  const text = [
    "ChangeReady",
    "Sjálfsmat á breytingastíl",
    "",
    band.title,
    formatTotalScoreLine(totalOnDisplayScale),
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
    "Víddir í samhengi við matið:",
    dimensionLines,
    "",
    "Hannað og þróað af einarsson.io",
  ].join("\n");

  const dimensionListItems = dimensions
    .map((dimension) => {
      const score = result.dimensions[dimension.key];
      const label = `${dimension.label} — ${describeDimensionStrength(score.sum)}`;
      return `<li style="margin: 0 0 10px; color: #4d5a70; line-height: 1.65;">${escapeHtml(label)}</li>`;
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
      <p style="margin:0 0 8px;font-size:13px;color:#6b7285;">Sjálfsmat á breytingastíl</p>
      <p style="margin:0 0 18px;font-size:15px;line-height:1.7;color:#4d5a70;">Hér er fagleg samantekt á niðurstöðum þínum úr ChangeReady — byggð á sjálfsmati, ekki einkunn.</p>

      <div style="margin-top:6px;padding:18px;border:1px solid #e2d8c8;border-radius:18px;background:#f8f4ed;">
        <p style="margin:0;font-size:12px;letter-spacing:0.16em;text-transform:uppercase;color:#8f6241;">Niðurstöðuflokkur</p>
        <h1 style="margin:10px 0 0;font-size:30px;line-height:1.2;color:#131a25;">${escapeHtml(band.title)}</h1>
        <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#6b7285;">${escapeHtml(
          formatTotalScoreLine(totalOnDisplayScale)
        )}</p>
        <p style="margin:14px 0 0;font-size:15px;line-height:1.65;color:#4d5a70;">${escapeHtml(band.summary)}</p>
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
        <h2 style="margin:0 0 10px;font-size:18px;color:#131a25;">Víddir í samhengi við matið</h2>
        <p style="margin:0 0 10px;font-size:14px;line-height:1.65;color:#6b7285;">Hér er túlkun á styrkleika hverrar víddar út frá matinu — án hrárra tölusamanburða.</p>
        <ul style="margin:0;padding-left:18px;">${dimensionListItems}</ul>
      </div>

      <p style="margin:24px 0 0;font-size:13px;color:#6b7285;">Hannað og þróað af einarsson.io</p>
    </div>
  </div>`;

  return { subject, text, html };
}
