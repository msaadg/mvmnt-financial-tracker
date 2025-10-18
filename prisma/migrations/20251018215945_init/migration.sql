-- CreateTable
CREATE TABLE "PowerUsers" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "PowerUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Referrals" (
    "referralId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Referrals_pkey" PRIMARY KEY ("referralId")
);

-- CreateTable
CREATE TABLE "Collectors" (
    "collectorId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Collectors_pkey" PRIMARY KEY ("collectorId")
);

-- CreateTable
CREATE TABLE "VendorsProjects" (
    "vendProjId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "VendorsProjects_pkey" PRIMARY KEY ("vendProjId")
);

-- CreateTable
CREATE TABLE "Donation" (
    "transacId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "donorName" TEXT NOT NULL,
    "referralId" INTEGER NOT NULL,
    "collectorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,

    CONSTRAINT "Donation_pkey" PRIMARY KEY ("transacId")
);

-- CreateTable
CREATE TABLE "Expenses" (
    "transacId" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" INTEGER NOT NULL,
    "vendorProjId" INTEGER NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL,

    CONSTRAINT "Expenses_pkey" PRIMARY KEY ("transacId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "expenseId" INTEGER,
    "collectorId" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PowerUsers_username_key" ON "PowerUsers"("username");

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_referralId_fkey" FOREIGN KEY ("referralId") REFERENCES "Referrals"("referralId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donation" ADD CONSTRAINT "Donation_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "Collectors"("collectorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expenses" ADD CONSTRAINT "Expenses_vendorProjId_fkey" FOREIGN KEY ("vendorProjId") REFERENCES "VendorsProjects"("vendProjId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_collectorId_fkey" FOREIGN KEY ("collectorId") REFERENCES "Collectors"("collectorId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_expenseId_fkey" FOREIGN KEY ("expenseId") REFERENCES "Expenses"("transacId") ON DELETE CASCADE ON UPDATE CASCADE;
