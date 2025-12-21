// app/api/collectors/route.ts
import { NextResponse } from 'next/server';
import { getAllCollectors, getAllReferrals } from '@/app/lib/db';

type Collector = Awaited<ReturnType<typeof getAllCollectors>>[number];
type Referral = Awaited<ReturnType<typeof getAllReferrals>>[number];

export async function GET() {
  try {
    const collectors = await getAllCollectors();
    const referrals = await getAllReferrals();
    
    return NextResponse.json({
      collectors: collectors.map((c: Collector) => c.name),
      referrals: referrals.map((r: Referral) => r.name),
    });
  } catch (error) {
    console.error('Failed to fetch collectors:', error);
    return NextResponse.json(
      { message: 'Failed to load collectors', error: String(error) },
      { status: 500 }
    );
  }
}
