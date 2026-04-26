import { z } from "zod";

import {
  emailField,
  longText,
  optionalPhoneField,
  shortText,
  turnstileToken,
} from "./shared";

export const contactTopic = z.enum([
  "general",
  "patient_question",
  "physician_referral",
  "media",
  "sponsor",
  "career",
  "other",
]);

export const contactSchema = z.object({
  name: shortText("Name", 120),
  email: emailField,
  phone: optionalPhoneField,
  organization: shortText("Organization", 160).optional().or(z.literal("")),
  topic: contactTopic.default("general"),
  message: longText("Message", 4000),
  website: z.string().max(0, "Bot detected").optional().or(z.literal("")),
  turnstileToken: turnstileToken,
});

export type ContactInput = z.infer<typeof contactSchema>;
