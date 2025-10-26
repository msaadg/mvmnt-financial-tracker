/*
  Warnings:

  - You are about to drop the column `password` on the `PowerUsers` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `PowerUsers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `PowerUsers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PowerUsers" DROP COLUMN "password",
ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PowerUsers_email_key" ON "PowerUsers"("email");
