-- AlterTable: Add per-app custom shortener config
ALTER TABLE "pin_configs" ADD COLUMN "shortener_api_url" TEXT NOT NULL DEFAULT '';
ALTER TABLE "pin_configs" ADD COLUMN "shortener_api_secret" TEXT NOT NULL DEFAULT '';
ALTER TABLE "pin_configs" ADD COLUMN "shortener_frontend_url" TEXT NOT NULL DEFAULT '';
