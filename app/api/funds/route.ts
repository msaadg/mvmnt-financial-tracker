// app/api/funds/route.ts
import { NextResponse } from 'next/server';
import { getFundsData } from '@/app/lib/db';

export async function GET() {
  try {
    const fundsData = await getFundsData();
    return NextResponse.json(fundsData);
  } catch (error) {
    console.error('Failed to fetch funds data:', error);
    return NextResponse.json(
      { message: 'Failed to load funds data', error: String(error) },
      { status: 500 }
    );
  }
}
