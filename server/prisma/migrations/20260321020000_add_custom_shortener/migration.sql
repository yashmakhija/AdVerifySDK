-- AlterTable: Add per-user custom shortener config (one-time setup, applies to all apps)
ALTER TABLE "users" ADD COLUMN "shortener_api_url" TEXT NOT NULL DEFAULT '';
ALTER TABLE "users" ADD COLUMN "shortener_api_secret" TEXT NOT NULL DEFAULT '';
ALTER TABLE "users" ADD COLUMN "shortener_frontend_url" TEXT NOT NULL DEFAULT '';
