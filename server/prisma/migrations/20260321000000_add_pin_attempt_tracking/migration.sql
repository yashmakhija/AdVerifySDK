-- AlterTable: Add attempt tracking to user_pins
ALTER TABLE "user_pins" ADD COLUMN "attempts" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "user_pins" ADD COLUMN "locked_until" TIMESTAMP(3);
