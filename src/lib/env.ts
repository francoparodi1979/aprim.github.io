import { z } from "zod";

/**
 * Server-only env. Some values are not exposed to the client bundle, so
 * importing this from client code will fail.
 *
 * `.env.local` typically contains keys with empty values for placeholders;
 * we coerce empty strings to undefined so optional fields stay optional.
 */
const emptyToUndefined = <T extends z.ZodTypeAny>(s: T) =>
  z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
    s
  );

const serverSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  DATABASE_URL: emptyToUndefined(z.string().url().optional()),

  RESEND_API_KEY: emptyToUndefined(z.string().min(1).optional()),
  EMAIL_FROM: z.string().default("APRIM <no-reply@aprim.org>"),
  EMAIL_TO_INTERNAL: z.string().email().default("research@aprim.org"),

  TURNSTILE_SECRET_KEY: emptyToUndefined(z.string().min(1).optional()),

  UPSTASH_REDIS_REST_URL: emptyToUndefined(z.string().url().optional()),
  UPSTASH_REDIS_REST_TOKEN: emptyToUndefined(z.string().min(1).optional()),

  IP_HASH_SALT: emptyToUndefined(z.string().min(8).optional()),
});

const clientSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: emptyToUndefined(z.string().optional()),
});

function parseEnv() {
  const serverParsed = serverSchema.safeParse(process.env);
  const clientParsed = clientSchema.safeParse(process.env);

  if (!serverParsed.success) {
    console.error("Invalid server env:", serverParsed.error.flatten().fieldErrors);
    throw new Error("Invalid server environment variables");
  }
  if (!clientParsed.success) {
    console.error("Invalid client env:", clientParsed.error.flatten().fieldErrors);
    throw new Error("Invalid client environment variables");
  }

  return { ...serverParsed.data, ...clientParsed.data };
}

export const env = parseEnv();

export const isProd = env.NODE_ENV === "production";

export function requireDatabaseUrl(): string {
  if (!env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not set. Configure Postgres in .env.local (see .env.example)."
    );
  }
  return env.DATABASE_URL;
}

export function requireResendKey(): string {
  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY is not set. Configure Resend in .env.local.");
  }
  return env.RESEND_API_KEY;
}
