import { z } from "zod";

import {
  conditionField,
  emailField,
  longText,
  optionalPhoneField,
  phoneField,
  shortText,
  turnstileToken,
} from "./shared";

/**
 * Physician referral. Note: we deliberately do NOT collect patient contact
 * info or PHI here — the referring clinician's office reaches the patient,
 * then Veritas Clinical Research coordinates with the office. This avoids HIPAA exposure.
 */
export const referralSchema = z.object({
  referringName: shortText("Your name", 160),
  referringEmail: emailField,
  referringPhone: optionalPhoneField,
  referringOrganization: shortText("Organization", 200).optional().or(z.literal("")),
  npi: z
    .string()
    .trim()
    .regex(/^\d{10}$/, "NPI must be 10 digits")
    .optional()
    .or(z.literal("")),
  patientInitials: z
    .string()
    .trim()
    .max(8, "Use initials only")
    .optional()
    .or(z.literal("")),
  patientCondition: conditionField,
  studySlug: shortText("Study", 120).optional().or(z.literal("")),
  notes: longText("Clinical context", 4000),
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  turnstileToken: turnstileToken,
});

export type ReferralInput = z.infer<typeof referralSchema>;
