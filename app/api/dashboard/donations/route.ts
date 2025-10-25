import { NextResponse } from 'next/server';
import { getMonthlyDonationStats } from '@/app/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const donationStats = await getMonthlyDonationStats();
    
    return NextResponse.json(donationStats);
  } catch (error) {
    console.error('Error fetching donation stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch donation stats' },
      { status: 500 }
    );
  }
}
