import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  uuid,
  timestamp,
  jsonb,
  integer,
  pgEnum,
  index,
} from "drizzle-orm/pg-core";

/**
 * Status applied to any inbound submission. Defaults to "new"; staff can mark
 * as contacted / qualified / declined / archived through an admin tool later.
 */
export const submissionStatus = pgEnum("submission_status", [
  "new",
  "contacted",
  "qualified",
  "declined",
  "archived",
]);

export const conditionEnum = pgEnum("condition", [
  "copd",
  "asthma",
  "ipf",
  "other",
  "unspecified",
]);

/**
 * Public studies catalog. Source of truth is the MDX files under
 * `src/content/studies` — this table optionally mirrors them so we can store
 * runtime state (recruitment open/closed, slot counts) without redeploying.
 * The MDX loader will read directly from disk; this is here for future use.
 */
export const studies = pgTable(
  "studies",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    condition: conditionEnum("condition").notNull(),
    phase: text("phase"),
    status: text("status").notNull().default("recruiting"),
    summary: text("summary"),
    nctId: text("nct_id"),
    sponsor: text("sponsor"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [index("studies_condition_idx").on(t.condition)]
);

/**
 * Patient interest — light-touch "tell me more" form. Minimal PII; not a
 * pre-screen. Marketing-style top-of-funnel.
 */
export const inquiries = pgTable(
  "inquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    condition: conditionEnum("condition").notNull().default("unspecified"),
    studySlug: text("study_slug"),
    message: text("message"),
    consentContact: integer("consent_contact").notNull().default(0),
    source: text("source"),
    referrer: text("referrer"),
    userAgent: text("user_agent"),
    ipHash: text("ip_hash"),
    status: submissionStatus("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [
    index("inquiries_email_idx").on(t.email),
    index("inquiries_created_idx").on(t.createdAt),
    index("inquiries_status_idx").on(t.status),
  ]
);

/**
 * Eligibility pre-screen — collects more detail. Still no full PHI; we only
 * capture enough for staff to determine whether to invite the patient in for
 * a formal screening visit. Free-text/structured answers stored in `answers`.
 */
export const prescreens = pgTable(
  "prescreens",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    email: text("email").notNull(),
    phone: text("phone").notNull(),
    dobYear: integer("dob_year").notNull(),
    biologicalSex: text("biological_sex"),
    studySlug: text("study_slug").notNull(),
    condition: conditionEnum("condition").notNull(),
    answers: jsonb("answers").$type<Record<string, unknown>>().notNull().default({}),
    consentContact: integer("consent_contact").notNull().default(0),
    consentScreening: integer("consent_screening").notNull().default(0),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    status: submissionStatus("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [
    index("prescreens_study_idx").on(t.studySlug),
    index("prescreens_status_idx").on(t.status),
    index("prescreens_created_idx").on(t.createdAt),
  ]
);

/**
 * Generic contact form (questions, media, sponsor inquiries, etc.).
 */
export const contacts = pgTable(
  "contacts",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    phone: text("phone"),
    organization: text("organization"),
    topic: text("topic").notNull(),
    message: text("message").notNull(),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    status: submissionStatus("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [index("contacts_created_idx").on(t.createdAt)]
);

/**
 * Physician referrals — clinicians referring patients to a study. Treated
 * separately from patient inquiries because the workflow and follow-up is
 * different (we contact the referring physician, not the patient directly).
 */
export const referrals = pgTable(
  "referrals",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    referringName: text("referring_name").notNull(),
    referringEmail: text("referring_email").notNull(),
    referringPhone: text("referring_phone"),
    referringOrganization: text("referring_organization"),
    npi: text("npi"),
    patientInitials: text("patient_initials"),
    patientCondition: conditionEnum("patient_condition").notNull(),
    studySlug: text("study_slug"),
    notes: text("notes"),
    ipHash: text("ip_hash"),
    userAgent: text("user_agent"),
    status: submissionStatus("status").notNull().default("new"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .default(sql`now()`),
  },
  (t) => [index("referrals_created_idx").on(t.createdAt)]
);

export type Inquiry = typeof inquiries.$inferSelect;
export type NewInquiry = typeof inquiries.$inferInsert;
export type Prescreen = typeof prescreens.$inferSelect;
export type NewPrescreen = typeof prescreens.$inferInsert;
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Referral = typeof referrals.$inferSelect;
export type NewReferral = typeof referrals.$inferInsert;
export type Study = typeof studies.$inferSelect;
