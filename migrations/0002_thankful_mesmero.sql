CREATE TYPE "public"."ab_test_status" AS ENUM('running', 'completed', 'terminated');--> statement-breakpoint
CREATE TYPE "public"."metric_type" AS ENUM('impression', 'click', 'conversion', 'bounce');--> statement-breakpoint
CREATE TYPE "public"."variant_status" AS ENUM('draft', 'active', 'archived');--> statement-breakpoint
CREATE TABLE "ab_test_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"status" "ab_test_status" DEFAULT 'running' NOT NULL,
	"winning_variant_id" uuid,
	"configuration" jsonb NOT NULL
);
--> statement-breakpoint
CREATE TABLE "landing_page_variants" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"content" jsonb NOT NULL,
	"status" "variant_status" DEFAULT 'draft' NOT NULL,
	"performance_score" real DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" text NOT NULL,
	"parent_variant_id" uuid
);
--> statement-breakpoint
CREATE TABLE "llm_generations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"prompt" text NOT NULL,
	"response" jsonb NOT NULL,
	"variant_id" uuid NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"model_used" text NOT NULL,
	"performance_data" jsonb
);
--> statement-breakpoint
CREATE TABLE "variant_metrics" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"variant_id" uuid NOT NULL,
	"metric_type" "metric_type" NOT NULL,
	"value" integer NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "ab_test_sessions" ADD CONSTRAINT "ab_test_sessions_winning_variant_id_landing_page_variants_id_fk" FOREIGN KEY ("winning_variant_id") REFERENCES "public"."landing_page_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "landing_page_variants" ADD CONSTRAINT "landing_page_variants_parent_variant_id_landing_page_variants_id_fk" FOREIGN KEY ("parent_variant_id") REFERENCES "public"."landing_page_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "llm_generations" ADD CONSTRAINT "llm_generations_variant_id_landing_page_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."landing_page_variants"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "variant_metrics" ADD CONSTRAINT "variant_metrics_variant_id_landing_page_variants_id_fk" FOREIGN KEY ("variant_id") REFERENCES "public"."landing_page_variants"("id") ON DELETE no action ON UPDATE no action;