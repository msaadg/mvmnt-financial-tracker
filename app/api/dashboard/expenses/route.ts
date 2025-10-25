import { NextResponse } from 'next/server';
import { getMonthlyExpenseStats } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const expenseStats = await getMonthlyExpenseStats();
    
    return NextResponse.json(expenseStats);
  } catch (error) {
    console.error('Error fetching expense stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch expense stats' },
      { status: 500 }
    );
  }
}
