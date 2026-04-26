import { env } from "@/lib/env";

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface TurnstileResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

/**
 * Verify a Cloudflare Turnstile token. If TURNSTILE_SECRET_KEY is unset
 * (e.g. local dev), verification is skipped and `true` returned. Always
 * configure the secret in production.
 */
export async function verifyTurnstile(
  token: string,
  remoteIp?: string | null
): Promise<{ ok: boolean; reason?: string }> {
  if (!env.TURNSTILE_SECRET_KEY) {
    if (env.NODE_ENV === "production") {
      return { ok: false, reason: "Turnstile not configured in production" };
    }
    return { ok: true };
  }

  const body = new URLSearchParams();
  body.set("secret", env.TURNSTILE_SECRET_KEY);
  body.set("response", token);
  if (remoteIp) body.set("remoteip", remoteIp);

  try {
    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
      // Turnstile occasionally has slow responses; cap at 5s.
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as TurnstileResponse;
    if (!data.success) {
      return {
        ok: false,
        reason: data["error-codes"]?.join(", ") ?? "verification failed",
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: err instanceof Error ? err.message : "verify request failed",
    };
  }
}
