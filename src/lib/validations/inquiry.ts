import { z } from "zod";

import {
  conditionField,
  consentBool,
  emailField,
  optionalLongText,
  optionalPhoneField,
  shortText,
  turnstileToken,
} from "./shared";

/**
 * Lightweight "tell me more" form. Goal: capture interest with minimal
 * friction. No DOB, no medical detail. Patient consents to be contacted.
 */
export const inquirySchema = z.object({
  firstName: shortText("First name", 80),
  lastName: shortText("Last name", 80),
  email: emailField,
  phone: optionalPhoneField,
  condition: conditionField.default("unspecified"),
  studySlug: z.string().trim().max(120).optional(),
  message: optionalLongText(2000),
  consentContact: consentBool.refine((v) => v === true, {
    message: "Consent to be contacted is required",
  }),
  // Honeypot — real users won't fill this. Bots that auto-complete every
  // field will. We reject any submission where it has content.
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  turnstileToken: turnstileToken,
});

export type InquiryInput = z.infer<typeof inquirySchema>;
