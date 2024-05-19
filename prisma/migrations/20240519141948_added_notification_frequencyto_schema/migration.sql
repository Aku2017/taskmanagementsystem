-- CreateEnum
CREATE TYPE "NotificationFrequency" AS ENUM ('DAILY', 'BI_WEEKLY', 'HOURLY', 'SYSTEM_DEFAULT');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "notificationFrequency" "NotificationFrequency" NOT NULL DEFAULT 'SYSTEM_DEFAULT';
