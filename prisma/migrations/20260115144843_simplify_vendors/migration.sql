/*
  Warnings:

  - You are about to drop the column `vendorId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `Payment` table. All the data in the column will be lost.
  - The primary key for the `Vendors` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `vendorId` on the `Vendors` table. All the data in the column will be lost.
  - Added the required column `vendorName` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorName` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_vendorId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "vendorId",
ADD COLUMN     "vendorName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "vendorId",
ADD COLUMN     "vendorName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Vendors" DROP CONSTRAINT "Vendors_pkey",
DROP COLUMN "vendorId",
ADD CONSTRAINT "Vendors_pkey" PRIMARY KEY ("vendorName");

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_vendorName_fkey" FOREIGN KEY ("vendorName") REFERENCES "Vendors"("vendorName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_vendorName_fkey" FOREIGN KEY ("vendorName") REFERENCES "Vendors"("vendorName") ON DELETE CASCADE ON UPDATE CASCADE;
