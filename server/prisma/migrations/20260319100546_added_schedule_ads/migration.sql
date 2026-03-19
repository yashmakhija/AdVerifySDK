-- AlterTable
ALTER TABLE "ads" ADD COLUMN     "scheduled_at" TIMESTAMP(3),
ADD COLUMN     "target_audience" TEXT NOT NULL DEFAULT 'all';
