// app/lib/db.ts
import { PrismaClient } from '@/app/generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function createDonation(data: {
  date: Date;
  amount: number;
  paymentMethod: string;
  donorName: string;
  type: string;
  notes?: string;
  referral: string;
  collector: string;
}) {
  // find referral and collector id
  const referralEntry = await prisma.referrals.findFirst({
    where: { name: data.referral },
  });
  const collectorEntry = await prisma.collectors.findFirst({
    where: { name: data.collector },
  });

  if (!referralEntry) {
    throw new Error(
      `Referral "${data.referral}" not found in the database. Please seed the database first.`
    );
  }

  if (!collectorEntry) {
    throw new Error(
      `Collector "${data.collector}" not found in the database. Please seed the database first.`
    );
  }

  // create donation
  return prisma.donation.create({
    data: {
      date: data.date,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      donorName: data.donorName,
      type: data.type,
      notes: data.notes,
      status: "Completed",
      referralId: referralEntry?.referralId,
      collectorId: collectorEntry?.collectorId
    },
  });
}

export async function createExpense(data: {
  date: Date;
  amount: number;
  paymentMethod: string;
  vendorProjId: number;
  category: string;
  description?: string;
  status: string;
  collectors: {
    name: string;
    type: string;
    amount: number;
  }[];
}) {
  // create expense (initially no payments)
  const expense = await prisma.expenses.create({
    data: {
      date: data.date,
      amount: data.amount,
      paymentMethod: data.paymentMethod,
      vendorProjId: data.vendorProjId,
      category: data.category,
      description: data.description,
      status: data.status,
    },
  });
  
  // add payments
  for (const collector of data.collectors) {
    createPayment(expense.transacId, collector);
  }

  return expense;
}

async function createPayment(
  transacId: number,
  data: {
    name: string;
    type: string;
    amount: number;
  }
) {
  // Find the collector in the database
  const collector = await prisma.collectors.findFirst({
    where: { name: data.name },
  });

  if (!collector) {
    throw new Error(
      `Collector "${data.name}" not found in the database. Please seed the database first.`
    );
  }

  // Create the payment
  return prisma.payment.create({
    data: {
      expenseId: transacId,
      collectorId: collector.collectorId,
      type: data.type,
      amount: data.amount,
    },
  });
}

export async function getAllCollectors() {
  return prisma.collectors.findMany({
    cacheStrategy: { ttl: 60 },
  });
}

export async function getCollectorByName(name: string) {
  return prisma.collectors.findFirst({
    where: {
      name: name,
    },
    cacheStrategy: { ttl: 60 },
  });
}

export async function getAllReferrals() {
  return prisma.collectors.findMany({
    cacheStrategy: { ttl: 60 },
  });
}

export async function getReferralByName(name: string) {
  return prisma.collectors.findFirst({
    where: {
      name: name,
    },
    cacheStrategy: { ttl: 60 },
  });
}

export async function getAllVendorsProjects() {
  return prisma.vendorsProjects.findMany({
    cacheStrategy: { ttl: 60 },
  });
}

export async function getVendorProjectByName(name: string) {
  return prisma.vendorsProjects.findFirst({
    where: {
      name: name,
    },
    cacheStrategy: { ttl: 60 },
  });
}

export async function getAllExpenses() {
  const expenses = await prisma.expenses.findMany({
    include: {
      vendorProject: true,
      payments: {
        include: {
          collector: true
        }
      }
    },
    cacheStrategy: { ttl: 60 },
  });

  // Transform into the desired format
  const formatted = expenses.map(expense => ({
    id: expense.transacId,
    vendorName: expense.vendorProject?.name || "Unknown Vendor",
    amount: expense.amount,
    category: expense.category,
    paymentMethod: expense.paymentMethod,
    date: expense.date.toISOString().split("T")[0], // format as YYYY-MM-DD
    status: expense.status,
    description: expense.description || "",
    invoiceNumber: "INV-2025-000", // default value
    collectors: expense.payments.map(p => ({
      name: p.collector?.name || "Unknown Collector",
      type: p.type,
      amount: p.amount,
    })),
  }));

  return formatted;
}
