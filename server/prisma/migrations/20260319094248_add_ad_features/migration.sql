-- AlterTable
ALTER TABLE "ads" ADD COLUMN     "broadcast_to_verified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "max_impressions" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "ad_type" SET DEFAULT 'card';

-- CreateIndex
CREATE INDEX "impressions_ad_id_device_id_idx" ON "impressions"("ad_id", "device_id");
