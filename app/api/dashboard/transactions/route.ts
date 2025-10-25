import { NextResponse } from 'next/server';
import { getRecentTransactions } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const recentTransactions = await getRecentTransactions();
    
    return NextResponse.json({ recentTransactions });
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recent transactions' },
      { status: 500 }
    );
  }
}
