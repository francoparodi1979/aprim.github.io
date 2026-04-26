import { NextRequest } from "next/server";

import { db, schema } from "@/lib/db";
import { sendEmail } from "@/lib/email/client";
import {
  renderContactConfirmation,
  renderContactNotification,
} from "@/lib/email/templates";
import { env } from "@/lib/env";
import { fail, fromZodIssues, ok, tooManyRequests } from "@/lib/api/respond";
import { getClientIp, hashIp } from "@/lib/security/hash-ip";
import { rateLimitForm } from "@/lib/security/rate-limit";
import { verifyTurnstile } from "@/lib/security/turnstile";
import { contactSchema } from "@/lib/validations/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return fail("Invalid JSON body", 400);
  }

  const parsed = contactSchema.safeParse(json);
  if (!parsed.success) return fromZodIssues(parsed.error.issues);

  const ip = getClientIp(req.headers);
  const ipHash = hashIp(ip);

  const limit = await rateLimitForm(`contact:${ipHash ?? "anon"}`);
  if (!limit.allowed) return tooManyRequests(limit.retryAfterSeconds);

  const captcha = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!captcha.ok) return fail("Captcha verification failed", 400);

  const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

  const [row] = await db
    .insert(schema.contacts)
    .values({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone ?? null,
      organization: parsed.data.organization || null,
      topic: parsed.data.topic,
      message: parsed.data.message,
      ipHash,
      userAgent,
    })
    .returning({ id: schema.contacts.id });

  Promise.all([
    sendEmail({
      to: env.EMAIL_TO_INTERNAL,
      replyTo: parsed.data.email,
      ...renderContactNotification({
        id: row.id,
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        organization: parsed.data.organization || null,
        topic: parsed.data.topic,
        message: parsed.data.message,
      }),
      tags: [
        { name: "type", value: "contact" },
        { name: "topic", value: parsed.data.topic },
      ],
    }),
    sendEmail({
      to: parsed.data.email,
      ...renderContactConfirmation({ name: parsed.data.name }),
      tags: [{ name: "type", value: "contact-confirmation" }],
    }),
  ]).catch((err) => console.error("[contact] email send failed", err));

  return ok({ id: row.id });
}
