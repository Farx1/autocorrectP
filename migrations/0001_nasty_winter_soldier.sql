ALTER TABLE "user" ADD COLUMN "normalizedEmail" text;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_normalizedEmail_unique" UNIQUE("normalizedEmail");