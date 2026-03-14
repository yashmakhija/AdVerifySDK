-- AlterTable
ALTER TABLE "pin_configs" ADD COLUMN     "join_links" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "pin_info_items" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "tutorial_url" TEXT NOT NULL DEFAULT 'https://t.me/EllieTutorials/36';
