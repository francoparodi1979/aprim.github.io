import { NextRequest } from "next/server";

import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import {
  renderPrescreenConfirmation,
  renderPrescreenNotification,
} from "@/lib/email/templates";
import { env } from "@/lib/env";
import { fail, fromZodIssues, ok, tooManyRequests } from "@/lib/api/respond";
import { getClientIp, hashIp } from "@/lib/security/hash-ip";
import { rateLimitForm } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { prescreenSchema } from "@/lib/validations/prescreen";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = prescreenSchema.safeParse(json);
  if (!parsed.success) return fromZodIssues(parsed.error.issues);

  const ip = getClientIp(req.headers);
  const ipHash = hashIp(ip);

  const limit = await rateLimitForm(`prescreen:${ipHash ?? "anon"}`, {
    limit: 3,
    windowSec: 600,
  });
  if (!limit.allowed) return tooManyRequests(limit.retryAfterSeconds);

  const captcha = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!captcha.ok) return fail("Captcha verification failed", 400);

  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  const [row] = await db
    .insert(schema.prescreens)
    .values({
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
      email: parsed.data.email,
      phone: parsed.data.phone,
      dobYear: parsed.data.dobYear,
      biologicalSex: parsed.data.biologicalSex ?? null,
      studySlug: parsed.data.studySlug,
      condition: parsed.data.condition,
      answers: parsed.data.answers,
      consentContact: parsed.data.consentContact ? 1 : 0,
      consentScreening: parsed.data.consentScreening ? 1 : 0,
      ipHash,
      userAgent,
    })
    .returning({ id: schema.prescreens.id });

  Promise.all([
    sendEmail({
      to: env.EMAIL_TO_INTERNAL,
      replyTo: parsed.data.email,
      ...renderPrescreenNotification({
        id: row.id,
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: parsed.data.email,
        phone: parsed.data.phone,
        dobYear: parsed.data.dobYear,
        studySlug: parsed.data.studySlug,
        condition: parsed.data.condition,
        answers: parsed.data.answers,
      }),
      tags: [
        { name: "type", value: "prescreen" },
        { name: "study", value: parsed.data.studySlug.slice(0, 64) },
      ],
    }),
    sendEmail({
      to: parsed.data.email,
      ...renderPrescreenConfirmation({
        firstName: parsed.data.firstName,
        studySlug: parsed.data.studySlug,
      }),
      tags: [{ name: "type", value: "prescreen-confirmation" }],
    }),
  ]).catch((err) => console.error("[prescreen] email send failed", err));

  return ok({ id: row.id });
}
