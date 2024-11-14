/*
  Warnings:

  - You are about to drop the column `address` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventDate` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `eventTime` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `place` on the `Event` table. All the data in the column will be lost.
  - Added the required column `eventType` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "address",
DROP COLUMN "eventDate",
DROP COLUMN "eventName",
DROP COLUMN "eventTime",
DROP COLUMN "place",
ADD COLUMN     "eventType" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PhotoCategory" ADD COLUMN     "eventDataEventDataId" INTEGER;

-- AlterTable
ALTER TABLE "Relative" ADD COLUMN     "eventDataEventDataId" INTEGER;

-- AlterTable
ALTER TABLE "RelativePhoto" ADD COLUMN     "eventDataEventDataId" INTEGER;

-- CreateTable
CREATE TABLE "EventData" (
    "eventDataId" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "groomName" TEXT NOT NULL,
    "brideName" TEXT NOT NULL,
    "specialPersonName" TEXT NOT NULL,
    "place" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "EventData_pkey" PRIMARY KEY ("eventDataId")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventData_eventId_key" ON "EventData"("eventId");

-- AddForeignKey
ALTER TABLE "EventData" ADD CONSTRAINT "EventData_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PhotoCategory" ADD CONSTRAINT "PhotoCategory_eventDataEventDataId_fkey" FOREIGN KEY ("eventDataEventDataId") REFERENCES "EventData"("eventDataId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relative" ADD CONSTRAINT "Relative_eventDataEventDataId_fkey" FOREIGN KEY ("eventDataEventDataId") REFERENCES "EventData"("eventDataId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelativePhoto" ADD CONSTRAINT "RelativePhoto_eventDataEventDataId_fkey" FOREIGN KEY ("eventDataEventDataId") REFERENCES "EventData"("eventDataId") ON DELETE SET NULL ON UPDATE CASCADE;
