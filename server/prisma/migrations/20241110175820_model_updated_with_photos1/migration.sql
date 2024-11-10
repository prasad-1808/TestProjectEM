/*
  Warnings:

  - Added the required column `eventId` to the `Relative` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Relative" ADD COLUMN     "eventId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Relative" ADD CONSTRAINT "Relative_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;
