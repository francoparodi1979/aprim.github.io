CREATE TYPE "public"."condition" AS ENUM('copd', 'asthma', 'ipf', 'other', 'unspecified');--> statement-breakpoint
CREATE TYPE "public"."submission_status" AS ENUM('new', 'contacted', 'qualified', 'declined', 'archived');--> statement-breakpoint
CREATE TABLE "contacts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"organization" text,
	"topic" text NOT NULL,
	"message" text NOT NULL,
	"ip_hash" text,
	"user_agent" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "inquiries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text,
	"condition" "condition" DEFAULT 'unspecified' NOT NULL,
	"study_slug" text,
	"message" text,
	"consent_contact" integer DEFAULT 0 NOT NULL,
	"source" text,
	"referrer" text,
	"user_agent" text,
	"ip_hash" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "prescreens" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"email" text NOT NULL,
	"phone" text NOT NULL,
	"dob_year" integer NOT NULL,
	"biological_sex" text,
	"study_slug" text NOT NULL,
	"condition" "condition" NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"consent_contact" integer DEFAULT 0 NOT NULL,
	"consent_screening" integer DEFAULT 0 NOT NULL,
	"ip_hash" text,
	"user_agent" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referrals" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"referring_name" text NOT NULL,
	"referring_email" text NOT NULL,
	"referring_phone" text,
	"referring_organization" text,
	"npi" text,
	"patient_initials" text,
	"patient_condition" "condition" NOT NULL,
	"study_slug" text,
	"notes" text,
	"ip_hash" text,
	"user_agent" text,
	"status" "submission_status" DEFAULT 'new' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "studies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"condition" "condition" NOT NULL,
	"phase" text,
	"status" text DEFAULT 'recruiting' NOT NULL,
	"summary" text,
	"nct_id" text,
	"sponsor" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "studies_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE INDEX "contacts_created_idx" ON "contacts" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "inquiries_email_idx" ON "inquiries" USING btree ("email");--> statement-breakpoint
CREATE INDEX "inquiries_created_idx" ON "inquiries" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "inquiries_status_idx" ON "inquiries" USING btree ("status");--> statement-breakpoint
CREATE INDEX "prescreens_study_idx" ON "prescreens" USING btree ("study_slug");--> statement-breakpoint
CREATE INDEX "prescreens_status_idx" ON "prescreens" USING btree ("status");--> statement-breakpoint
CREATE INDEX "prescreens_created_idx" ON "prescreens" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "referrals_created_idx" ON "referrals" USING btree ("created_at");--> statement-breakpoint
CREATE INDEX "studies_condition_idx" ON "studies" USING btree ("condition");