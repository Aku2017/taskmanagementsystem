/*
  Warnings:

  - You are about to drop the column `notifyTaskDeadlineFrequency` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "notifyTaskDeadlineFrequency",
ALTER COLUMN "notificationFrequency" DROP NOT NULL,
ALTER COLUMN "notificationFrequency" DROP DEFAULT;
