import { createHash } from "node:crypto";

import { env } from "@/lib/env";

/**
 * One-way hash of the requester IP. We avoid storing raw IPs to limit PII
 * footprint while still letting staff de-duplicate or correlate suspicious
 * submissions. Salted with a stable per-deploy secret (NEXTAUTH-style).
 */
export function hashIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const salt =
    process.env.IP_HASH_SALT ?? env.NEXT_PUBLIC_SITE_URL ?? "aprim-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

/**
 * Pull the client IP out of an incoming request, preferring the standard
 * Vercel/Cloudflare proxy headers and falling back to remote address.
 */
export function getClientIp(headers: Headers): string | null {
  const forwarded =
    headers.get("cf-connecting-ip") ??
    headers.get("x-real-ip") ??
    headers.get("x-forwarded-for");
  if (!forwarded) return null;
  // x-forwarded-for can be a list — first entry is the original client
  return forwarded.split(",")[0]?.trim() ?? null;
}
