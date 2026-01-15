/*
  Warnings:

  - You are about to drop the column `category` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `paymentMethod` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `vendorProjId` on the `Expenses` table. All the data in the column will be lost.
  - You are about to drop the column `expenseId` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `VendorsProjects` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `project` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `Expenses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendorId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Expenses" DROP CONSTRAINT "Expenses_vendorProjId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_expenseId_fkey";

-- AlterTable
ALTER TABLE "Expenses" DROP COLUMN "category",
DROP COLUMN "paymentMethod",
DROP COLUMN "vendorProjId",
ADD COLUMN     "project" TEXT NOT NULL,
ADD COLUMN     "vendorId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "expenseId",
ADD COLUMN     "vendorId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "VendorsProjects";

-- CreateTable
CREATE TABLE "Vendors" (
    "vendorId" SERIAL NOT NULL,
    "vendorName" TEXT NOT NULL,

    CONSTRAINT "Vendors_pkey" PRIMARY KEY ("vendorId")
);

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendors"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendors"("vendorId") ON DELETE CASCADE ON UPDATE CASCADE;
