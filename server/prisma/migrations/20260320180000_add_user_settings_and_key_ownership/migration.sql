-- AlterTable: Add per-user pin unlock settings
ALTER TABLE "users" ADD COLUMN "pin_unlock_mode" TEXT NOT NULL DEFAULT 'per_app';
ALTER TABLE "users" ADD COLUMN "excluded_app_ids" INTEGER[] DEFAULT ARRAY[]::INTEGER[];

-- AlterTable: Link API keys to users + suspension tracking
ALTER TABLE "api_keys" ADD COLUMN "user_id" INTEGER;
ALTER TABLE "api_keys" ADD COLUMN "suspended_at" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "api_keys_user_id_idx" ON "api_keys"("user_id");

-- AddForeignKey
ALTER TABLE "api_keys" ADD CONSTRAINT "api_keys_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
