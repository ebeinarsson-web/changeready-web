import { Resend } from "resend";
import { getMailConfig } from "@/lib/email/config";

export function createMailClient() {
  const config = getMailConfig();

  return new Resend(config.apiKey);
}
