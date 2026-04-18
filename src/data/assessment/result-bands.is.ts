/**
 * Placeholder result bands on the 10–50 display scale.
 * Replace titles/summaries when final interpretation copy exists.
 */
export type ResultBand = {
  id: string;
  scoreMin: number;
  scoreMax: number;
  title: string;
  summary: string;
};

export const resultBandsIs: ResultBand[] = [
  {
    id: "band-a",
    scoreMin: 10,
    scoreMax: 22,
    title: "Grunnflokkur (staðhaldandi)",
    summary:
      "Þetta er staðhaldandi samantekt á lægri hluta kvarðans. Hér kemur rökstudden túlkun þegar lokaniðurstöður eru tilbúnar.",
  },
  {
    id: "band-b",
    scoreMin: 23,
    scoreMax: 36,
    title: "Miðflokkur (staðhaldandi)",
    summary:
      "Staðhaldandi miðsvið sem endurspeglar meðallega afstöðu. Textinn verður fínpússaður við lokadýpt og rannsóknarálag.",
  },
  {
    id: "band-c",
    scoreMin: 37,
    scoreMax: 50,
    title: "Hærri flokkur (staðhaldandi)",
    summary:
      "Staðhaldandi lýsing á efri hluta kvarðans. Útfærð túlkun og ráðleggingar koma í næstu útgáfum af niðurstöðum.",
  },
];

export function pickResultBand(score: number): ResultBand | undefined {
  return resultBandsIs.find(
    (band) => score >= band.scoreMin && score <= band.scoreMax
  );
}
