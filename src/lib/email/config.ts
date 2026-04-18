export type MailConfig = {
  apiKey: string;
  from: string;
  replyTo?: string;
};

export function getMailConfig(): MailConfig {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;

  if (!apiKey || !from) {
    throw new Error("Email configuration is incomplete.");
  }

  return {
    apiKey,
    from,
    replyTo: process.env.MAIL_REPLY_TO,
  };
}
