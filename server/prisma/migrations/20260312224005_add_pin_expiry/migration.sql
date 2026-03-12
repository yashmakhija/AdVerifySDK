-- AlterTable
ALTER TABLE "pin_configs" ADD COLUMN     "expiry_hours" INTEGER NOT NULL DEFAULT 24,
ADD COLUMN     "expiry_mode" TEXT NOT NULL DEFAULT 'never';

-- AlterTable
ALTER TABLE "user_pins" ADD COLUMN     "expires_at" TIMESTAMP(3);
