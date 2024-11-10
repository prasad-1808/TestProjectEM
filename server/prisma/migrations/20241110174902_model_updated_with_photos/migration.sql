/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_mobileNumber_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "PhotoCategory" (
    "categoryId" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "PhotoCategory_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "Photo" (
    "photoId" SERIAL NOT NULL,
    "googleDriveId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("photoId")
);

-- CreateTable
CREATE TABLE "Relative" (
    "relativeId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,

    CONSTRAINT "Relative_pkey" PRIMARY KEY ("relativeId")
);

-- CreateTable
CREATE TABLE "RelativePhoto" (
    "id" SERIAL NOT NULL,
    "relativeId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,
    "photoId" INTEGER NOT NULL,

    CONSTRAINT "RelativePhoto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PhotoCategory" ADD CONSTRAINT "PhotoCategory_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "PhotoCategory"("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelativePhoto" ADD CONSTRAINT "RelativePhoto_relativeId_fkey" FOREIGN KEY ("relativeId") REFERENCES "Relative"("relativeId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelativePhoto" ADD CONSTRAINT "RelativePhoto_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("eventId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RelativePhoto" ADD CONSTRAINT "RelativePhoto_photoId_fkey" FOREIGN KEY ("photoId") REFERENCES "Photo"("photoId") ON DELETE RESTRICT ON UPDATE CASCADE;
