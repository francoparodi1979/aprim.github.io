import { NextRequest } from "next/server";

import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import { renderReferralNotification } from "@/lib/email/templates";
import { env } from "@/lib/env";
import { fail, fromZodIssues, ok, tooManyRequests } from "@/lib/api/respond";
import { getClientIp, hashIp } from "@/lib/security/hash-ip";
import { rateLimitForm } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { referralSchema } from "@/lib/validations/referral";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = referralSchema.safeParse(json);
  if (!parsed.success) return fromZodIssues(parsed.error.issues);

  const ip = getClientIp(req.headers);
  const ipHash = hashIp(ip);

  const limit = await rateLimitForm(`referral:${ipHash ?? "anon"}`);
  if (!limit.allowed) return tooManyRequests(limit.retryAfterSeconds);

  const captcha = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!captcha.ok) return fail("Captcha verification failed", 400);

  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  const [row] = await db
    .insert(schema.referrals)
    .values({
      referringName: parsed.data.referringName,
      referringEmail: parsed.data.referringEmail,
      referringPhone: parsed.data.referringPhone ?? null,
      referringOrganization: parsed.data.referringOrganization || null,
      npi: parsed.data.npi || null,
      patientInitials: parsed.data.patientInitials || null,
      patientCondition: parsed.data.patientCondition,
      studySlug: parsed.data.studySlug || null,
      notes: parsed.data.notes,
      ipHash,
      userAgent,
    })
    .returning({ id: schema.referrals.id });

  // Single internal notification — no auto-reply to the referring clinician
  // since their staff prefers manual outreach for referrals.
  sendEmail({
    to: env.EMAIL_TO_INTERNAL,
    replyTo: parsed.data.referringEmail,
    ...renderReferralNotification({
      id: row.id,
      referringName: parsed.data.referringName,
      referringEmail: parsed.data.referringEmail,
      referringPhone: parsed.data.referringPhone ?? null,
      referringOrganization: parsed.data.referringOrganization || null,
      npi: parsed.data.npi || null,
      patientInitials: parsed.data.patientInitials || null,
      patientCondition: parsed.data.patientCondition,
      studySlug: parsed.data.studySlug || null,
      notes: parsed.data.notes,
    }),
    tags: [{ name: "type", value: "referral" }],
  }).catch((err) => console.error("[referral] email send failed", err));

  return ok({ id: row.id });
}
