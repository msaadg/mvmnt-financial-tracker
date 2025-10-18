// app/lib/db.ts
import { PrismaClient } from '@/app/generated/prisma/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate());

export async function createExpense(data: {
  date: Date;
  amount: number;
  vendorProjId: number;
  category: string;
  description?: string;
  status: string;
  collectorId: number;
}) {
  return prisma.expenses.create({
    data: {
      date: data.date,
      amount: data.amount,
      vendorProjId: data.vendorProjId,
      category: data.category,
      description: data.description,
      status: data.status,
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
  return prisma.expenses.findMany({
    include: {
      vendorProject: true,
      payments: true,
    },
    cacheStrategy: { ttl: 60 },
  });
}
