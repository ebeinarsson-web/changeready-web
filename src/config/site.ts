/**
 * Canonical public URL for the ChangeReady web app.
 * Update here only if the primary domain changes (e.g. Vercel preview vs production).
 */
export const CHANGEREADY_APP_URL = "https://changeready.einarsson.io" as const;
const EINARSSON_PRIVACY_URL_BASE = "https://einarsson.io/privacy" as const;

export type SiteLocale = "is" | "en";

export function getEinarssonResultsPrivacyUrl(locale: SiteLocale): string {
  return `${EINARSSON_PRIVACY_URL_BASE}?lang=${locale}#results-email`;
}
