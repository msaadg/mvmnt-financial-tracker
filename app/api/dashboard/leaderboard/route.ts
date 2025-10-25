import { NextResponse } from 'next/server';
import { getReferralLeaderboard } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const referralLeaderboard = await getReferralLeaderboard();
    
    return NextResponse.json({ referralLeaderboard });
  } catch (error) {
    console.error('Error fetching referral leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch referral leaderboard' },
      { status: 500 }
    );
  }
}
