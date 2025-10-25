// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { getDashboardStats, getRecentTransactions, getReferralLeaderboard } from '@/app/lib/db';

export async function GET() {
  try {
    const stats = await getDashboardStats();
    const recentTransactions = await getRecentTransactions(5);
    const referralLeaderboard = await getReferralLeaderboard();

    return NextResponse.json({
      stats,
      recentTransactions,
      referralLeaderboard,
    });
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    return NextResponse.json(
      { message: 'Failed to load dashboard data', error: String(error) },
      { status: 500 }
    );
  }
}
