DROP TABLE "update" CASCADE;--> statement-breakpoint
ALTER TABLE "accounts" ADD COLUMN "plaid_id" text;--> statement-breakpoint
ALTER TABLE "accounts" DROP COLUMN "username";