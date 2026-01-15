// app/api/vendors/balances/route.ts
import { NextResponse } from 'next/server';
import { getVendorBalances } from '@/app/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeZeroBalance = searchParams.get('includeZero') === 'true';
    
    const balances = await getVendorBalances(includeZeroBalance);
    
    // Sort by balance descending (highest outstanding balance first)
    balances.sort((a: { balance: number }, b: { balance: number }) => b.balance - a.balance);
    
    return NextResponse.json({ balances });
  } catch (error) {
    console.error('Failed to fetch vendor balances:', error);
    return NextResponse.json(
      { message: 'Failed to load vendor balances' },
      { status: 500 }
    );
  }
}
