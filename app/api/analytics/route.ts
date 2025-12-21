// app/api/analytics/route.ts
import { NextResponse } from 'next/server';
import { getAnalyticsData, getAllDonations, getAllExpenses } from '@/app/lib/db';

type Donation = Awaited<ReturnType<typeof getAllDonations>>[number];
type Expense = Awaited<ReturnType<typeof getAllExpenses>>[number];

export async function GET() {
  try {
    const analyticsData = await getAnalyticsData();
    const donations = await getAllDonations();
    const expenses = await getAllExpenses();

    // Generate ledger data
    const ledgerData = [
      ...donations.map((d: Donation) => ({
        id: `D-${d.id}`,
        date: d.date,
        description: `Donation from ${d.donorName}`,
        type: 'Donation',
        subType: d.type,
        paymentMethod: d.paymentMethod,
        amount: d.amount,
        isIncome: true,
        status: d.status,
        reference: d.donorName,
      })),
      ...expenses.map((e: Expense) => ({
        id: `E-${e.id}`,
        date: e.date,
        description: e.description,
        type: 'Expense',
        subType: e.category,
        paymentMethod: e.paymentMethod,
        amount: e.amount,
        isIncome: false,
        status: e.status,
        reference: e.vendorName,
      }))
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const totalDonations = donations
      .filter((d: Donation) => d.status.toLowerCase() === 'completed')
      .reduce((sum: number, d: Donation) => sum + d.amount, 0);

    const totalExpenses = expenses
      .filter((e: Expense) => e.status.toLowerCase() === 'paid')
      .reduce((sum: number, e: Expense) => sum + e.amount, 0);

    const netFlow = totalDonations - totalExpenses;

    return NextResponse.json({
      ...analyticsData,
      ledgerData,
      totalDonations,
      totalExpenses,
      netFlow,
    });
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
    return NextResponse.json(
      { message: 'Failed to load analytics data', error: String(error) },
      { status: 500 }
    );
  }
}
