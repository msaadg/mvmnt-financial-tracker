// app/api/vendors/balances/route.ts
import { NextResponse } from 'next/server';
import { getCollectorBalance } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name') || "";
    
    const balance = await getCollectorBalance(name);
    
    return NextResponse.json({ balance });
  } catch (error) {
    // console.error('Failed to fetch collector balance:', error);
    return NextResponse.json(
      { message: 'Failed to load collector balance' },
      { status: 500 }
    );
  }
}