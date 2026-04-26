import { z } from "zod";

import {
  conditionField,
  consentBool,
  emailField,
  longText,
  phoneField,
  shortText,
  turnstileToken,
} from "./shared";

const currentYear = new Date().getFullYear();

/**
 * Eligibility pre-screen. We collect *just enough* to decide whether to
 * invite the patient in for a formal screening visit:
 *  - identity & contact for follow-up
 *  - approximate age (DOB year only — not full DOB)
 *  - condition + study they're interested in
 *  - structured Q&A captured per-study (e.g. smoking history for COPD)
 *
 * Detailed PHI is collected in person at the screening visit with a HIPAA
 * authorization, NOT through this form.
 */
export const prescreenSchema = z.object({
  firstName: shortText("First name", 80),
  lastName: shortText("Last name", 80),
  email: emailField,
  phone: phoneField,
  dobYear: z.coerce
    .number({ invalid_type_error: "Year of birth is required" })
    .int()
    .min(currentYear - 110, "Year of birth out of range")
    .max(currentYear - 1, "Year of birth out of range"),
  biologicalSex: z
    .enum(["female", "male", "intersex", "prefer_not_to_say"])
    .optional(),
  studySlug: shortText("Study", 120),
  condition: conditionField,
  // Per-study answers. Validated loosely here; the study's own MDX defines
  // the structure. Stored as JSONB.
  answers: z
    .record(z.string(), z.union([z.string(), z.number(), z.boolean(), z.null()]))
    .default({}),
  consentContact: consentBool.refine((v) => v === true, {
    message: "You must consent to be contacted",
  }),
  consentScreening: consentBool.refine((v) => v === true, {
    message: "You must acknowledge the pre-screening notice",
  }),
  notes: longText("Notes", 2000).optional(),
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  turnstileToken: turnstileToken,
});

export type PrescreenInput = z.infer<typeof prescreenSchema>;
