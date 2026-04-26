import { z } from "zod";

/** Trim and bound free-text fields to defend against junk submissions. */
export const shortText = (label: string, max = 120) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be under ${max} characters`);

export const longText = (label: string, max = 4000) =>
  z
    .string({ required_error: `${label} is required` })
    .trim()
    .min(1, `${label} is required`)
    .max(max, `${label} must be under ${max} characters`);

export const optionalLongText = (max = 4000) =>
  z
    .string()
    .trim()
    .max(max, `Must be under ${max} characters`)
    .optional()
    .or(z.literal("").transform(() => undefined));

export const emailField = z
  .string({ required_error: "Email is required" })
  .trim()
  .toLowerCase()
  .email("Enter a valid email address")
  .max(254);

/**
 * Phone validation is loose by design — patients enter numbers in many
 * formats. We strip non-digits and require 10–15 digits (covers US + intl).
 */
export const phoneField = z
  .string()
  .trim()
  .transform((s) => s.replace(/[^\d+]/g, ""))
  .pipe(
    z
      .string()
      .min(10, "Phone must have at least 10 digits")
      .max(16, "Phone is too long")
  );

export const optionalPhoneField = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .transform((v) => (v ? v.replace(/[^\d+]/g, "") : undefined))
  .pipe(
    z
      .string()
      .min(10)
      .max(16)
      .optional()
  );

export const conditionField = z.enum([
  "copd",
  "asthma",
  "ipf",
  "other",
  "unspecified",
]);

export const consentBool = z
  .union([z.boolean(), z.literal("on"), z.literal("true"), z.literal("1")])
  .transform((v) => v === true || v === "on" || v === "true" || v === "1");

export const turnstileToken = z
  .string()
  .min(1, "Captcha token missing")
  .max(2048);
