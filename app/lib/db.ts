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

export async function updateDonation(id: number, data: {
  date?: Date;
  amount?: number;
  paymentMethod?: string;
  donorName?: string;
  type?: string;
  notes?: string;
  referral?: string;
  collector?: string;
}) {
  const updateData: any = {};
  
  if (data.date) updateData.date = data.date;
  if (data.amount) updateData.amount = data.amount;
  if (data.paymentMethod) updateData.paymentMethod = data.paymentMethod;
  if (data.donorName) updateData.donorName = data.donorName;
  if (data.type) updateData.type = data.type;
  if (data.notes !== undefined) updateData.notes = data.notes;
  
  // find referral and collector id if provided
  if (data.referral) {
    const referralEntry = await prisma.referrals.findFirst({
      where: { name: data.referral },
    });
    if (!referralEntry) {
      throw new Error(`Referral "${data.referral}" not found in the database.`);
    }
    updateData.referralId = referralEntry.referralId;
  }
  
  if (data.collector) {
    const collectorEntry = await prisma.collectors.findFirst({
      where: { name: data.collector },
    });
    if (!collectorEntry) {
      throw new Error(`Collector "${data.collector}" not found in the database.`);
    }
    updateData.collectorId = collectorEntry.collectorId;
  }

  return prisma.donation.update({
    where: { transacId: id },
    data: updateData,
  });
}

export async function deleteDonation(id: number) {
  return prisma.donation.delete({
    where: { transacId: id },
  });
}

export async function updateExpense(id: number, data: {
  date?: Date;
  amount?: number;
  paymentMethod?: string;
  vendorProjId?: number;
  category?: string;
  description?: string;
  status?: string;
}) {
  const updateData: any = {};
  
  if (data.date) updateData.date = data.date;
  if (data.amount) updateData.amount = data.amount;
  if (data.paymentMethod) updateData.paymentMethod = data.paymentMethod;
  if (data.vendorProjId) updateData.vendorProjId = data.vendorProjId;
  if (data.category) updateData.category = data.category;
  if (data.description !== undefined) updateData.description = data.description;
  if (data.status) updateData.status = data.status;

  return prisma.expenses.update({
    where: { transacId: id },
    data: updateData,
  });
}

export async function deleteExpense(id: number) {
  // First delete all related payments
  await prisma.payment.deleteMany({
    where: { expenseId: id },
  });
  
  // Then delete the expense
  return prisma.expenses.delete({
    where: { transacId: id },
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
  return prisma.referrals.findMany({
    cacheStrategy: { ttl: 60 },
  });
}

export async function getReferralByName(name: string) {
  return prisma.referrals.findFirst({
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

export async function getAllDonations() {
  const donations = await prisma.donation.findMany({
    include: {
      referral: true,
      collector: true,
    },
    cacheStrategy: { ttl: 60 },
  });

  return donations.map(donation => ({
    id: donation.transacId,
    donorName: donation.donorName,
    amount: donation.amount,
    type: donation.type,
    paymentMethod: donation.paymentMethod,
    collector: donation.collector?.name || "Unknown",
    referral: donation.referral?.name || "Unknown",
    date: donation.date.toISOString().split("T")[0],
    status: donation.status,
    notes: donation.notes || "",
  }));
}

export async function getMonthlyDonationStats() {
  // Get current month's date range
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Get current month donations (from first day at 00:00:00 to just before first day of next month)
  const monthDonations = await prisma.donation.findMany({
    where: {
      status: "Completed",
      date: {
        gte: firstDayOfMonth,
        lt: firstDayOfNextMonth,
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  const totalDonations = monthDonations.reduce((sum, d) => sum + d.amount, 0);

  // Calculate previous month for trend
  const prevMonthFirst = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month

  const prevMonthDonations = await prisma.donation.findMany({
    where: {
      status: "Completed",
      date: {
        gte: prevMonthFirst,
        lt: prevMonthEnd,
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  const prevTotalDonations = prevMonthDonations.reduce((sum, d) => sum + d.amount, 0);

  const donationTrend = prevTotalDonations > 0 
    ? ((totalDonations - prevTotalDonations) / prevTotalDonations * 100).toFixed(1)
    : "0";

  return {
    totalDonations,
    donationTrend: `${donationTrend > "0" ? "+" : ""}${donationTrend}%`,
  };
}

export async function getMonthlyExpenseStats() {
  // Get current month's date range
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Get current month expenses (from first day at 00:00:00 to just before first day of next month)
  const monthExpenses = await prisma.expenses.findMany({
    where: {
      status: "Paid",
      date: {
        gte: firstDayOfMonth,
        lt: firstDayOfNextMonth,
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);

  // Calculate previous month for trend
  const prevMonthFirst = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1); // First day of current month

  const prevMonthExpenses = await prisma.expenses.findMany({
    where: {
      status: "Paid",
      date: {
        gte: prevMonthFirst,
        lt: prevMonthEnd,
      },
    },
    cacheStrategy: { ttl: 60 },
  });

  const prevTotalExpenses = prevMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const expenseTrend = prevTotalExpenses > 0
    ? ((totalExpenses - prevTotalExpenses) / prevTotalExpenses * 100).toFixed(1)
    : "0";

  return {
    totalExpenses,
    expenseTrend: `${expenseTrend > "0" ? "+" : ""}${expenseTrend}%`,
  };
}

export async function getDashboardStats() {
  // Get current month's date range
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const firstDayOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);

  // Get all completed donations
  const allDonations = await prisma.donation.findMany({
    where: { status: "Completed" },
  });

  // Get current month donations
  const monthDonations = await prisma.donation.findMany({
    where: {
      status: "Completed",
      date: {
        gte: firstDayOfMonth,
        lt: firstDayOfNextMonth,
      },
    },
  });

  // Get all paid expenses
  const allExpenses = await prisma.expenses.findMany({
    where: { status: "Paid" },
  });

  // Get current month expenses
  const monthExpenses = await prisma.expenses.findMany({
    where: {
      status: "Paid",
      date: {
        gte: firstDayOfMonth,
        lt: firstDayOfNextMonth,
      },
    },
  });

  const totalDonations = monthDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = monthExpenses.reduce((sum, e) => sum + e.amount, 0);
  const netFlow = totalDonations - totalExpenses;

  // Calculate previous month for trend
  const prevMonthFirst = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 1);

  const prevMonthDonations = await prisma.donation.findMany({
    where: {
      status: "Completed",
      date: {
        gte: prevMonthFirst,
        lt: prevMonthEnd,
      },
    },
  });

  const prevMonthExpenses = await prisma.expenses.findMany({
    where: {
      status: "Paid",
      date: {
        gte: prevMonthFirst,
        lt: prevMonthEnd,
      },
    },
  });

  const prevTotalDonations = prevMonthDonations.reduce((sum, d) => sum + d.amount, 0);
  const prevTotalExpenses = prevMonthExpenses.reduce((sum, e) => sum + e.amount, 0);

  const donationTrend = prevTotalDonations > 0 
    ? ((totalDonations - prevTotalDonations) / prevTotalDonations * 100).toFixed(1)
    : "0";

  const expenseTrend = prevTotalExpenses > 0
    ? ((totalExpenses - prevTotalExpenses) / prevTotalExpenses * 100).toFixed(1)
    : "0";

  const prevNetFlow = prevTotalDonations - prevTotalExpenses;
  const netFlowTrend = prevNetFlow > 0
    ? ((netFlow - prevNetFlow) / prevNetFlow * 100).toFixed(1)
    : "0";

  return {
    totalDonations,
    totalExpenses,
    netFlow,
    donationTrend: `${donationTrend > "0" ? "+" : ""}${donationTrend}%`,
    expenseTrend: `${expenseTrend > "0" ? "+" : ""}${expenseTrend}%`,
    netFlowTrend: `${netFlowTrend > "0" ? "+" : ""}${netFlowTrend}%`,
  };
}

export async function getRecentTransactions(limit: number = 5) {
  const donations = await prisma.donation.findMany({
    include: {
      collector: true,
      referral: true,
    },
    orderBy: { date: 'desc' },
    take: limit,
  });

  const expenses = await prisma.expenses.findMany({
    include: {
      vendorProject: true,
    },
    orderBy: { date: 'desc' },
    take: limit,
  });

  const transactions = [
    ...donations.map(d => ({
      id: `D-${d.transacId}`,
      type: 'donation' as const,
      donor: d.donorName,
      vendor: undefined,
      amount: d.amount,
      date: d.date.toISOString().split('T')[0],
      category: d.type,
    })),
    ...expenses.map(e => ({
      id: `E-${e.transacId}`,
      type: 'expense' as const,
      donor: undefined,
      vendor: e.vendorProject?.name || 'Unknown',
      amount: e.amount,
      date: e.date.toISOString().split('T')[0],
      category: e.category,
    }))
  ];

  return transactions
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export async function getReferralLeaderboard() {
  const referrals = await prisma.referrals.findMany({
    include: {
      donations: {
        where: { status: "Completed" },
      },
    },
  });

  return referrals
    .map(ref => ({
      name: ref.name,
      totalAmount: ref.donations.reduce((sum, d) => sum + d.amount, 0),
      donationCount: ref.donations.length,
    }))
    .sort((a, b) => b.totalAmount - a.totalAmount);
}

export async function getAnalyticsData() {
  const donations = await prisma.donation.findMany({
    where: { status: "Completed" },
  });

  const expenses = await prisma.expenses.findMany({
    where: { status: "Paid" },
  });

  // Get monthly data for the last 6 months
  const monthlyData = [];
  for (let i = 5; i >= 0; i--) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const monthDonations = donations.filter(d => {
      const dDate = new Date(d.date);
      return dDate >= firstDay && dDate <= lastDay;
    });

    const monthExpenses = expenses.filter(e => {
      const eDate = new Date(e.date);
      return eDate >= firstDay && eDate <= lastDay;
    });

    monthlyData.push({
      month: date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      donations: monthDonations.reduce((sum, d) => sum + d.amount, 0),
      expenses: monthExpenses.reduce((sum, e) => sum + e.amount, 0),
    });
  }

  // Donation breakdown by type
  const zakatDonations = donations.filter(d => d.type.toLowerCase() === 'zakat');
  const sadqaDonations = donations.filter(d => d.type.toLowerCase() === 'sadqa');

  const zakatAmount = zakatDonations.reduce((sum, d) => sum + d.amount, 0);
  const sadqaAmount = sadqaDonations.reduce((sum, d) => sum + d.amount, 0);
  const totalAmount = zakatAmount + sadqaAmount;

  const donationBreakdown = [
    {
      name: 'Zakat',
      value: totalAmount > 0 ? Math.round((zakatAmount / totalAmount) * 100) : 0,
      amount: zakatAmount,
    },
    {
      name: 'Sadqa',
      value: totalAmount > 0 ? Math.round((sadqaAmount / totalAmount) * 100) : 0,
      amount: sadqaAmount,
    },
  ];

  return {
    monthlyData,
    donationBreakdown,
  };
}

export async function getFundsData() {
  const donations = await prisma.donation.findMany({
    where: { status: "Completed" },
    include: { collector: true },
  });

  const expenses = await prisma.expenses.findMany({
    where: { status: "Paid" },
    include: {
      payments: {
        include: { collector: true },
      },
    },
  });

  const collectors = await prisma.collectors.findMany();

  // Calculate totals
  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const currentBalance = totalDonations - totalExpenses;

  // Calculate by type
  const zakatDonations = donations.filter(d => d.type.toLowerCase() === 'zakat').reduce((sum, d) => sum + d.amount, 0);
  const sadqaDonations = donations.filter(d => d.type.toLowerCase() === 'sadqa').reduce((sum, d) => sum + d.amount, 0);

  const zakatExpenses = expenses.reduce((sum, e) => {
    const zakatPayments = e.payments.filter(p => p.type.toLowerCase() === 'zakat');
    return sum + zakatPayments.reduce((pSum, p) => pSum + p.amount, 0);
  }, 0);

  const sadqaExpenses = expenses.reduce((sum, e) => {
    const sadqaPayments = e.payments.filter(p => p.type.toLowerCase() === 'sadqa');
    return sum + sadqaPayments.reduce((pSum, p) => pSum + p.amount, 0);
  }, 0);

  const zakatBalance = zakatDonations - zakatExpenses;
  const sadqaBalance = sadqaDonations - sadqaExpenses;

  // Calculate by payment method
  const onlineDonations = donations.filter(d => d.paymentMethod.toLowerCase() === 'online').reduce((sum, d) => sum + d.amount, 0);
  const cashDonations = donations.filter(d => d.paymentMethod.toLowerCase() === 'cash').reduce((sum, d) => sum + d.amount, 0);

  const onlineExpenses = expenses.filter(e => e.paymentMethod?.toLowerCase() === 'online').reduce((sum, e) => sum + e.amount, 0);
  const cashExpenses = expenses.filter(e => e.paymentMethod?.toLowerCase() === 'cash').reduce((sum, e) => sum + e.amount, 0);

  const onlineBalance = onlineDonations - onlineExpenses;
  const cashBalance = cashDonations - cashExpenses;

  // Calculate per collector
  const collectorData = collectors.map(collector => {
    const collectorDonations = donations.filter(d => d.collectorId === collector.collectorId);
    const collectorExpensePayments = expenses.flatMap(e => 
      e.payments.filter(p => p.collectorId === collector.collectorId)
    );

    const totalReceived = collectorDonations.reduce((sum, d) => sum + d.amount, 0);
    const totalPaid = collectorExpensePayments.reduce((sum, p) => sum + p.amount, 0);
    const totalBalance = totalReceived - totalPaid;

    const zakatReceived = collectorDonations.filter(d => d.type.toLowerCase() === 'zakat').reduce((sum, d) => sum + d.amount, 0);
    const sadqaReceived = collectorDonations.filter(d => d.type.toLowerCase() === 'sadqa').reduce((sum, d) => sum + d.amount, 0);

    const zakatPaid = collectorExpensePayments.filter(p => p.type.toLowerCase() === 'zakat').reduce((sum, p) => sum + p.amount, 0);
    const sadqaPaid = collectorExpensePayments.filter(p => p.type.toLowerCase() === 'sadqa').reduce((sum, p) => sum + p.amount, 0);

    const onlineReceived = collectorDonations.filter(d => d.paymentMethod.toLowerCase() === 'online').reduce((sum, d) => sum + d.amount, 0);
    const cashReceived = collectorDonations.filter(d => d.paymentMethod.toLowerCase() === 'cash').reduce((sum, d) => sum + d.amount, 0);

    const onlinePaid = collectorExpensePayments.filter(p => {
      const expense = expenses.find(e => e.payments.some(ep => ep.paymentId === p.paymentId));
      return expense?.paymentMethod?.toLowerCase() === 'online';
    }).reduce((sum, p) => sum + p.amount, 0);

    const cashPaid = collectorExpensePayments.filter(p => {
      const expense = expenses.find(e => e.payments.some(ep => ep.paymentId === p.paymentId));
      return expense?.paymentMethod?.toLowerCase() === 'cash';
    }).reduce((sum, p) => sum + p.amount, 0);

    return {
      name: collector.name,
      totalBalance,
      zakat: zakatReceived - zakatPaid,
      sadqa: sadqaReceived - sadqaPaid,
      online: onlineReceived - onlinePaid,
      cash: cashReceived - cashPaid,
    };
  });

  return {
    currentBalance,
    totalDonations,
    totalExpenses,
    zakatBalance,
    sadqaBalance,
    onlineBalance,
    cashBalance,
    collectorData,
  };
}
