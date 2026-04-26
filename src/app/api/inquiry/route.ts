import { NextRequest } from "next/server";

import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import {
  renderInquiryConfirmation,
  renderInquiryNotification,
} from "@/lib/email/templates";
import { env } from "@/lib/env";
import { fail, fromZodIssues, ok, tooManyRequests } from "@/lib/api/respond";
import { getClientIp, hashIp } from "@/lib/security/hash-ip";
import { rateLimitForm } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { inquirySchema } from "@/lib/validations/inquiry";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) return fromZodIssues(parsed.error.issues);

  const ip = getClientIp(req.headers);
  const ipHash = hashIp(ip);

  const limit = await rateLimitForm(`inquiry:${ipHash ?? "anon"}`);
  if (!limit.allowed) return tooManyRequests(limit.retryAfterSeconds);

  const captcha = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!captcha.ok) return fail(`Captcha verification failed`, 400);

  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;
  const referrer = req.headers.get("referer")?.slice(0, 500) ?? null;

  const [row] = await db
    .insert(schema.inquiries)
    .values({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      condition: parsed.data.condition,
      studySlug: parsed.data.studySlug ?? null,
      message: parsed.data.message ?? null,
      consentContact: parsed.data.consentContact ? 1 : 0,
      ipHash,
      userAgent,
      referrer,
    })
    .returning({ id: schema.inquiries.id });

  // Fire-and-forget emails — never block on email failures, but surface them
  // in logs so a broken Resend config is obvious.
  Promise.all([
    sendEmail({
      to: env.EMAIL_TO_INTERNAL,
      replyTo: parsed.data.email,
      ...renderInquiryNotification({
        id: row.id,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        condition: parsed.data.condition,
        studySlug: parsed.data.studySlug ?? null,
        message: parsed.data.message ?? null,
      }),
      tags: [{ name: "type", value: "inquiry" }],
    }),
    sendEmail({
      to: parsed.data.email,
      ...renderInquiryConfirmation({ firstName: parsed.data.firstName }),
      tags: [{ name: "type", value: "inquiry-confirmation" }],
    }),
  ]).catch((err) => console.error("[inquiry] email send failed", err));

  return ok({ id: row.id });
}
