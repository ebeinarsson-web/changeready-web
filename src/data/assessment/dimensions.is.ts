import type { AssessmentDimension } from "@/types/assessment";

/**
 * Six dimension placeholders — swap labels/descriptions when final model lands.
 */
export const assessmentDimensionsIs: AssessmentDimension[] = [
  {
    key: "d1",
    label: "Vídd 1",
    description:
      "Staðhaldandi lýsing á fyrstu vídd breytingastíls. Hér kemur nákvæmari texti við lokaniðurstöður.",
  },
  {
    key: "d2",
    label: "Vídd 2",
    description:
      "Staðhaldandi lýsing á annarri vídd. Þetta er einfaldur kafli sem auðvelt er að skipta út.",
  },
  {
    key: "d3",
    label: "Vídd 3",
    description:
      "Staðhaldandi lýsing á þriðju vídd. Útfærsla á skorun og túlkun kemur í næsta skrefi.",
  },
  {
    key: "d4",
    label: "Vídd 4",
    description:
      "Staðhaldandi lýsing á fjórðu vídd. Gagnagrunnurinn styður aðskilda skorun á hverri vídd.",
  },
  {
    key: "d5",
    label: "Vídd 5",
    description:
      "Staðhaldandi lýsing á fimmtu vídd. Viðhalda skal samræmi við 24 atriði og 6 víddir.",
  },
  {
    key: "d6",
    label: "Vídd 6",
    description:
      "Staðhaldandi lýsing á sjöttu vídd. Niðurstöðutextar tengjast síðan flokkum og mörkum.",
  },
];
