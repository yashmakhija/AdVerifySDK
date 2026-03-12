-- CreateTable
CREATE TABLE "api_keys" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "app_name" TEXT NOT NULL,
    "package_name" TEXT NOT NULL DEFAULT '',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_keys_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ads" (
    "id" SERIAL NOT NULL,
    "api_key_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "image_url" TEXT NOT NULL DEFAULT '',
    "redirect_url" TEXT NOT NULL DEFAULT '',
    "ad_type" TEXT NOT NULL DEFAULT 'interstitial',
    "button_text" TEXT NOT NULL DEFAULT 'Visit Now',
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pin_configs" (
    "id" SERIAL NOT NULL,
    "api_key_id" INTEGER NOT NULL,
    "pin_enabled" BOOLEAN NOT NULL DEFAULT false,
    "pin_message" TEXT NOT NULL DEFAULT 'Enter PIN to unlock',
    "max_attempts" INTEGER NOT NULL DEFAULT 3,
    "get_pin_url" TEXT NOT NULL DEFAULT '',
    "get_pin_btn_text" TEXT NOT NULL DEFAULT 'Get PIN',

    CONSTRAINT "pin_configs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_pins" (
    "id" SERIAL NOT NULL,
    "api_key_id" INTEGER NOT NULL,
    "device_id" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used_at" TIMESTAMP(3),

    CONSTRAINT "user_pins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "impressions" (
    "id" SERIAL NOT NULL,
    "ad_id" INTEGER NOT NULL,
    "api_key_id" INTEGER NOT NULL,
    "device_id" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "impressions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clicks" (
    "id" SERIAL NOT NULL,
    "ad_id" INTEGER NOT NULL,
    "api_key_id" INTEGER NOT NULL,
    "device_id" TEXT NOT NULL DEFAULT '',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clicks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_keys_key_key" ON "api_keys"("key");

-- CreateIndex
CREATE UNIQUE INDEX "pin_configs_api_key_id_key" ON "pin_configs"("api_key_id");

-- CreateIndex
CREATE INDEX "user_pins_api_key_id_device_id_idx" ON "user_pins"("api_key_id", "device_id");

-- CreateIndex
CREATE UNIQUE INDEX "user_pins_api_key_id_device_id_pin_key" ON "user_pins"("api_key_id", "device_id", "pin");

-- AddForeignKey
ALTER TABLE "ads" ADD CONSTRAINT "ads_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pin_configs" ADD CONSTRAINT "pin_configs_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_pins" ADD CONSTRAINT "user_pins_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressions" ADD CONSTRAINT "impressions_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "impressions" ADD CONSTRAINT "impressions_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_ad_id_fkey" FOREIGN KEY ("ad_id") REFERENCES "ads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "clicks" ADD CONSTRAINT "clicks_api_key_id_fkey" FOREIGN KEY ("api_key_id") REFERENCES "api_keys"("id") ON DELETE CASCADE ON UPDATE CASCADE;
