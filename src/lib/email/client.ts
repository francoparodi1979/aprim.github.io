import { Resend } from "resend";

import { env, requireResendKey } from "@/lib/env";

declare global {
  // eslint-disable-next-line no-var
  var __aprim_resend__: Resend | undefined;
}

export function getResend(): Resend {
  if (globalThis.__aprim_resend__) return globalThis.__aprim_resend__;
  const client = new Resend(requireResendKey());
  if (env.NODE_ENV !== "production") {
    globalThis.__aprim_resend__ = client;
  }
  return client;
}

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  tags?: { name: string; value: string }[];
}

/**
 * Single send entry point. In environments without a Resend API key (e.g.
 * local dev) we log the message instead of sending so flows can still be
 * exercised end-to-end without leaking real email.
 */
export async function sendEmail(args: SendArgs): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.info("[email:dev]", { to: args.to, subject: args.subject });
    return;
  }
  const resend = getResend();
  const { error } = await resend.emails.send({
    from: env.EMAIL_FROM,
    to: Array.isArray(args.to) ? args.to : [args.to],
    subject: args.subject,
    html: args.html,
    text: args.text,
    replyTo: args.replyTo,
    tags: args.tags,
  });
  if (error) {
    throw new Error(`Resend send failed: ${error.message}`);
  }
}
